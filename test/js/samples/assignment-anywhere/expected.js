/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "svelte/internal";

function create_fragment(ctx) {
	var button, t1, span, t2, t3, span_class_value, dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "Click";
			t1 = space();
			span = element("span");
			t2 = text("text + ");
			t3 = text(ctx.num);
			attr(span, "class", span_class_value = "text " + (ctx.toggle ? "red" : "blue"));
			dispose = listen(button, "click", ctx._toggleMe);
		},

		m(target, anchor) {
			insert(target, button, anchor);
			insert(target, t1, anchor);
			insert(target, span, anchor);
			append(span, t2);
			append(span, t3);
		},

		p(changed, ctx) {
			if (changed.num) {
				set_data(t3, ctx.num);
			}

			if ((changed.toggle) && span_class_value !== (span_class_value = "text " + (ctx.toggle ? "red" : "blue"))) {
				attr(span, "class", span_class_value);
			}
		},

		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(button);
				detach(t1);
				detach(span);
			}

			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let toggle = false;
		let num = 1

    function _toggleMe() {

        if ($$invalidate('toggle', toggle = !toggle)) {
            console.log(toggle);
        } else {
            console.log(toggle);
        }
		}

		function _increaseMe(){
			if($$invalidate('num', num += 3)){
				console.log('num has been increased')
			}
		}

	return { toggle, num, _toggleMe };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Component;
