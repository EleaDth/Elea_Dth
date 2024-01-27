import read_context from '../read/context.js';
import read_expression from '../read/expression.js';
import { error } from '../../../errors.js';
import { create_fragment } from '../utils/create.js';
import { walk } from 'zimmerframe';
import { parse, parse_expression_at } from '../acorn.js';
import { find_matching_bracket } from '../utils/bracket.js';
import full_char_code_at from '../utils/full_char_code_at.js';
import { isChainCallExpression } from '../utils/is-chain-call-expression.js';

const regex_whitespace_with_closing_curly_brace = /^\s*}/;

/** @param {import('../index.js').Parser} parser */
export default function mustache(parser) {
	const start = parser.index;
	parser.index += 1;

	parser.allow_whitespace();

	if (parser.eat('#')) return open(parser);
	if (parser.eat('/')) return close(parser);
	if (parser.eat(':')) return next(parser);
	if (parser.eat('@')) return special(parser);

	const expression = read_expression(parser);

	parser.allow_whitespace();
	parser.eat('}', true);

	parser.append(
		/** @type {import('#compiler').ExpressionTag} */ ({
			type: 'ExpressionTag',
			start,
			end: parser.index,
			expression,
			metadata: {
				contains_call_expression: false,
				dynamic: false
			}
		})
	);
}

/** @param {import('../index.js').Parser} parser */
function open(parser) {
	const start = parser.index - 2;

	if (parser.eat('if')) {
		parser.require_whitespace();

		const block = parser.append(
			/** @type {import('#compiler').IfBlock} */ ({
				type: 'IfBlock',
				elseif: false,
				start,
				end: -1,
				test: read_expression(parser),
				consequent: create_fragment(),
				alternate: null
			})
		);

		parser.allow_whitespace();
		parser.eat('}', true);

		parser.stack.push(block);
		parser.fragments.push(block.consequent);

		return;
	}

	if (parser.eat('each')) {
		parser.require_whitespace();

		const template = parser.template;
		let end = parser.template.length;

		/** @type {import('estree').Expression | undefined} */
		let expression;

		// we have to do this loop because `{#each x as { y = z }}` fails to parse —
		// the `as { y = z }` is treated as an Expression but it's actually a Pattern.
		// the 'fix' is to backtrack and hide everything from the `as` onwards, until
		// we get a valid expression
		while (!expression) {
			try {
				expression = read_expression(parser);
			} catch (err) {
				end = /** @type {any} */ (err).position[0] - 2;

				while (end > start && parser.template.slice(end, end + 2) !== 'as') {
					end -= 1;
				}

				if (end <= start) throw err;

				// @ts-expect-error parser.template is meant to be readonly, this is a special case
				parser.template = template.slice(0, end);
			}
		}

		// @ts-expect-error
		parser.template = template;

		parser.allow_whitespace();

		// {#each} blocks must declare a context – {#each list as item}
		if (!parser.match('as')) {
			// this could be a TypeScript assertion that was erroneously eaten.

			if (expression.type === 'SequenceExpression') {
				expression = expression.expressions[0];
			}

			let assertion = null;
			let end = expression.end;

			expression = walk(expression, null, {
				// @ts-expect-error
				TSAsExpression(node, context) {
					if (node.end === /** @type {import('estree').Expression} */ (expression).end) {
						assertion = node;
						end = node.expression.end;
						return node.expression;
					}

					context.next();
				}
			});

			expression.end = end;

			if (assertion) {
				// we can't reset `parser.index` to `expression.expression.end` because
				// it will ignore any parentheses — we need to jump through this hoop
				let end = /** @type {any} */ (/** @type {any} */ (assertion).typeAnnotation).start - 2;
				while (parser.template.slice(end, end + 2) !== 'as') end -= 1;

				parser.index = end;
			}
		}
		parser.eat('as', true);
		parser.require_whitespace();

		const context = read_context(parser);

		parser.allow_whitespace();

		let index;
		let key;

		if (parser.eat(',')) {
			parser.allow_whitespace();
			index = parser.read_identifier();
			if (!index) {
				error(parser.index, 'expected-identifier');
			}

			parser.allow_whitespace();
		}

		if (parser.eat('(')) {
			parser.allow_whitespace();

			key = read_expression(parser);
			parser.allow_whitespace();
			parser.eat(')', true);
			parser.allow_whitespace();
		}

		parser.eat('}', true);

		const block = parser.append(
			/** @type {Omit<import('#compiler').EachBlock, 'parent'>} */ ({
				type: 'EachBlock',
				start,
				end: -1,
				expression,
				body: create_fragment(),
				context,
				index,
				key,
				metadata: /** @type {any} */ (null) // filled in later
			})
		);

		parser.stack.push(block);
		parser.fragments.push(block.body);

		return;
	}

	if (parser.eat('await')) {
		parser.require_whitespace();
		const expression = read_expression(parser);
		parser.allow_whitespace();

		const block = parser.append(
			/** @type {import('#compiler').AwaitBlock} */ ({
				type: 'AwaitBlock',
				start,
				end: -1,
				expression,
				value: null,
				error: null,
				pending: null,
				then: null,
				catch: null
			})
		);

		if (parser.eat('then')) {
			if (parser.match_regex(regex_whitespace_with_closing_curly_brace)) {
				parser.allow_whitespace();
			} else {
				parser.require_whitespace();
				block.value = read_context(parser);
				parser.allow_whitespace();
			}

			block.then = create_fragment();
			parser.fragments.push(block.then);
		} else if (parser.eat('catch')) {
			if (parser.match_regex(regex_whitespace_with_closing_curly_brace)) {
				parser.allow_whitespace();
			} else {
				parser.require_whitespace();
				block.error = read_context(parser);
				parser.allow_whitespace();
			}

			block.catch = create_fragment();
			parser.fragments.push(block.catch);
		} else {
			block.pending = create_fragment();
			parser.fragments.push(block.pending);
		}

		parser.eat('}', true);
		parser.stack.push(block);

		return;
	}

	if (parser.eat('key')) {
		parser.require_whitespace();

		const expression = read_expression(parser);
		parser.allow_whitespace();

		parser.eat('}', true);

		const block = parser.append(
			/** @type {import('#compiler').KeyBlock} */ ({
				type: 'KeyBlock',
				start,
				end: -1,
				expression,
				fragment: create_fragment()
			})
		);

		parser.stack.push(block);
		parser.fragments.push(block.fragment);

		return;
	}

	if (parser.match('snippet')) {
		const snippet_declaration_end = find_matching_bracket(parser.template, parser.index, '{');

		if (!snippet_declaration_end) {
			error(start, 'TODO', 'Expected a closing curly bracket');
		}

		// we'll eat this later, so save it
		const raw_snippet_declaration = parser.template.slice(start, snippet_declaration_end + 1);
		const start_subtractions = '{#snippet ';
		const end_subtractions = '}';

		// now the snippet declaration is just a function declaration (`function snipName() {}`)
		const snippet_declaration = `function ${raw_snippet_declaration.slice(
			start_subtractions.length,
			raw_snippet_declaration.length - end_subtractions.length
		)} {}`;

		// we offset the index by one because `function` takes the same space as `#snippet`
		const snippet_expression = parse_expression_at(
			`${parser.template.slice(0, parser.index - 1)}${snippet_declaration}`,
			parser.ts,
			parser.index - 1
		);

		if (snippet_expression.type !== 'FunctionExpression') {
			error(snippet_expression, 'TODO', 'expected a function expression');
		}

		if (!snippet_expression.id) {
			error(snippet_expression, 'TODO', 'expected a snippet name');
		}

		if (snippet_expression.params.at(-1)?.type === 'RestElement') {
			error(
				snippet_expression,
				'TODO',
				'snippets do not support rest parameters; use an array instead'
			);
		}

		// slice the `{#` off the beginning since it's already been eaten
		parser.eat(raw_snippet_declaration.slice(2), true);

		const block = parser.append(
			/** @type {Omit<import('#compiler').SnippetBlock, 'parent'>} */
			({
				type: 'SnippetBlock',
				start,
				end: -1,
				expression: snippet_expression.id,
				context: {
					type: 'ArrayPattern',
					elements: snippet_expression.params
				},
				body: create_fragment()
			})
		);

		parser.stack.push(block);
		parser.fragments.push(block.body);

		return;
	}

	error(parser.index, 'expected-block-type');
}

