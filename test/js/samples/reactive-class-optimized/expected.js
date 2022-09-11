/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	component_subscribe,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	space,
	subscribe_dynamic_store,
	toggle_class
} from "svelte/internal";

import { reactiveStoreVal, unreactiveExport } from './store';

function create_fragment(ctx) {
	let div0;
	let t0;
	let div1;
	let t1;
	let div2;
	let t2;
	let div3;
	let t3;
	let div4;
	let t4;
	let div5;
	let t5;
	let div6;
	let t6;
	let div7;
	let t7;
	let div8;

	return {
		c() {
			div0 = element("div");
			t0 = space();
			div1 = element("div");
			t1 = space();
			div2 = element("div");
			t2 = space();
			div3 = element("div");
			t3 = space();
			div4 = element("div");
			t4 = space();
			div5 = element("div");
			t5 = space();
			div6 = element("div");
			t6 = space();
			div7 = element("div");
			t7 = space();
			div8 = element("div");
			toggle_class(div0, "update1", reactiveModuleVar);
			toggle_class(div1, "update2", /*reactiveConst*/ ctx[0].x);
			toggle_class(div2, "update3", nonReactiveGlobal && /*reactiveConst*/ ctx[0].x);
			toggle_class(div3, "update4", /*$reactiveStoreVal*/ ctx[2]);
			toggle_class(div4, "update5", /*$reactiveDeclaration*/ ctx[3]);
			toggle_class(div5, "static1", nonReactiveModuleVar);
			toggle_class(div6, "static2", nonReactiveGlobal);
			toggle_class(div7, "static3", nonReactiveModuleVar && nonReactiveGlobal);
			toggle_class(div8, "static4", unreactiveExport);
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t0, anchor);
			insert(target, div1, anchor);
			insert(target, t1, anchor);
			insert(target, div2, anchor);
			insert(target, t2, anchor);
			insert(target, div3, anchor);
			insert(target, t3, anchor);
			insert(target, div4, anchor);
			insert(target, t4, anchor);
			insert(target, div5, anchor);
			insert(target, t5, anchor);
			insert(target, div6, anchor);
			insert(target, t6, anchor);
			insert(target, div7, anchor);
			insert(target, t7, anchor);
			insert(target, div8, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*reactiveModuleVar*/ 0) {
				toggle_class(div0, "update1", reactiveModuleVar);
			}

			if (dirty & /*reactiveConst*/ 1) {
				toggle_class(div1, "update2", /*reactiveConst*/ ctx[0].x);
			}

			if (dirty & /*nonReactiveGlobal, reactiveConst*/ 1) {
				toggle_class(div2, "update3", nonReactiveGlobal && /*reactiveConst*/ ctx[0].x);
			}

			if (dirty & /*$reactiveStoreVal*/ 4) {
				toggle_class(div3, "update4", /*$reactiveStoreVal*/ ctx[2]);
			}

			if (dirty & /*$reactiveDeclaration*/ 8) {
				toggle_class(div4, "update5", /*$reactiveDeclaration*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t0);
			if (detaching) detach(div1);
			if (detaching) detach(t1);
			if (detaching) detach(div2);
			if (detaching) detach(t2);
			if (detaching) detach(div3);
			if (detaching) detach(t3);
			if (detaching) detach(div4);
			if (detaching) detach(t4);
			if (detaching) detach(div5);
			if (detaching) detach(t5);
			if (detaching) detach(div6);
			if (detaching) detach(t6);
			if (detaching) detach(div7);
			if (detaching) detach(t7);
			if (detaching) detach(div8);
		}
	};
}

let nonReactiveModuleVar = Math.random();
let reactiveModuleVar = Math.random();

function instance($$self, $$props, $$invalidate) {
	let reactiveDeclaration;
	let $reactiveStoreVal;

	let $reactiveDeclaration,
		$$unsubscribe_reactiveDeclaration = noop,
		$$subscribe_reactiveDeclaration = () => ($$unsubscribe_reactiveDeclaration(), $$unsubscribe_reactiveDeclaration = subscribe_dynamic_store(reactiveDeclaration, $$value => $$invalidate(3, $reactiveDeclaration = $$value)), reactiveDeclaration);

	component_subscribe($$self, reactiveStoreVal, $$value => $$invalidate(2, $reactiveStoreVal = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_reactiveDeclaration());
	nonReactiveGlobal = Math.random();
	const reactiveConst = { x: Math.random() };
	reactiveModuleVar += 1;

	if (Math.random()) {
		reactiveConst.x += 1;
	}

	$: $$subscribe_reactiveDeclaration($$invalidate(1, reactiveDeclaration = reactiveModuleVar * 2));
	return [reactiveConst, reactiveDeclaration, $reactiveStoreVal, $reactiveDeclaration];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;