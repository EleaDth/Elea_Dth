import Node from './shared/Node.js';
import Attribute from './Attribute.js';
import map_children from './shared/map_children.js';
import Binding from './Binding.js';
import EventHandler from './EventHandler.js';
import Expression from './shared/Expression.js';
import Let from './Let.js';
import compiler_errors from '../compiler_errors.js';
import { regex_only_whitespaces } from '../../utils/patterns.js';

/** @extends Node */
export default class InlineComponent extends Node {
	/** @type {'InlineComponent'} */
	type;

	/** @type {string} */
	name;

	/** @type {import('./shared/Expression.js').default} */
	expression;

	/** @type {import('./Attribute.js').default[]} */
	attributes = [];

	/** @type {import('./Binding.js').default[]} */
	bindings = [];

	/** @type {import('./EventHandler.js').default[]} */
	handlers = [];

	/** @type {import('./Let.js').default[]} */
	lets = [];

	/** @type {import('./Attribute.js').default[]} */
	css_custom_properties = [];

	/** @type {import('./interfaces.js').INode[]} */
	children;

	/** @type {import('./shared/TemplateScope.js').default} */
	scope;

	/** @type {string} */
	namespace;

	/**
	 * @param {import('../Component.js').default} component
	 * @param {import('./shared/Node.js').default} parent
	 * @param {import('./shared/TemplateScope.js').default} scope
	 * @param {import('../../interfaces.js').TemplateNode} info
	 */
	constructor(component, parent, scope, info) {
		super(component, parent, scope, info);
		this.cannot_use_innerhtml();
		this.not_static_content();
		if (info.name !== 'svelte:component' && info.name !== 'svelte:self') {
			const name = info.name.split('.')[0]; // accommodate namespaces
			component.warn_if_undefined(name, info, scope);
			component.add_reference(/** @type {any} */ (this), name);
		}
		this.name = info.name;
		this.namespace = get_namespace(parent, component.namespace);
		this.expression =
			this.name === 'svelte:component'
				? new Expression(component, this, scope, info.expression)
				: null;
		info.attributes.forEach(
			/** @param {any} node */ (node) => {
				/* eslint-disable no-fallthrough */
				switch (node.type) {
					case 'Action':
						return component.error(node, compiler_errors.invalid_action);
					case 'Attribute':
						if (node.name.startsWith('--')) {
							this.css_custom_properties.push(new Attribute(component, this, scope, node));
							break;
						}
					// fallthrough
					case 'Spread':
						this.attributes.push(new Attribute(component, this, scope, node));
						break;
					case 'Binding':
						this.bindings.push(new Binding(component, this, scope, node));
						break;
					case 'Class':
						return component.error(node, compiler_errors.invalid_class);
					case 'EventHandler':
						this.handlers.push(new EventHandler(component, this, scope, node));
						break;
					case 'Let':
						this.lets.push(new Let(component, this, scope, node));
						break;
					case 'Transition':
						return component.error(node, compiler_errors.invalid_transition);
					case 'StyleDirective':
						return component.error(node, compiler_errors.invalid_component_style_directive);
					default:
						throw new Error(`Not implemented: ${node.type}`);
				}
				/* eslint-enable no-fallthrough */
			}
		);
		if (this.lets.length > 0) {
			this.scope = scope.child();
			this.lets.forEach(
				/** @param {any} l */ (l) => {
					const dependencies = new Set([l.name.name]);
					l.names.forEach(
						/** @param {any} name */ (name) => {
							this.scope.add(name, dependencies, this);
						}
					);
				}
			);
		} else {
			this.scope = scope;
		}
		this.handlers.forEach(
			/** @param {any} handler */ (handler) => {
				handler.modifiers.forEach(
					/** @param {any} modifier */ (modifier) => {
						if (modifier !== 'once') {
							return component.error(handler, compiler_errors.invalid_event_modifier_component);
						}
					}
				);
			}
		);
		const children = [];
		for (let i = info.children.length - 1; i >= 0; i--) {
			const child = info.children[i];
			if (child.type === 'SlotTemplate') {
				children.push(child);
				info.children.splice(i, 1);
			} else if (
				(child.type === 'Element' || child.type === 'InlineComponent' || child.type === 'Slot') &&
				child.attributes.find(
					/** @param {any} attribute */ (attribute) => attribute.name === 'slot'
				)
			) {
				const slot_template = {
					start: child.start,
					end: child.end,
					type: 'SlotTemplate',
					name: 'svelte:fragment',
					attributes: [],
					children: [child]
				};
				// transfer attributes
				for (let i = child.attributes.length - 1; i >= 0; i--) {
					const attribute = child.attributes[i];
					if (attribute.type === 'Let') {
						slot_template.attributes.push(attribute);
						child.attributes.splice(i, 1);
					} else if (attribute.type === 'Attribute' && attribute.name === 'slot') {
						slot_template.attributes.push(attribute);
					}
				}
				// transfer const
				for (let i = child.children.length - 1; i >= 0; i--) {
					const child_child = child.children[i];
					if (child_child.type === 'ConstTag') {
						slot_template.children.push(child_child);
						child.children.splice(i, 1);
					}
				}
				children.push(slot_template);
				info.children.splice(i, 1);
			} else if (child.type === 'Comment' && children.length > 0) {
				children[children.length - 1].children.unshift(child);
			}
		}
		if (info.children.some(/** @param {any} node */ (node) => not_whitespace_text(node))) {
			children.push({
				start: info.start,
				end: info.end,
				type: 'SlotTemplate',
				name: 'svelte:fragment',
				attributes: [],
				children: info.children
			});
		}
		this.children = map_children(component, this, this.scope, children);
	}
	get slot_template_name() {
		return /** @type {string} */ (
			this.attributes
				.find(/** @param {any} attribute */ (attribute) => attribute.name === 'slot')
				.get_static_value()
		);
	}
}

/** @param {any} node */
function not_whitespace_text(node) {
	return !(node.type === 'Text' && regex_only_whitespaces.test(node.data));
}

/**
 * @param {import('./shared/Node.js').default} parent
 * @param {string} explicit_namespace
 */
function get_namespace(parent, explicit_namespace) {
	const parent_element = parent.find_nearest(/^Element/);
	if (!parent_element) {
		return explicit_namespace;
	}
	return parent_element.namespace;
}
