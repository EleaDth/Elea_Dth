/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append,
	create_root_component_slots,
	create_slot,
	detach,
	element,
	get_slot_changes,
	get_slot_context,
	init,
	insert,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "svelte/internal";

const get_slot1_slot_changes = () => ({});
const get_slot1_slot_context = () => ({});

function create_fragment(ctx) {
	var div, t, current;

	const default_slot_1 = ctx.$$slots.default;
	const default_slot = create_slot(default_slot_1, ctx, null);

	const slot1_slot_1 = ctx.$$slots.slot1;
	const slot1_slot = create_slot(slot1_slot_1, ctx, get_slot1_slot_context);

	return {
		c() {
			div = element("div");

			if (default_slot) default_slot.c();
			t = space();

			if (slot1_slot) slot1_slot.c();
		},

		l(nodes) {
			if (default_slot) default_slot.l(div_nodes);

			if (slot1_slot) slot1_slot.l(div_nodes);
		},

		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			append(div, t);

			if (slot1_slot) {
				slot1_slot.m(div, null);
			}

			current = true;
		},

		p(changed, ctx) {
			if (default_slot && default_slot.p && changed.$$scope) {
				default_slot.p(get_slot_changes(default_slot_1, ctx, changed, null), get_slot_context(default_slot_1, ctx, null));
			}

			if (slot1_slot && slot1_slot.p && changed.$$scope) {
				slot1_slot.p(get_slot_changes(slot1_slot_1, ctx, changed, get_slot1_slot_changes), get_slot_context(slot1_slot_1, ctx, get_slot1_slot_context));
			}
		},

		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			transition_in(slot1_slot, local);
			current = true;
		},

		o(local) {
			transition_out(default_slot, local);
			transition_out(slot1_slot, local);
			current = false;
		},

		d(detaching) {
			if (detaching) {
				detach(div);
			}

			if (default_slot) default_slot.d(detaching);

			if (slot1_slot) slot1_slot.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots = {}, $$scope } = $$props;

	$$self.$set = $$props => {
		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
	};

	return { $$slots, $$scope };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (options.slots) {
			options.props = options.props || {};
			options.props.$$scope = {};
			options.props.$$slots = create_root_component_slots(options.slots);
		}
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Component;