/** @param {import('../index.js').Parser} parser */
function next(parser) {
	const start = parser.index - 1;

	const block = parser.current(); // TODO type should not be TemplateNode, that's much too broad

	if (block.type === 'IfBlock') {
		if (!parser.eat('else')) error(start, 'expected-token', '{:else} or {:else if}');
		if (parser.eat('if')) error(start, 'invalid-elseif');

		parser.allow_whitespace();

		parser.fragments.pop();

		block.alternate = create_fragment();
		parser.fragments.push(block.alternate);

		// :else if
		if (parser.eat('if')) {
			parser.require_whitespace();

			const expression = read_expression(parser);

			parser.allow_whitespace();
			parser.eat('}', true);

			const child = parser.append(
				/** @type {import('#compiler').IfBlock} */ ({
					start: parser.index,
					end: -1,
					type: 'IfBlock',
					elseif: true,
					test: expression,
					consequent: create_fragment(),
					alternate: null
				})
			);

			parser.stack.push(child);
			parser.fragments.pop();
			parser.fragments.push(child.consequent);
		} else {
			// :else
			parser.allow_whitespace();
			parser.eat('}', true);
		}

		return;
	}

	if (block.type === 'EachBlock') {
		if (!parser.eat('else')) error(start, 'expected-token', '{:else}');

		parser.allow_whitespace();
		parser.eat('}', true);

		block.fallback = create_fragment();

		parser.fragments.pop();
		parser.fragments.push(block.fallback);

		return;
	}

	if (block.type === 'AwaitBlock') {
		if (parser.eat('then')) {
			if (block.then) {
				error(start, 'duplicate-block-part', '{:then}');
			}

			if (!parser.eat('}')) {
				parser.require_whitespace();
				block.value = read_context(parser);
				parser.allow_whitespace();
				parser.eat('}', true);
			}

			block.then = create_fragment();
			parser.fragments.pop();
			parser.fragments.push(block.then);

			return;
		}

		if (parser.eat('catch')) {
			if (block.catch) {
				error(start, 'duplicate-block-part', '{:catch}');
			}

			if (!parser.eat('}')) {
				parser.require_whitespace();
				block.error = read_context(parser);
				parser.allow_whitespace();
				parser.eat('}', true);
			}

			block.catch = create_fragment();
			parser.fragments.pop();
			parser.fragments.push(block.catch);

			return;
		}

		error(start, 'expected-token', '{:then ...} or {:catch ...}');
	}

	error(start, 'invalid-continuing-block-placement');
}

