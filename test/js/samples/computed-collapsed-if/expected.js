/* generated by Svelte vX.Y.Z */
import { SvelteComponent, init, noop, safe_not_equal } from "svelte/internal";

function instance($$self, $$props, $$invalidate) {
	let { x } = $$props;

	function a() {
		return x * 2;
	}

	function b() {
		return x * 3;
	}

	$$self.$$set = $$props => {
		if ("x" in $$props) $$invalidate(0, x = $$props.x);
	};

	return [x, a, b];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, null, safe_not_equal, { x: 0, a: 1, b: 2 }, noop);
	}

	get a() {
		return this.$$.ctx[1];
	}

	get b() {
		return this.$$.ctx[2];
	}
}

export default Component;