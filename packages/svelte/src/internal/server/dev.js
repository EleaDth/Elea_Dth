import {
	disallowed_paragraph_contents,
	interactive_elements,
	is_tag_valid_with_parent
} from '../../constants.js';
import { current_component } from './context.js';

/**
 * @typedef {{
 * 	tag: string;
 * 	parent: null | Element;
 *  filename: string;
 * }} Element
 */

/**
 * @type {Element | null}
 */
let current_element = null;

/**
 * @param {import('#server').Payload} payload
 * @param {string} message
 */
function error_on_client(payload, message) {
	message =
		`Svelte SSR validation error:\n\n${message}\n\n` +
		'Ensure your components render valid HTML as the browser will try to repair invalid HTML, ' +
		'which may result in content being shifted around and will likely result in a hydration mismatch.';
	// eslint-disable-next-line no-console
	console.error(message);
	payload.head.out += `<script>console.error(\`${message}\`)</script>`;
}

/**
 * @param {string} file
 */
function print_file(file) {
	return file ? `(${file})` : '';
}

/**
 * @param {import('#server').Payload} payload
 * @param {string} tag
 * @param {number} line
 * @param {number} column
 */
export function push_element(payload, tag, line, column) {
	var filename = /** @type {import('#server').Component} */ (current_component).function.filename;

	if (current_element !== null && !is_tag_valid_with_parent(tag, current_element.tag)) {
		error_on_client(
			payload,
			`<${tag}> ${print_file(filename)} is not a valid child element of <${current_element.tag}> ${print_file(current_element.filename)}`
		);
	}

	if (interactive_elements.has(tag)) {
		let element = current_element;
		while (element !== null) {
			if (interactive_elements.has(element.tag)) {
				error_on_client(
					payload,
					`<${tag}> ${print_file(filename)} is not a valid child element of <${element.tag}> ${print_file(element.filename)}`
				);
			}
			element = element.parent;
		}
	}

	if (disallowed_paragraph_contents.includes(tag)) {
		let element = current_element;
		while (element !== null) {
			if (element.tag === 'p') {
				error_on_client(
					payload,
					`<${tag}> ${print_file(filename)} is not a valid child element of <p> ${print_file(element.filename)}`
				);
			}
			element = element.parent;
		}
	}

	current_element = {
		tag,
		parent: current_element,
		filename
	};
}

export function pop_element() {
	current_element = /** @type {Element} */ (current_element).parent;
}
