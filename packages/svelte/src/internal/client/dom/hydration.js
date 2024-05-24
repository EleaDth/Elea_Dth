import { DEV } from 'esm-env';
import { HYDRATION_END, HYDRATION_START, HYDRATION_ERROR } from '../../../constants.js';
import * as w from '../warnings.js';
import { remove_nodes } from './operations.js';

/**
 * Use this variable to guard everything related to hydration code so it can be treeshaken out
 * if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
 */
export let hydrating = false;

/** @param {boolean} value */
export function set_hydrating(value) {
	hydrating = value;
}

/** @type {import('#client').TemplateNode} */
export let hydrate_start = /** @type {any} */ (null);

/** @type {import('#client').TemplateNode} */
export let hydrate_end = /** @type {any} */ (null);

/**
 * @param {import('#client').TemplateNode} start
 * @param {import('#client').TemplateNode} end
 */
export function set_hydrate_nodes(start, end) {
	hydrate_start = start;
	hydrate_end = end;
}

/**
 * This function is only called when `hydrating` is true. If passed a `<!--[-->` opening
 * hydration marker, it finds the corresponding closing marker and sets `hydrate_start`
 * and `hydrate_end` to the content inside, before returning the closing marker.
 * @param {Node} node
 * @returns {Node}
 */
export function hydrate_anchor(node) {
	if (node.nodeType !== 8) {
		return node;
	}

	var current = /** @type {Node | null} */ (node);

	// TODO this could have false positives, if a user comment consisted of `[`. need to tighten that up
	if (/** @type {Comment} */ (current).data !== HYDRATION_START) {
		return node;
	}

	/** @type {import('#client').TemplateNode} */
	var start = /** @type {any} */ (null);
	var depth = 0;

	while ((current = /** @type {Node} */ (current).nextSibling) !== null) {
		if (current.nodeType === 8) {
			var data = /** @type {Comment} */ (current).data;

			if (data === HYDRATION_START) {
				depth += 1;
			} else if (data[0] === HYDRATION_END) {
				if (depth === 0) {
					hydrate_start = start;
					return current;
				}

				depth -= 1;
			}
		}

		start ??= /** @type {import('#client').TemplateNode} */ (current);
		hydrate_end = /** @type {import('#client').TemplateNode} */ (current);
	}

	let location;

	if (DEV) {
		// @ts-expect-error
		const loc = node.parentNode?.__svelte_meta?.loc;
		if (loc) {
			location = `${loc.file}:${loc.line}:${loc.column}`;
		}
	}

	w.hydration_mismatch(location);
	throw HYDRATION_ERROR;
}

export function remove_hydrate_nodes() {
	remove_nodes(hydrate_start, hydrate_end);
}
