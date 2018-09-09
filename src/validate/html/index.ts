import a11y from './a11y';
import fuzzymatch from '../utils/fuzzymatch'
import flattenReference from '../../utils/flattenReference';
import { Validator } from '../index';
import { Node } from '../../interfaces';
import unpackDestructuring from '../../utils/unpackDestructuring';

function isEmptyBlock(node: Node) {
	if (!/Block$/.test(node.type) || !node.children) return false;
	if (node.children.length > 1) return false;
	const child = node.children[0];
	return !child || (child.type === 'Text' && !/[^ \r\n\f\v\t]/.test(child.data));
}

export default function validateHtml(validator: Validator, html: Node) {
	const refs = new Map();
	const refCallees: Node[] = [];
	const stack: Node[] = [];
	const elementStack: Node[] = [];

	function visit(node: Node) {
		if (node.type === 'Element') {
			a11y(validator, node, elementStack);
		}

		else if (node.type === 'EachBlock') {
			const contexts = [];
			unpackDestructuring(contexts, node.context, '');

			contexts.forEach(prop => {
				if (validator.helpers.has(prop.key.name)) {
					validator.warn(prop.key, {
						code: `each-context-clash`,
						message: `Context clashes with a helper. Rename one or the other to eliminate any ambiguity`
					});
				}
			});
		}

		if (validator.options.dev && isEmptyBlock(node)) {
			validator.warn(node, {
				code: `empty-block`,
				message: 'Empty block'
			});
		}

		if (node.children) {
			if (node.type === 'Element') elementStack.push(node);
			stack.push(node);
			node.children.forEach(visit);
			stack.pop();
			if (node.type === 'Element') elementStack.pop();
		}

		if (node.else) {
			visit(node.else);
		}

		if (node.type === 'AwaitBlock') {
			visit(node.pending);
			visit(node.then);
			visit(node.catch);
		}
	}

	html.children.forEach(visit);
}
