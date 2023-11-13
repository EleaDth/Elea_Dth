import { current_hydration_fragment, get_hydration_fragment } from './hydration.js';
import { get_descriptor } from './utils.js';

/** This file is also loaded in server environments, so we need guard against eagerly accessing browser globals  */
const has_browser_globals = typeof window !== 'undefined';

// We cache the Node and Element prototype methods, so that subsequent calls-sites are monomorphic rather
// than megamorphic.
const node_prototype = /** @type {Node} */ (has_browser_globals ? Node.prototype : {});
const html_element_prototype = /** @type {Element} */ (
	has_browser_globals ? HTMLElement.prototype : {}
);
const text_prototype = /** @type {Text} */ (has_browser_globals ? Text.prototype : {});
const map_prototype = Map.prototype;
const append_child_method = node_prototype.appendChild;
const clone_node_method = node_prototype.cloneNode;
const map_set_method = map_prototype.set;
const map_get_method = map_prototype.get;
const map_delete_method = map_prototype.delete;
// @ts-expect-error improve perf of expando on DOM events
html_element_prototype.__click = undefined;
// @ts-expect-error improve perf of expando on DOM text updates
text_prototype.__nodeValue = ' ';
// @ts-expect-error improve perf of expando on DOM className updates
html_element_prototype.__className = '';

const first_child_get = /** @type {(this: Node) => ChildNode | null} */ (
	// @ts-ignore
	has_browser_globals ? get_descriptor(node_prototype, 'firstChild').get : null
);

const next_sibling_get = /** @type {(this: Node) => ChildNode | null} */ (
	// @ts-ignore
	has_browser_globals ? get_descriptor(node_prototype, 'nextSibling').get : null
);

const text_content_set = /** @type {(this: Node, text: string ) => void} */ (
	// @ts-ignore
	has_browser_globals ? get_descriptor(node_prototype, 'textContent').set : null
);

/**
 * @template {Element} E
 * @template {Node} T
 * @param {E} element
 * @param {T} child
 */
export function append_child(element, child) {
	append_child_method.call(element, child);
}

/**
 * @template K
 * @template V
 * @param {Map<K, V>} map
 * @param {K} key
 * @param {V} value
 */
export function map_set(map, key, value) {
	map_set_method.call(map, key, value);
}

/**
 * @template K
 * @template V
 * @param {Map<K, V>} map
 * @param {K} key
 */
export function map_delete(map, key) {
	map_delete_method.call(map, key);
}

/**
 * @template K
 * @template V
 * @param {Map<K, V>} map
 * @param {K} key
 * @return {V}
 */
export function map_get(map, key) {
	return map_get_method.call(map, key);
}

/**
 * @template {Node} N
 * @param {N} node
 * @param {boolean} deep
 * @returns {N}
 */
/*#__NO_SIDE_EFFECTS__*/
export function clone_node(node, deep) {
	return /** @type {N} */ (clone_node_method.call(node, deep));
}

/**
 * @template {Node} N
 * @param {N} node
 * @returns {Node | null}
 */
/*#__NO_SIDE_EFFECTS__*/
export function child(node) {
	const child = first_child_get.call(node);
	if (current_hydration_fragment !== null) {
		// Child can be null if we have an element with a single child, like `<p>{text}</p>`, where `text` is empty
		if (child === null) {
			const text = document.createTextNode('');
			node.appendChild(text);
			return text;
		} else {
			return capture_fragment_from_node(child);
		}
	}
	return child;
}

/**
 * @template {Node | Node[]} N
 * @param {N} node
 * @returns {Node | null}
 */
/*#__NO_SIDE_EFFECTS__*/
export function child_frag(node) {
	if (current_hydration_fragment !== null) {
		const first_node = /** @type {Node[]} */ (node)[0];
		if (current_hydration_fragment !== null && first_node !== null) {
			return capture_fragment_from_node(first_node);
		}
		return first_node;
	}
	return first_child_get.call(/** @type {Node} */ (node));
}

/**
 * @template {Node} N
 * @param {N} node
 * @returns {Node | null}
 */
/*#__NO_SIDE_EFFECTS__*/
export function sibling(node) {
	const next_sibling = next_sibling_get.call(node);
	if (current_hydration_fragment !== null && next_sibling !== null) {
		return capture_fragment_from_node(next_sibling);
	}
	return next_sibling;
}

/**
 * @template {Node} N
 * @param {N} node
 * @returns {void}
 */
export function clear_text_content(node) {
	text_content_set.call(node, '');
}

/** @param {string} name */
/*#__NO_SIDE_EFFECTS__*/
export function create_element(name) {
	return document.createElement(name);
}

/**
 * @param {Node} node
 * @returns {Node}
 */
function capture_fragment_from_node(node) {
	if (
		node.nodeType === 8 &&
		/** @type {Comment} */ (node).data.startsWith('ssr:') &&
		/** @type {Array<Element | Text | Comment>} */ (current_hydration_fragment).at(-1) !== node
	) {
		const fragment = /** @type {Array<Element | Text | Comment>} */ (get_hydration_fragment(node));
		const last_child = fragment.at(-1) || node;
		const target = /** @type {Node} */ (last_child.nextSibling);
		// @ts-ignore
		target.$$fragment = fragment;
		return target;
	}
	return node;
}

// export these for reference in the compiled code, making global name deduplication unnecessary
export const $window = has_browser_globals ? window : undefined;
export const $document = has_browser_globals ? document : undefined;
