/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent as SvelteComponent_1,
	append,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	text
} from "svelte/internal";

function create_fragment(ctx) {
	var button, t1, p, t2, t3, dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "foo";
			t1 = text("\n\n");
			p = element("p");
			t2 = text("x: ");
			t3 = text(ctx.x);
			dispose = listen(button, "click", ctx.click_handler);
		},

		m(target, anchor) {
			insert(target, button, anchor);
			insert(target, t1, anchor);
			insert(target, p, anchor);
			append(p, t2);
			append(p, t3);
		},

		p(changed, ctx) {
			if (changed.x) {
				set_data(t3, ctx.x);
			}
		},

		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(button);
				detach(t1);
				detach(p);
			}

			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let x = 0;

	function click_handler() {
		if (true) { x += 1; $$invalidate('x', x); }
	}

	return { x, click_handler };
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default SvelteComponent;