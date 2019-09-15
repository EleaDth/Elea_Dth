import Node from './shared/Node';
import Component from '../Component';
import { walk } from 'estree-walker';
import { Identifier } from 'estree';

const applicable = new Set(['Identifier', 'ObjectExpression', 'ArrayExpression', 'Property']);

export default class Let extends Node {
	type: 'Let';
	name: Identifier;
	value: Identifier;
	names: string[] = [];

	constructor(component: Component, parent, scope, info) {
		super(component, parent, scope, info);

		this.name = { type: 'Identifier', name: info.name };
		this.value = info.expression.node;

		if (info.expression) {
			walk(info.expression, {
				enter: node => {
					if (!applicable.has(node.type)) {
						component.error(node as any, {
							code: 'invalid-let',
							message: `let directive value must be an identifier or an object/array pattern`
						});
					}

					if (node.type === 'Identifier') {
						this.names.push(node.name);
					}
				}
			});
		} else {
			this.names.push(this.name.name);
		}
	}
}