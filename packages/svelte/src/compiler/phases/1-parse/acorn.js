import * as acorn from 'acorn';
import { walk } from 'zimmerframe';
import { tsPlugin } from 'acorn-typescript';

const ParserWithTS = acorn.Parser.extend(tsPlugin({ allowSatisfies: true }));

/**
 * @param {string} source
 * @param {boolean} typescript
 */
export function parse(source, typescript) {
	const parser = typescript ? ParserWithTS : acorn.Parser;
	const { onComment, add_comments } = get_comment_handlers(source);

	const ast = parser.parse(source, {
		onComment,
		sourceType: 'module',
		ecmaVersion: 13,
		locations: true
	});

	if (typescript) amend(source, ast);
	add_comments(ast);

	return /** @type {import('estree').Program} */ (ast);
}

/**
 * @param {string} source
 * @param {boolean} typescript
 * @param {number} index
 * @returns {acorn.Expression & { leadingComments?: CommentWithLocation[]; trailingComments?: CommentWithLocation[]; }}
 */
export function parse_expression_at(source, typescript, index) {
	const parser = typescript ? ParserWithTS : acorn.Parser;
	const { onComment, add_comments } = get_comment_handlers(source);

	const ast = parser.parseExpressionAt(source, index, {
		onComment,
		sourceType: 'module',
		ecmaVersion: 13,
		locations: true
	});

	if (typescript) amend(source, ast);
	add_comments(ast);

	return ast;
}

/**
 * Acorn doesn't add comments to the AST by itself. This factory returns the capabilities
 * to add them after the fact. They are needed in order to support `svelte-ignore` comments
 * in JS code and so that `prettier-plugin-svelte` doesn't remove all comments when formatting.
 * @param {string} source
 */
function get_comment_handlers(source) {
	/**
	 * @typedef {import('estree').Comment & {
	 *   start: number;
	 *   end: number;
	 * }} CommentWithLocation
	 */

	/** @type {CommentWithLocation[]} */
	const comments = [];

	return {
		/**
		 * @param {boolean} block
		 * @param {string} value
		 * @param {number} start
		 * @param {number} end
		 */
		onComment: (block, value, start, end) => {
			if (block && /\n/.test(value)) {
				let a = start;
				while (a > 0 && source[a - 1] !== '\n') a -= 1;

				let b = a;
				while (/[ \t]/.test(source[b])) b += 1;

				const indentation = source.slice(a, b);
				value = value.replace(new RegExp(`^${indentation}`, 'gm'), '');
			}

			comments.push({ type: block ? 'Block' : 'Line', value, start, end });
		},

		/** @param {acorn.Node & { leadingComments?: CommentWithLocation[]; trailingComments?: CommentWithLocation[]; }} ast */
		add_comments(ast) {
			if (comments.length === 0) return;

			walk(ast, null, {
				_(node, { next, path }) {
					let comment;

					while (comments[0] && comments[0].start < node.start) {
						comment = /** @type {CommentWithLocation} */ (comments.shift());
						(node.leadingComments ||= []).push(comment);
					}

					next();

					if (comments[0]) {
						const parent = path.at(-1);
						if (parent === undefined || node.end !== parent.end) {
							const slice = source.slice(node.end, comments[0].start);

							if (/^[,) \t]*$/.test(slice)) {
								node.trailingComments = [/** @type {CommentWithLocation} */ (comments.shift())];
							}
						}
					}
				}
			});
			if (comments.length > 0) {
				(ast.trailingComments ||= []).push(...comments.splice(0));
			}
		}
	};
}

/**
 * Tidy up some stuff left behind by acorn-typescript
 * @param {string} source
 * @param {import('acorn').Node} node
 */
function amend(source, node) {
	return walk(node, null, {
		_(node, context) {
			// @ts-expect-error
			delete node.loc.start.index;
			// @ts-expect-error
			delete node.loc.end.index;

			if (/** @type {any} */ (node).typeAnnotation && node.end === undefined) {
				// i think there might be a bug in acorn-typescript that prevents
				// `end` from being assigned when there's a type annotation
				let end = /** @type {any} */ (node).typeAnnotation.start;
				while (/\s/.test(source[end - 1])) end -= 1;
				node.end = end;
			}

			context.next();
		}
	});
}
