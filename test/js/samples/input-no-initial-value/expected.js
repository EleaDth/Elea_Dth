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
	run_all,
	safe_not_equal,
	set_input_value,
	space
} from "svelte/internal";

function create_fragment(ctx) {
	let form;
	let input;
	let t0;
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			form = element("form");
			input = element("input");
			t0 = space();
			button = element("button");
			button.textContent = "Store";
			attr(input, "type", "text");
			input.required = true;
		},
		m(target, anchor) {
			insert(target, form, anchor);
			append(form, input);
			set_input_value(input, /*test*/ ctx[0]);
			append(form, t0);
			append(form, button);

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[2]),
					listen(form, "submit", /*handleSubmit*/ ctx[1])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*test*/ 1 && input.value !== /*test*/ ctx[0]) {
				set_input_value(input, /*test*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(form);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let test = undefined;

	function handleSubmit(event) {
		event.preventDefault();
		console.log("value", test);
	}

	function input_input_handler() {
		test = this.value;
		$$invalidate(0, test);
	}

	return [test, handleSubmit, input_input_handler];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {}, noop);
	}
}

export default Component;