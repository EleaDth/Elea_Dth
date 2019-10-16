import { SvelteComponent, init, noop, safe_not_equal } from "svelte/internal";

function create_fragment(ctx) {
	let title_value;
	document.title = title_value = "a " + ctx.custom + " title";

	return {
		c: noop,
		m: noop,
		p(changed, ctx) {
			if (changed.custom && title_value !== (title_value = "a " + ctx.custom + " title")) {
				document.title = title_value;
			}
		},
		i: noop,
		o: noop,
		d: noop
	};
}

function instance($$self, $$props, $$invalidate) {
	let { custom } = $$props;

	$$self.$set = $$props => {
		if ("custom" in $$props) $$invalidate("custom", custom = $$props.custom);
	};

	return { custom };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, ["custom"]);
	}
}

export default Component;