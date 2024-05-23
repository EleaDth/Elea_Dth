import { HYDRATION_END, HYDRATION_START } from '../../../constants.js';
import { hydrating } from '../dom/hydration.js';
import { is_array } from '../utils.js';

/**
 * @param {any} fn
 * @param {string} filename
 * @param {import('../../../compiler/phases/3-transform/client/types.js').SourceLocation[]} locations
 * @returns {any}
 */
export function add_locations(fn, filename, locations) {
	return (/** @type {any[]} */ ...args) => {
		const dom = fn(...args);

		var node = hydrating && is_array(dom) ? dom[0] : dom.nodeType === 11 ? dom.firstChild : dom;
		assign_locations(node, filename, locations);

		return dom;
	};
}

/**
 * @param {Element} element
 * @param {string} filename
 * @param {import('../../../compiler/phases/3-transform/client/types.js').SourceLocation} location
 */
function assign_location(element, filename, location) {
	// @ts-expect-error
	element.__svelte_meta = {
		loc: { file: filename, line: location[0], column: location[1] }
	};

	if (location[2]) {
		assign_locations(element.firstChild, filename, location[2]);
	}
}

/**
 * @param {Node | null} node
 * @param {string} filename
 * @param {import('../../../compiler/phases/3-transform/client/types.js').SourceLocation[]} locations
 */
function assign_locations(node, filename, locations) {
	var i = 0;
	var depth = 0;

	while (node && i < locations.length) {
		if (hydrating && node.nodeType === 8) {
			var comment = /** @type {Comment} */ (node);
			if (comment.data === HYDRATION_START) depth += 1;
			else if (comment.data[0] === HYDRATION_END) depth -= 1;
		}

		if (depth === 0 && node.nodeType === 1) {
			assign_location(/** @type {Element} */ (node), filename, locations[i++]);
		}

		node = node.nextSibling;
	}
}
