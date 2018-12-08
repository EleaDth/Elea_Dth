/* generated by Svelte vX.Y.Z-alpha1 */
import { SvelteComponent as SvelteComponent_1, init, mount_component, noop, safe_not_equal } from "svelte/internal.js";

function create_fragment(component, ctx) {
	var current;

	var lazyload = new LazyLoad({ props: { load: func } });

	return {
		c() {
			lazyload.$$.fragment.c();
		},

		m(target, anchor) {
			mount_component(lazyload, target, anchor);
			current = true;
		},

		p: noop,

		i(target, anchor) {
			if (current) return;
			this.m(target, anchor);
		},

		o(outrocallback) {
			if (!current) return;

			if (lazyload) lazyload.$$.fragment.o(outrocallback);
			current = false;
		},

		d(detach) {
			lazyload.$destroy(detach);
		}
	};
}

function func() {
	return import('./Foo.html');
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, noop, create_fragment, safe_not_equal);
	}
}

export default SvelteComponent;