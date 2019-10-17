import {
	SvelteComponent,
	destroy_component,
	detach,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "svelte/internal";

import Imported from "Imported.svelte";

function create_fragment(ctx) {
	let t;
	let current;
	const imported = new Imported({});
	const nonimported = new NonImported({});

	return {
		c() {
			imported.$$.fragment.c();
			t = space();
			nonimported.$$.fragment.c();
		},
		m(target, anchor) {
			mount_component(imported, target, anchor);
			insert(target, t, anchor);
			mount_component(nonimported, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(imported.$$.fragment, local);
			transition_in(nonimported.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(imported.$$.fragment, local);
			transition_out(nonimported.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(imported, detaching);
			if (detaching) detach(t);
			destroy_component(nonimported, detaching);
		}
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, []);
	}
}

export default Component;