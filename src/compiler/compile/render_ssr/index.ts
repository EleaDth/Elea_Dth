import { b } from 'code-red';
import Component from '../Component';
import { CompileOptions } from '../../interfaces';
import { stringify } from '../utils/stringify';
import Renderer from './Renderer';
import { INode as TemplateNode } from '../nodes/interfaces'; // TODO
import Text from '../nodes/Text';

export default function ssr(
	component: Component,
	options: CompileOptions
) {
	const renderer = new Renderer();

	const { name } = component;

	// create $$render function
	renderer.render(trim(component.fragment.children), Object.assign({
		locate: component.locate
	}, options));

	// TODO put this inside the Renderer class
	renderer.literal.quasis.push(renderer.state.quasi);

	// TODO concatenate CSS maps
	const css = options.customElement ?
		{ code: null, map: null } :
		component.stylesheet.render(options.filename, true);

	const reactive_stores = component.vars.filter(variable => variable.name[0] === '$' && variable.name[1] !== '$');
	const reactive_store_values = reactive_stores
		.map(({ name }) => {
			const store_name = name.slice(1);
			const store = component.var_lookup.get(store_name);
			if (store && store.hoistable) return;

			const assignment = `${name} = @get_store_value(${store_name});`;

			return component.compile_options.dev
				? `@validate_store(${store_name}, '${store_name}'); ${assignment}`
				: assignment;
		});

	// TODO remove this, just use component.vars everywhere
	const props = component.vars.filter(variable => !variable.module && variable.export_name);

	component.rewrite_props(({ name }) => {
		const value = `$${name}`;

		const get_store_value = component.helper('get_store_value');

		let insert = b`${value} = ${get_store_value}(${name})`;
		if (component.compile_options.dev) {
			const validate_store = component.helper('validate_store');
			insert = b`${validate_store}(${name}, '${name}'); ${insert}`;
		}

		return insert;
	});

	const instance_javascript = component.extract_javascript(component.ast.instance);

	// TODO only do this for props with a default value
	const parent_bindings = instance_javascript
		? props.map(prop => {
			return b`if ($$props.${prop.export_name} === void 0 && $$bindings.${prop.export_name} && ${prop.name} !== void 0) $$bindings.${prop.export_name}(${prop.name});`;
		})
		: [];

	const reactive_declarations = component.reactive_declarations.map(_d => {
		throw new Error('TODO');
		// let snippet = `[✂${d.node.body.start}-${d.node.end}✂]`;

		// if (d.declaration) {
		// 	const declared = extract_names(d.declaration);
		// 	const injected = declared.filter(name => {
		// 		return name[0] !== '$' && component.var_lookup.get(name).injected;
		// 	});

		// 	const self_dependencies = injected.filter(name => d.dependencies.has(name));

		// 	if (injected.length) {
		// 		// in some cases we need to do `let foo; [expression]`, in
		// 		// others we can do `let [expression]`
		// 		const separate = (
		// 			self_dependencies.length > 0 ||
		// 			declared.length > injected.length
		// 		);

		// 		snippet = separate
		// 			? `let ${injected.join(', ')}; ${snippet}`
		// 			: `let ${snippet}`;
		// 	}
		// }

		// return snippet;
	});

	const main = renderer.has_bindings
		? b`
			let $$settled;
			let $$rendered;

			do {
				$$settled = true;

				${reactive_store_values}

				${reactive_declarations}

				$$rendered = ${renderer.literal};
			} while (!$$settled);

			return $$rendered;
		`
		: b`
			${reactive_store_values}

			${reactive_declarations}

			return ${renderer.literal};`;

	const blocks = [
		...reactive_stores.map(({ name }) => {
			const store_name = name.slice(1);
			const store = component.var_lookup.get(store_name);
			if (store && store.hoistable) {
				const get_store_value = component.helper('get_store_value');
				return b`let ${name} = ${get_store_value}(${store_name});`;
			}
			return b`let ${name};`;
		}),

		instance_javascript,
		...parent_bindings,
		css.code && b`$$result.css.add(#css);`,
		main
	].filter(Boolean);

	return b`
		${css.code && b`
		const #css = {
			code: ${css.code ? stringify(css.code) : `''`},
			map: ${css.map ? stringify(css.map.toString()) : 'null'}
		};`}

		${component.extract_javascript(component.ast.module)}

		${component.fully_hoisted}

		const ${name} = @create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
			${blocks}
		});
	`;
}

function trim(nodes: TemplateNode[]) {
	let start = 0;
	for (; start < nodes.length; start += 1) {
		const node = nodes[start] as Text;
		if (node.type !== 'Text') break;

		node.data = node.data.replace(/^\s+/, '');
		if (node.data) break;
	}

	let end = nodes.length;
	for (; end > start; end -= 1) {
		const node = nodes[end - 1] as Text;
		if (node.type !== 'Text') break;

		node.data = node.data.replace(/\s+$/, '');
		if (node.data) break;
	}

	return nodes.slice(start, end);
}
