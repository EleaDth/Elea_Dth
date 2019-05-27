/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append,
	element,
	init,
	mount_component,
	safe_not_equal
} from "svelte/internal";

function add_css() {
	var style = element("style");
	style.id = 'svelte-167wvy9-style';
	style.textContent = ".custom.svelte-167wvy9{color:'blue'}.custom2.svelte-167wvy9{background:'fuchsia'}";
	append(document.head, style);
}

function create_fragment(ctx) {
	var current;

	var nested = new ctx.Nested({
		props: {
		class: "custom custom2 " + otherCls + " svelte-167wvy9"
	}
	});

	return {
		c() {
			nested.$$.fragment.c();
		},

		m(target, anchor) {
			mount_component(nested, target, anchor);
			current = true;
		},

		p(changed, ctx) {
			var nested_changes = {};
			if (changed.otherCls) nested_changes.class = "custom custom2 " + otherCls + " svelte-167wvy9";
			nested.$set(nested_changes);
		},

		i(local) {
			if (current) return;
			nested.$$.fragment.i(local);

			current = true;
		},

		o(local) {
			nested.$$.fragment.o(local);
			current = false;
		},

		d(detaching) {
			nested.$destroy(detaching);
		}
	};
}

let otherCls = 'asd';

function instance($$self) {
	const Nested = window.Nested;

	return { Nested };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-167wvy9-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Component;
