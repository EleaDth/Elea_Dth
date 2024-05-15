/* This file is generated by scripts/process-messages/index.js. Do not edit! */

import { DEV } from 'esm-env';

/**
 * Using `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead
 * @returns {never}
 */
export function bind_invalid_checkbox_value() {
	if (DEV) {
		const error = new Error(`${"bind_invalid_checkbox_value"}\n${"Using `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("bind_invalid_checkbox_value");
	}
}

/**
 * Component %component% has an export named `%key%` that a consumer component is trying to access using `bind:%key%`, which is disallowed. Instead, use `bind:this` (e.g. `<%name% bind:this={component} />`) and then access the property on the bound component instance (e.g. `component.%key%`)
 * @param {string} component
 * @param {string} key
 * @param {string} name
 * @returns {never}
 */
export function bind_invalid_export(component, key, name) {
	if (DEV) {
		const error = new Error(`${"bind_invalid_export"}\n${`Component ${component} has an export named \`${key}\` that a consumer component is trying to access using \`bind:${key}\`, which is disallowed. Instead, use \`bind:this\` (e.g. \`<${name} bind:this={component} />\`) and then access the property on the bound component instance (e.g. \`component.${key}\`)`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("bind_invalid_export");
	}
}

/**
 * A component is attempting to bind to a non-bindable property `%key%` belonging to %component% (i.e. `<%name% bind:%key%={...}>`). To mark a property as bindable: `let { %key% = $bindable() } = $props()`
 * @param {string} key
 * @param {string} component
 * @param {string} name
 * @returns {never}
 */
export function bind_not_bindable(key, component, name) {
	if (DEV) {
		const error = new Error(`${"bind_not_bindable"}\n${`A component is attempting to bind to a non-bindable property \`${key}\` belonging to ${component} (i.e. \`<${name} bind:${key}={...}>\`). To mark a property as bindable: \`let { ${key} = $bindable() } = $props()\``}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("bind_not_bindable");
	}
}

/**
 * %parent% called `%method%` on an instance of %component%, which is no longer valid in Svelte 5. See https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes for more information
 * @param {string} parent
 * @param {string} method
 * @param {string} component
 * @returns {never}
 */
export function component_api_changed(parent, method, component) {
	if (DEV) {
		const error = new Error(`${"component_api_changed"}\n${`${parent} called \`${method}\` on an instance of ${component}, which is no longer valid in Svelte 5. See https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes for more information`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("component_api_changed");
	}
}

/**
 * Keyed each block has duplicate key `%value%` at indexes %a% and %b%
 * @param {string} a
 * @param {string} b
 * @param {string | undefined | null} [value]
 * @returns {never}
 */
export function each_key_duplicate(a, b, value) {
	if (DEV) {
		const error = new Error(`${"each_key_duplicate"}\n${value ? `Keyed each block has duplicate key \`${value}\` at indexes ${a} and ${b}` : `Keyed each block has duplicate key at indexes ${a} and ${b}`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("each_key_duplicate");
	}
}

/**
 * `%rune%` cannot be used inside an effect cleanup function
 * @param {string} rune
 * @returns {never}
 */
export function effect_in_teardown(rune) {
	if (DEV) {
		const error = new Error(`${"effect_in_teardown"}\n${`\`${rune}\` cannot be used inside an effect cleanup function`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("effect_in_teardown");
	}
}

/**
 * Effect cannot be created inside a `$derived` value that was not itself created inside an effect
 * @returns {never}
 */
export function effect_in_unowned_derived() {
	if (DEV) {
		const error = new Error(`${"effect_in_unowned_derived"}\n${"Effect cannot be created inside a `$derived` value that was not itself created inside an effect"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("effect_in_unowned_derived");
	}
}

/**
 * `%rune%` can only be used inside an effect (e.g. during component initialisation)
 * @param {string} rune
 * @returns {never}
 */
export function effect_orphan(rune) {
	if (DEV) {
		const error = new Error(`${"effect_orphan"}\n${`\`${rune}\` can only be used inside an effect (e.g. during component initialisation)`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("effect_orphan");
	}
}

/**
 * Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
 * @returns {never}
 */
export function effect_update_depth_exceeded() {
	if (DEV) {
		const error = new Error(`${"effect_update_depth_exceeded"}\n${"Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("effect_update_depth_exceeded");
	}
}

/**
 * Missing hydration closing marker
 * @returns {never}
 */
export function hydration_missing_marker_close() {
	if (DEV) {
		const error = new Error(`${"hydration_missing_marker_close"}\n${"Missing hydration closing marker"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("hydration_missing_marker_close");
	}
}

/**
 * Missing hydration opening marker
 * @returns {never}
 */
export function hydration_missing_marker_open() {
	if (DEV) {
		const error = new Error(`${"hydration_missing_marker_open"}\n${"Missing hydration opening marker"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("hydration_missing_marker_open");
	}
}

/**
 * `%name%(...)` cannot be used in runes mode
 * @param {string} name
 * @returns {never}
 */
export function lifecycle_legacy_only(name) {
	if (DEV) {
		const error = new Error(`${"lifecycle_legacy_only"}\n${`\`${name}(...)\` cannot be used in runes mode`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("lifecycle_legacy_only");
	}
}

/**
 * Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
 * @param {string} key
 * @returns {never}
 */
export function props_invalid_value(key) {
	if (DEV) {
		const error = new Error(`${"props_invalid_value"}\n${`Cannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("props_invalid_value");
	}
}

/**
 * Rest element properties of `$props()` such as `%property%` are readonly
 * @param {string} property
 * @returns {never}
 */
export function props_rest_readonly(property) {
	if (DEV) {
		const error = new Error(`${"props_rest_readonly"}\n${`Rest element properties of \`$props()\` such as \`${property}\` are readonly`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("props_rest_readonly");
	}
}

/**
 * The `%rune%` rune is only available inside `.svelte` and `.svelte.js/ts` files
 * @param {string} rune
 * @returns {never}
 */
export function rune_outside_svelte(rune) {
	if (DEV) {
		const error = new Error(`${"rune_outside_svelte"}\n${`The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files`}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("rune_outside_svelte");
	}
}

/**
 * Cannot set prototype of `$state` object
 * @returns {never}
 */
export function state_prototype_fixed() {
	if (DEV) {
		const error = new Error(`${"state_prototype_fixed"}\n${"Cannot set prototype of `$state` object"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("state_prototype_fixed");
	}
}

/**
 * Unsafe mutations during Svelte's render or derived phase are not permitted in runes mode. This can lead to unexpected errors and possibly cause infinite loops.
 * >
 * If the object is not meant to be reactive, declare it without `$state`
 * @returns {never}
 */
export function state_unsafe_mutation() {
	if (DEV) {
		const error = new Error(`${"state_unsafe_mutation"}\n${"Unsafe mutations during Svelte's render or derived phase are not permitted in runes mode. This can lead to unexpected errors and possibly cause infinite loops.\n>\nIf the object is not meant to be reactive, declare it without `$state`"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("state_unsafe_mutation");
	}
}

/**
 * The `this={...}` property of a `<svelte:component>` must be a Svelte component, if defined
 * @returns {never}
 */
export function svelte_component_invalid_this_value() {
	if (DEV) {
		const error = new Error(`${"svelte_component_invalid_this_value"}\n${"The `this={...}` property of a `<svelte:component>` must be a Svelte component, if defined"}`);

		error.name = 'Svelte error';
		throw error;
	} else {
		// TODO print a link to the documentation
		throw new Error("svelte_component_invalid_this_value");
	}
}