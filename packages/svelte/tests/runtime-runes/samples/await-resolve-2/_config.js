import { test } from '../../test';

export default test({
	async test({ assert, target, logs }) {
		const [b1, b2] = target.querySelectorAll('button');
		b1.click();
		await Promise.resolve();
		b2.click();
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();
		assert.deepEqual(logs, ['pending', 'a', 'b']);
	}
});
