export default {
	html: `
		<div>Hello World</div>
		<div>Hello World</div>
	`,

	async test({ assert, component, target, window }) {
		await component.updateValue('Hi Svelte');

		assert.htmlEqual(target.innerHTML, `
			<div>Hi Svelte</div>
			<div>Hi Svelte</div>
		`);
	}
};
