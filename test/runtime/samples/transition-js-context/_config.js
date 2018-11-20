export default {
	intro: true,

	test(assert, component, target, window, raf) {
		const div = target.querySelector('div');
		assert.equal(div.foo, 42);

		raf.tick(50);
		assert.equal(div.foo, 42);
	}
};
