/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, append, createSvgElement, detachNode, flush, init, insert, run, safe_not_equal, setAttribute } from "svelte/internal";

function create_fragment(component, ctx) {
	var svg, g0, g1, current;

	return {
		c() {
			svg = createSvgElement("svg");
			g0 = createSvgElement("g");
			g1 = createSvgElement("g");
			setAttribute(g0, "data-foo", "bar");
			setAttribute(g1, "data-foo", ctx.bar);
		},

		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g0);
			append(svg, g1);
			current = true;
		},

		p(changed, ctx) {
			if (changed.bar) {
				setAttribute(g1, "data-foo", ctx.bar);
			}
		},

		i(target, anchor) {
			if (current) return;
			this.m(target, anchor);
		},

		o: run,

		d(detach) {
			if (detach) {
				detachNode(svg);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { bar } = $$props;

	$$self.$$.set = $$props => {
		if ('bar' in $$props) $$invalidate('bar', bar = $$props.bar);
	};

	return { bar };
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal);
	}

	get bar() {
		return this.$$.ctx.bar;
	}

	set bar(bar) {
		this.$set({ bar });
		flush();
	}
}

export default SvelteComponent;