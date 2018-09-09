import deindent from '../../utils/deindent';
import Component from '../Component';
import Stats from '../../Stats';
import Stylesheet from '../../css/Stylesheet';
import { removeNode, removeObjectKey } from '../../utils/removeNode';
import getName from '../../utils/getName';
import globalWhitelist from '../../utils/globalWhitelist';
import { Ast, Node, CompileOptions } from '../../interfaces';
import { AppendTarget } from '../../interfaces';
import { stringify } from '../../utils/stringify';

export class SsrTarget {
	bindings: string[];
	renderCode: string;
	appendTargets: AppendTarget[];

	constructor() {
		this.bindings = [];
		this.renderCode = '';
		this.appendTargets = [];
	}

	append(code: string) {
		if (this.appendTargets.length) {
			const appendTarget = this.appendTargets[this.appendTargets.length - 1];
			const slotName = appendTarget.slotStack[appendTarget.slotStack.length - 1];
			appendTarget.slots[slotName] += code;
		} else {
			this.renderCode += code;
		}
	}
}

export default function ssr(
	ast: Ast,
	source: string,
	stylesheet: Stylesheet,
	options: CompileOptions,
	stats: Stats
) {
	const format = options.format || 'cjs';

	const target = new SsrTarget();
	const component = new Component(ast, source, options.name || 'SvelteComponent', stylesheet, options, stats, target);

	const { computations, name, templateProperties } = component;

	// create main render() function
	trim(component.fragment.children).forEach((node: Node) => {
		node.ssr();
	});

	const css = component.customElement ?
		{ code: null, map: null } :
		component.stylesheet.render(options.filename, true);

	// generate initial state object
	const expectedProperties = Array.from(component.expectedProperties);
	const globals = expectedProperties.filter(prop => globalWhitelist.has(prop));
	const storeProps = expectedProperties.filter(prop => prop[0] === '$');

	const initialState = [];
	if (globals.length > 0) {
		initialState.push(`{ ${globals.map(prop => `${prop} : ${prop}`).join(', ')} }`);
	}

	if (storeProps.length > 0) {
		const initialize = `_init([${storeProps.map(prop => `"${prop.slice(1)}"`)}])`
		initialState.push(`options.store.${initialize}`);
	}

	if (templateProperties.data) {
		initialState.push(`%data()`);
	} else if (globals.length === 0 && storeProps.length === 0) {
		initialState.push('{}');
	}

	initialState.push('ctx');

	const helpers = new Set();

	// TODO concatenate CSS maps
	const result = deindent`
		${component.javascript}

		var ${name} = {};

		${options.filename && `${name}.filename = ${stringify(options.filename)}`};

		${name}.data = function() {
			return ${templateProperties.data ? `%data()` : `{}`};
		};

		${name}.render = function(state, options = {}) {
			var components = new Set();

			function addComponent(component) {
				components.add(component);
			}

			var result = { head: '', addComponent };
			var html = ${name}._render(result, state, options);

			var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\\n');

			return {
				html,
				head: result.head,
				css: { code: cssCode, map: null },
				toString() {
					return html;
				}
			};
		}

		${name}._render = function(__result, ctx, options) {
			${templateProperties.store && `options.store = %store();`}
			__result.addComponent(${name});

			ctx = Object.assign(${initialState.join(', ')});

			${computations.map(
				({ key }) => `ctx.${key} = %computed-${key}(ctx);`
			)}

			${target.bindings.length &&
				deindent`
				var settled = false;
				var tmp;

				while (!settled) {
					settled = true;

					${target.bindings.join('\n\n')}
				}
			`}

			return \`${target.renderCode}\`;
		};

		${name}.css = {
			code: ${css.code ? stringify(css.code) : `''`},
			map: ${css.map ? stringify(css.map.toString()) : 'null'}
		};

		var warned = false;

		${templateProperties.preload && `${name}.preload = %preload;`}
	`;

	return component.generate(result, options, { name, format });
}

function trim(nodes) {
	let start = 0;
	for (; start < nodes.length; start += 1) {
		const node = nodes[start];
		if (node.type !== 'Text') break;

		node.data = node.data.replace(/^\s+/, '');
		if (node.data) break;
	}

	let end = nodes.length;
	for (; end > start; end -= 1) {
		const node = nodes[end - 1];
		if (node.type !== 'Text') break;

		node.data = node.data.replace(/\s+$/, '');
		if (node.data) break;
	}

	return nodes.slice(start, end);
}
