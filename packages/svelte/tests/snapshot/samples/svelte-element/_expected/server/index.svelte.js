import * as $ from "svelte/internal/server";

export default function Svelte_element($$payload, $$props) {
	$.push(true);

	let { tag = 'hr' } = $$props;

	$$payload.out += `<!--[-->`;
	if (tag) $.element($$payload, tag, () => {}, () => {});
	$$payload.out += `<!--]-->`;
	$.pop();
}