/** @param {import('../index.js').Parser} parser */
function close(parser) {
	const start = parser.index - 1;

	let block = parser.current();

	switch (block.type) {
		case 'IfBlock':
			parser.eat('if', true);
			parser.allow_whitespace();
			parser.eat('}', true);
			while (block.elseif) {
				block.end = parser.index;
				parser.stack.pop();
				block = /** @type {import('#compiler').IfBlock} */ (parser.current());
			}
			block.end = parser.index;
			parser.pop();
			return;

		case 'EachBlock':
			parser.eat('each', true);
			break;
		case 'KeyBlock':
			parser.eat('key', true);
			break;
		case 'AwaitBlock':
			parser.eat('await', true);
			break;
		case 'SnippetBlock':
			parser.eat('snippet', true);
			break;

		case 'RegularElement':
			// TODO handle implicitly closed elements
			error(start, 'unexpected-block-close');
			break;

		default:
			error(start, 'unexpected-block-close');
	}

	parser.allow_whitespace();
	parser.eat('}', true);
	block.end = parser.index;
	parser.pop();
}

/** @param {import('../index.js').Parser} parser */
function special(parser) {
	let start = parser.index;
	while (parser.template[start] !== '{') start -= 1;

	if (parser.eat('html')) {
		// {@html content} tag
		parser.require_whitespace();

		const expression = read_expression(parser);

		parser.allow_whitespace();
		parser.eat('}', true);

		parser.append(
			/** @type {import('#compiler').HtmlTag} */ ({
				type: 'HtmlTag',
				start,
				end: parser.index,
				expression
			})
		);

		return;
	}

	if (parser.eat('debug')) {
		/** @type {import('estree').Identifier[]} */
		let identifiers;

		// Implies {@debug} which indicates "debug all"
		if (parser.read(regex_whitespace_with_closing_curly_brace)) {
			identifiers = [];
		} else {
			const expression = read_expression(parser);

			identifiers =
				expression.type === 'SequenceExpression'
					? /** @type {import('estree').Identifier[]} */ (expression.expressions)
					: [/** @type {import('estree').Identifier} */ (expression)];

			identifiers.forEach(
				/** @param {any} node */ (node) => {
					if (node.type !== 'Identifier') {
						error(/** @type {number} */ (node.start), 'invalid-debug');
					}
				}
			);

			parser.allow_whitespace();
			parser.eat('}', true);
		}

		parser.append(
			/** @type {import('#compiler').DebugTag} */ ({
				type: 'DebugTag',
				start,
				end: parser.index,
				identifiers
			})
		);

		return;
	}

	if (parser.match('const')) {
		// {@const a = b}
		const start_index = parser.index;

		let end_index = find_matching_bracket(parser.template, start_index, '{');
		if (!end_index) {
			error(start, 'invalid-const');
		}

		const dummy_spaces = parser.template.substring(0, start_index).replace(/[^\n]/g, ' ');
		let declaration = parse(
			dummy_spaces + parser.template.substring(start_index, end_index),
			parser.ts
		).body[0];

		if (
			declaration === undefined ||
			declaration.type !== 'VariableDeclaration' ||
			declaration.declarations.length !== 1 ||
			declaration.declarations[0].init === undefined
		) {
			error(start, 'invalid-const');
		}

		parser.index = end_index;
		parser.eat('}', true);

		parser.append(
			/** @type {import('#compiler').ConstTag} */ ({
				type: 'ConstTag',
				start,
				end: parser.index,
				declaration
			})
		);
	}

	if (parser.eat('render')) {
		// {@render foo(...)}
		parser.require_whitespace();

		const expression = read_expression(parser);

		const is_chained_call_expression = isChainCallExpression(expression);
		const is_regular_call_expression = expression.type === 'CallExpression';

		// The expression needs to, at some point, be a call expression.
		// - snippet()
		// - snippet?.()
		// - (snippet ?? fallback)()
		// - (snippet ?? fallback)?.()
		if (!(is_chained_call_expression || is_regular_call_expression)) {
			error(expression, 'TODO', `Expected a call expression.`);
		}

		parser.allow_whitespace();
		parser.eat('}', true);

		parser.append(
			/** @type {import('#compiler').RenderTag} */ ({
				type: 'RenderTag',
				start,
				end: parser.index,
				expression: expression
			})
		);
	}
}
