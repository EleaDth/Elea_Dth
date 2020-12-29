export default {
  html: `
		<input type="checkbox" value="a" data-index="x-1">
		<input type="checkbox" value="b" data-index="x-1">
		<input type="checkbox" value="c" data-index="x-1">
		<input type="checkbox" value="a" data-index="x-2">
		<input type="checkbox" value="b" data-index="x-2">
		<input type="checkbox" value="c" data-index="x-2">
		<input type="checkbox" value="a" data-index="y-1">
		<input type="checkbox" value="b" data-index="y-1">
		<input type="checkbox" value="c" data-index="y-1">
		<input type="checkbox" value="a" data-index="y-2">
		<input type="checkbox" value="b" data-index="y-2">
		<input type="checkbox" value="c" data-index="y-2">
		<input type="checkbox" value="a" data-index="z-1">
		<input type="checkbox" value="b" data-index="z-1">
		<input type="checkbox" value="c" data-index="z-1">
		<input type="checkbox" value="a" data-index="z-2">
		<input type="checkbox" value="b" data-index="z-2">
		<input type="checkbox" value="c" data-index="z-2">
	`,

  async test({ assert, component, target, window }) {
    const inputs = target.querySelectorAll('input');
		const checked = new Set();
		const checkInbox = async (i) => {
			checked.add(i);
			inputs[i].checked = true;
			await inputs[i].dispatchEvent(event);	
		};

    for (let i = 0; i < 18; i++) {
      assert.equal(inputs[i].checked, checked.has(i));
    }

    const event = new window.Event('change');

		await checkInbox(2);
		for (let i = 0; i < 18; i++) {
      assert.equal(inputs[i].checked, checked.has(i));
		}

		await checkInbox(12);
		for (let i = 0; i < 18; i++) {
      assert.equal(inputs[i].checked, checked.has(i));
		}

		await checkInbox(8);
		for (let i = 0; i < 18; i++) {
      assert.equal(inputs[i].checked, checked.has(i));
		}

    // inputs[4].checked = true;
    // await inputs[4].dispatchEvent(event);

    // assert.htmlEqual(target.innerHTML, `
    // 	<label><input type="checkbox" value="x"> x</label>
    // 	<label><input type="checkbox" value="y"> y</label>
    // 	<label><input type="checkbox" value="z"> z</label>
    // 	<p>z</p>
    // 	<label><input type="checkbox" value="x"> x</label>
    // 	<label><input type="checkbox" value="y"> y</label>
    // 	<label><input type="checkbox" value="z"> z</label>
    // 	<p>y</p>
    // 	<label><input type="checkbox" value="x"> x</label>
    // 	<label><input type="checkbox" value="y"> y</label>
    // 	<label><input type="checkbox" value="z"> z</label>
    // 	<p></p>
    // `);

    // inputs[5].checked = true;
    // await inputs[5].dispatchEvent(event);

    // assert.htmlEqual(target.innerHTML, `
    // 	<label><input type="checkbox" value="x"> x</label>
    // 	<label><input type="checkbox" value="y"> y</label>
    // 	<label><input type="checkbox" value="z"> z</label>
    // 	<p>z</p>
    // 	<label><input type="checkbox" value="x"> x</label>
    // 	<label><input type="checkbox" value="y"> y</label>
    // 	<label><input type="checkbox" value="z"> z</label>
    // 	<p>y, z</p>
    // 	<label><input type="checkbox" value="x"> x</label>
    // 	<label><input type="checkbox" value="y"> y</label>
    // 	<label><input type="checkbox" value="z"> z</label>
    // 	<p></p>
    // `);
  }
};
