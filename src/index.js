import { setLabels } from './wheel.js'

// Utility
const byId = (id, root = document) => root.getElementById(id);
const byClass = (clnm, root = document) => root.getElementsByClassName(clnm);
const bySel = (sel, root = document) => root.querySelector(sel);

// Form functionality
// -----------------------------------------------------------------------------

// Create an option input field block along with its control buttons and their event listeners.
function createInput(value) {
    const node = document.importNode(byId('template_option').content, true);

    const input = bySel('.wheelOptionInput', node);
    input.value = value || '';
    input.addEventListener('blur', updateWheel);

    bySel('.wheelOptionInputRemove', node).addEventListener('click', removeInput);
    bySel('.wheelOptionInputClear', node).addEventListener('click', clearInput);
    bySel('.wheelOptionInputDuplicate', node).addEventListener('click', duplicateInput);

    return node;
}

// Append an option input field block to the form
function addInput(_, optionalValue) {
    const node = createInput(optionalValue);
    byId('options').appendChild(node);
}

// Duplicate an existing option input block, and insert it above the node that triggered the event.
function duplicateInput(e) {
    const value = bySel('.wheelOptionInput', e.target.parentNode).value;
    const node = createInput(value);
    byId('options').insertBefore(node, e.target.parentNode);
    updateWheel();
}

// Reset the value of an associated input field, and update wheel labels to reflect the change.
function clearInput(e) {
    e.target.parentNode.getElementsByClassName('wheelOptionInput')[0].value = '';
    updateWheel();
}

// Remove a single input;
// Get the parent of the button that was clicked, and remove it via its own parent.
// Update wheel labels afterwards.
function removeInput(e) {
    const toRemove = e.target.parentNode;
    toRemove.parentNode.removeChild(toRemove);
    updateWheel();
}

// Clear all option fields from the form.
function resetFields() {
    Array.from(byClass('wheelOptionInput'))
        .forEach(el => { el.value = '' });
    updateWheel();
}

// Collect all relevant form inputs, create an array from the non-empty values,
// and turn it into wheel labels.
function updateWheel(e) {
    if (e) e.preventDefault();

    const options = Array.from(byClass('wheelOptionInput'))
        .reduce((ac, el) => {
            if (el && el.value && el.value != '') ac.push(el.value);
            return ac;
        }, []);

    setLabels(options);
}

// Set up control button listeners.
byId('resetBtn').addEventListener('click', resetFields);
byId('addBtn').addEventListener('click', addInput);
byId('wheelForm').addEventListener('submit', updateWheel);

// Wheel / Options setup - Initial fields/labels
// -----------------------------------------------------------------------------

// initially reset the page
resetFields();

// Defaults with values - send only these (no empties) to wheel
const defaults = [ 'Spin Again' ];
setLabels(defaults);

// easiest way to add empty fields
const padding = new Array(15).fill('');
[...defaults, ...padding].forEach(val => addInput(null, val));

// Results
// -----------------------------------------------------------------------------

// Clear the results history panel.
export function clearResults() {
    Array.from(byClass('resultsItem'))
        .forEach(el => el.parentNode.removeChild(el));
}

// Log a new result. We export this so the wheel module can import and use it.
export function logResult(msg) {
    const newNode = document.createElement('li');
    newNode.appendChild(document.createTextNode(msg));
    newNode.className = 'resultsItem';
    byId('resultsList').prepend(newNode);
}

// Initially clear the results section.
clearResults();
