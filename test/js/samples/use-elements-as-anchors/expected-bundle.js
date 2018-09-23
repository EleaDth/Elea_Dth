function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function append(target, node) {
	target.appendChild(node);
}

function insert(target, node, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = noop;

	this._fragment.d(detach !== false);
	this._fragment = null;
	this._state = {};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			try {
				handler.__calling = true;
				handler.call(this, data);
			} finally {
				handler.__calling = false;
			}
		}
	}
}

function flush(component) {
	component._lock = true;
	callAll(component._beforecreate);
	callAll(component._oncreate);
	callAll(component._aftercreate);
	component._lock = false;
}

function get() {
	return this._state;
}

function init(component, options) {
	component._handlers = blankObject();
	component._slots = blankObject();
	component._bind = options._bind;
	component._staged = {};

	component.options = options;
	component.root = options.root || component;
	component.store = options.store || component.root.store;

	if (!options.root) {
		component._beforecreate = [];
		component._oncreate = [];
		component._aftercreate = [];
	}
}

function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	flush(this.root);
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	newState = assign(this._staged, newState);
	this._staged = {};

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function _stage(newState) {
	assign(this._staged, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

var proto = {
	destroy,
	get,
	fire,
	on,
	set,
	_recompute: noop,
	_set,
	_stage,
	_mount,
	_differs
};

/* generated by Svelte vX.Y.Z */

function create_main_fragment(component, ctx) {
	var div, text0, p0, text2, text3, text4, p1, text6, text7, text8, if_block4_anchor;

	var if_block0 = (ctx.a) && create_if_block_4(component, ctx);

	var if_block1 = (ctx.b) && create_if_block_3(component, ctx);

	var if_block2 = (ctx.c) && create_if_block_2(component, ctx);

	var if_block3 = (ctx.d) && create_if_block_1(component, ctx);

	var if_block4 = (ctx.e) && create_if_block(component, ctx);

	return {
		c() {
			div = createElement("div");
			if (if_block0) if_block0.c();
			text0 = createText("\n\n\t");
			p0 = createElement("p");
			p0.textContent = "this can be used as an anchor";
			text2 = createText("\n\n\t");
			if (if_block1) if_block1.c();
			text3 = createText("\n\n\t");
			if (if_block2) if_block2.c();
			text4 = createText("\n\n\t");
			p1 = createElement("p");
			p1.textContent = "so can this";
			text6 = createText("\n\n\t");
			if (if_block3) if_block3.c();
			text7 = createText("\n\n\t\n");
			text8 = createText("\n\n");
			if (if_block4) if_block4.c();
			if_block4_anchor = createComment();
		},

		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, text0);
			append(div, p0);
			append(div, text2);
			if (if_block1) if_block1.m(div, null);
			append(div, text3);
			if (if_block2) if_block2.m(div, null);
			append(div, text4);
			append(div, p1);
			append(div, text6);
			if (if_block3) if_block3.m(div, null);
			append(div, text7);
			insert(target, text8, anchor);
			if (if_block4) if_block4.m(target, anchor);
			insert(target, if_block4_anchor, anchor);
		},

		p(changed, ctx) {
			if (ctx.a) {
				if (!if_block0) {
					if_block0 = create_if_block_4(component, ctx);
					if_block0.c();
					if_block0.m(div, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (ctx.b) {
				if (!if_block1) {
					if_block1 = create_if_block_3(component, ctx);
					if_block1.c();
					if_block1.m(div, text3);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (ctx.c) {
				if (!if_block2) {
					if_block2 = create_if_block_2(component, ctx);
					if_block2.c();
					if_block2.m(div, text4);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (ctx.d) {
				if (!if_block3) {
					if_block3 = create_if_block_1(component, ctx);
					if_block3.c();
					if_block3.m(div, text7);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (ctx.e) {
				if (!if_block4) {
					if_block4 = create_if_block(component, ctx);
					if_block4.c();
					if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}
		},

		d(detach) {
			if (detach) {
				detachNode(div);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (detach) {
				detachNode(text8);
			}

			if (if_block4) if_block4.d(detach);
			if (detach) {
				detachNode(if_block4_anchor);
			}
		}
	};
}

// (2:1) {#if a}
function create_if_block_4(component, ctx) {
	var p;

	return {
		c() {
			p = createElement("p");
			p.textContent = "a";
		},

		m(target, anchor) {
			insert(target, p, anchor);
		},

		d(detach) {
			if (detach) {
				detachNode(p);
			}
		}
	};
}

// (8:1) {#if b}
function create_if_block_3(component, ctx) {
	var p;

	return {
		c() {
			p = createElement("p");
			p.textContent = "b";
		},

		m(target, anchor) {
			insert(target, p, anchor);
		},

		d(detach) {
			if (detach) {
				detachNode(p);
			}
		}
	};
}

// (12:1) {#if c}
function create_if_block_2(component, ctx) {
	var p;

	return {
		c() {
			p = createElement("p");
			p.textContent = "c";
		},

		m(target, anchor) {
			insert(target, p, anchor);
		},

		d(detach) {
			if (detach) {
				detachNode(p);
			}
		}
	};
}

// (18:1) {#if d}
function create_if_block_1(component, ctx) {
	var p;

	return {
		c() {
			p = createElement("p");
			p.textContent = "d";
		},

		m(target, anchor) {
			insert(target, p, anchor);
		},

		d(detach) {
			if (detach) {
				detachNode(p);
			}
		}
	};
}

// (25:0) {#if e}
function create_if_block(component, ctx) {
	var p;

	return {
		c() {
			p = createElement("p");
			p.textContent = "e";
		},

		m(target, anchor) {
			insert(target, p, anchor);
		},

		d(detach) {
			if (detach) {
				detachNode(p);
			}
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);
	this._intro = true;

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);

export default SvelteComponent;
