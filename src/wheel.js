import { logResult, clearResults } from './index';

// Canvas initial setup
// -----------------------------------------------------------------------------

// Find the canvas element and set up the spin on click listener.
const canvas = document.getElementById('spinner_wheel');
canvas.addEventListener('click', spin);

// Set up global context properties.
const ctx = canvas.getContext('2d');
ctx.font         = `15px Arial`;
ctx.textBaseline = 'middle';
ctx.textAlign    = 'center';
ctx.lineWidth    = 1;

resize();
window.addEventListener("resize", () => {
    resize();
    paint();
});

// Resize the canvas to fit the available space.
function resize() {
    const canvasParent = canvas.parentElement;
    const size = Math.min(canvasParent.offsetWidth, canvasParent.offsetHeight);
    canvas.width = size;
    canvas.height = size;
    ctx.font = `${size * 0.022}px Arial`;
}

// Constants
// -----------------------------------------------------------------------------

const palettes = [
    [ '#0c79a8', '#0e8ac0', '#109cd8', '#13acee', '#2bb4f0' ], // blue
    [ '#43cd3e', '#56d352', '#6ad867', '#7edd7b', '#92e28f' ], // green
    [ '#984907', '#b05509', '#c9600a', '#e16c0b', '#f37812' ], // orange
    [ '#640798', '#7409b0', '#840ac9', '#940be1', '#a212f3' ], // purple
];

const colors = palettes[Math.floor(Math.random() * palettes.length)];
const CLR_WHITE = 'white';
const CLR_BLACK = 'black';
const CLR_EMPTY = 'transparent';

const TWOPI        = Math.PI * 2;    // util/QoL variable

const SIZE         = canvas.width;   // canvas size (canvas should be square)
const HALF_SIZE    = SIZE / 2;       // half size; util/QoL
const POS_X        = HALF_SIZE;      // X position of wheel center
const POS_Y        = HALF_SIZE;      // Y position of wheel center
const RADIUS       = HALF_SIZE;      // wheel radius
const INNER_RADIUS = 6;              // radius of circle in the center of the wheel
const FRICTION     = 0.991;          // rate at which to slow the wheel down
const ARROW_SIZE   = 23;             // size in pixels of the ticker arrow
const MIN_SPEED    = 0.4;            // min randomized spin speed
const MAX_SPEED    = 0.65;           // max randomized spin speed
const SPIN_END_SPD = 0.0005          // speed at which spinning should stop

// Conversion helper functions
const rad2Deg = rad => rad * 180 / Math.PI;
const deg2Rad = deg => deg * Math.PI / 180;

// Spinner
// -----------------------------------------------------------------------------

// Defaults
let labels    = [];                  // Labels for wheel segments (slices).
let sliceSize = 0;                   // the size of a single segment (depends on number of labels)
let halfSlice = 0;                   // half the size of a slice; util/QoL
let angle     = 0;                   // current wheel angle
let speed     = 0;                   // current wheel speed
let spinning  = false;               // whether or not the wheel is spinning
let ticking   = false;               // whether or not the arrow is passing over a slice boundary

export function setLabels(newLabels) {
    if (spinning) return;

    labels = newLabels;

    // Draw "no items added" text in the center of the canvas.
    if (newLabels == null || newLabels.length === 0) {
        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.translate(HALF_SIZE / 2, HALF_SIZE);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('No items added', RADIUS / 2, 0);
        ctx.translate(-HALF_SIZE/2, -HALF_SIZE);
        return;
    }

    // if we're given only 1 label, rotate the angle by 180deg so the
    // text renders right-side up.
    angle = (labels.length === 1)
        ? Math.PI
        : 0;

    // Helper values for wheel slices based on the number of labels.
    sliceSize = TWOPI / labels.length;
    halfSlice = sliceSize / 2;

    // Run an initial paint to render the wheel (static) in its new state.
    paint();
}

function spin() {
    if (spinning) return;
    if (labels == null || labels.length === 0) return;

    // reset values before spin, and decide on a spin speed.
    angle = 0;
    speed = Math.random() * MAX_SPEED + MIN_SPEED;
    spinning = true;

    // Run the first update call, update will then continuously run itself
    // as needed, once per browser animation frame, until the spin is complete.
    update();
}


function update() {
    if (!spinning) return;

    speed = speed * FRICTION;
    angle = angle + speed;

    // reset angle above 2pi (360deg)
    if (angle >= TWOPI) angle = 0;

    // if the arrow is near a border between two slices, we want to
    // render it in a different color to show a 'tick' effect.
    // Threshold is based on speed so the tick effect lasts for the same duration
    // no matter if the wheel is going fast or slow.
    // *6 is a magic number here, just to make the tick last a bit longer.
    ticking = (angle % sliceSize < speed * 6);

    // finish the spin below a certain threshold
    if (speed < SPIN_END_SPD) {
        spinning = false;

        // figure out where we landed
        const index =
            Math.floor((360 - rad2Deg(angle) % 360) / rad2Deg(sliceSize));

        logResult(labels[index]);

        // one last paint for this cycle in order to render the stopped state.
        paint();
        return;
    }

    paint();
    requestAnimationFrame(update);
}

function paint() {
    ctx.clearRect(0, 0, SIZE, SIZE);

    for (var i = 0; i < labels.length; i++) {
        const drawAngle = angle + sliceSize * i;

        /* --- Draw wheel segment --- */

        ctx.beginPath();
        ctx.arc(RADIUS, RADIUS, RADIUS, drawAngle, drawAngle + sliceSize, false);
        ctx.arc(RADIUS, RADIUS, INNER_RADIUS, drawAngle + sliceSize, drawAngle, true);

        const grad = ctx.createRadialGradient(
            HALF_SIZE, HALF_SIZE, 0, HALF_SIZE, HALF_SIZE, RADIUS * 2.4);
    	grad.addColorStop(1, CLR_BLACK);
    	grad.addColorStop(0.3, getColor(i));

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.closePath();

        /* --- Draw arrow --- */

        ctx.beginPath();
        ctx.moveTo(SIZE - ARROW_SIZE, HALF_SIZE); // left point (tip)
        ctx.lineTo(SIZE, HALF_SIZE - ARROW_SIZE); // bottom point
        ctx.lineTo(SIZE, HALF_SIZE + ARROW_SIZE); // top point
        ctx.lineTo(SIZE - ARROW_SIZE, HALF_SIZE); // back to tip
        // fill with white if the arrow is 'ticking' (passing over the boundary
        // between two segments), otherwise transparent.
        // if we're no longer spinning, fill it with black.
        if (spinning) ctx.fillStyle = ticking ? CLR_WHITE : CLR_EMPTY;
        else ctx.fillStyle = CLR_BLACK;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        /* --- Draw text --- */

        // render from center
        ctx.translate(HALF_SIZE, HALF_SIZE);
        // rotate to drawing angle (start of slice),
        // add half slice size to center text inside the slice
        ctx.rotate(drawAngle + halfSlice);
        // draw text
        ctx.fillStyle = CLR_WHITE;
        ctx.fillText(labels[i], RADIUS / 4, 0, RADIUS);

        // reset canvas rotation and translation for next cycle
        ctx.rotate(-(drawAngle + halfSlice));
        ctx.translate(-HALF_SIZE, -HALF_SIZE);
    }
}

function getColor(index) {
    if (index === 0) index = Math.floor(colors.length / 2);
    return colors[index % colors.length];
}
