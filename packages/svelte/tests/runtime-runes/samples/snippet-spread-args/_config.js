import { test } from '../../test';

export default test({
	html: `
		<p>clicks: 0, doubled: 0, tripled: 0, quadrupled: 0, something else: 0</p>
		<button>click me</button>
	`,

	async test({ assert, target }) {
		const btn = target.querySelector('button');

		await btn?.click();
		assert.htmlEqual(
			target.innerHTML,
			`
				<p>clicks: 1, doubled: 2, tripled: 3, quadrupled: 4, something else: 5</p>
				<button>click me</button>
			`
		);
	}
});
