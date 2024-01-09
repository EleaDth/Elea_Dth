import { key } from './render.js';
import { source, set, get } from './runtime.js';
import { current_hydration_fragment } from './hydration.js';
import { child_frag } from './operations.js';
import { proxy } from './proxy/proxy.js';

/**
 * @typedef {Record<string | symbol, any> | undefined} ComponentReturn
 *
 * @typedef {any[]} ComponentArgs
 *
 * @typedef {(...args: ComponentArgs) => ComponentReturn} Component
 *
 * @typedef {{
 *    set_component: (new_component: Component) => void
 *    proxy_component?: (...args: ComponentArgs) => ComponentReturn
 * }} HotData<Component>
 */

function find_surrounding_ssr_commments() {
	if (!current_hydration_fragment?.[0]) return null;

	/** @type {Comment | undefined} */
	let before;
	/** @type {Comment | undefined} */
	let after;
	/** @type {Node | null | undefined} */
	let node;

	node = current_hydration_fragment[0].previousSibling;
	while (node) {
		const comment = /** @type {Comment} */ (node);
		if (node.nodeType === 8 && comment.data.startsWith('ssr:')) {
			before = comment;
			break;
		}
		node = node.previousSibling;
	}

	node = current_hydration_fragment.at(-1)?.nextSibling;
	while (node) {
		const comment = /** @type {Comment} */ (node);
		if (node.nodeType === 8 && comment.data.startsWith('ssr:')) {
			after = comment;
			break;
		}
		node = node.nextSibling;
	}

	if (before && after && before.data === after.data) {
		return [before, after];
	}

	return null;
}

/**
 * @param {Component} new_component
 */
function create_proxy_component(new_component) {
	const component_signal = source(new_component);

	let component_name = new_component.name;

	/**
	 * @type {HotData["set_component"]}
	 */
	function set_component(new_component) {
		component_name = new_component.name;
		set(component_signal, new_component);
	}

	// @ts-ignore
	function proxy_component($$anchor, ...args) {
		const accessors_proxy = proxy(/** @type {import('./proxy/proxy.js').StateObject} */ ({}));
		/** @type {Set<string>} */
		const accessors_keys = new Set();

		// During hydration the root component will receive a null $$anchor. The
		// following is a hack to get our `key` a node to render to, all while
		// avoiding it to "consume" the SSR marker.
		//
		// TODO better get the eyes of someone with understanding of hydration on this
		//
		// If this fails, we get an ugly hydration failure message, but HMR should
		// still work after that... Maybe we can show a more specific error message than
		// the generic hydration failure one (that could be misleading in this case).
		//
		if (!$$anchor && current_hydration_fragment?.[0]) {
			const ssr0 = find_surrounding_ssr_commments();
			if (ssr0) {
				const [before, after] = ssr0;
				current_hydration_fragment.unshift(before);
				current_hydration_fragment.push(after);
				$$anchor = child_frag(current_hydration_fragment);
			}
		}

		key(
			$$anchor,
			() => get(component_signal),
			($$anchor) => {
				const component = get(component_signal);

				// @ts-ignore
				const new_accessors = component($$anchor, ...args);

				const removed_keys = new Set(accessors_keys);

				if (new_accessors) {
					for (const [key, value] of Object.entries(new_accessors)) {
						accessors_proxy[key] = value;
						accessors_keys.add(key);
						removed_keys.delete(key);
					}
				}

				for (const key of removed_keys) {
					accessors_keys.delete(key);
					accessors_proxy[key] = undefined;
				}
			}
		);

		return accessors_proxy;
	}

	try {
		Object.defineProperty(proxy_component, 'name', {
			get() {
				return component_name;
			}
		});
	} catch (err) {
		console.warn("[Svelte HMR] Failed to proxy component function's name", err);
	}

	return { proxy_component, set_component };
}

/**
 * @param {HotData} hot_data
 * @param {Component} new_component
 */
export function hmr(hot_data, new_component) {
	if (hot_data.set_component) {
		hot_data.set_component(new_component);
	} else {
		({
			//
			proxy_component: hot_data.proxy_component,
			set_component: hot_data.set_component
		} = create_proxy_component(new_component));
	}

	return hot_data.proxy_component;
}
