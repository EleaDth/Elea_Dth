import deindent from '../../../utils/deindent.js';

export default function visitRawMustacheTag ( generator, block, state, node ) {
	const name = block.getUniqueName( 'raw' );
	const value = block.getUniqueName( `${name}_value` );
	const before = block.getUniqueName( `${name}_before` );
	const after = block.getUniqueName( `${name}_after` );

	const { snippet } = block.contextualise( node.expression );

	// we would have used comments here, but the `insertAdjacentHTML` api only
	// exists for `Element`s.
	block.addElement( before, `${generator.helper( 'createElement' )}( 'noscript' )`, state.parentNode, true );
	block.addElement( after, `${generator.helper( 'createElement' )}( 'noscript' )`, state.parentNode, true );

	const isToplevel = !state.parentNode;

	block.builders.create.addLine( `var ${value} = ${snippet};` );
	const mountStatement = `${before}.insertAdjacentHTML( 'afterend', ${value} );`;
	const detachStatement = `${generator.helper( 'detachBetween' )}( ${before}, ${after} );`;

	if ( isToplevel ) {
		block.builders.mount.addLine( mountStatement );
	} else {
		block.builders.create.addLine( mountStatement );
	}

	block.builders.update.addBlock( deindent`
		if ( ${value} !== ( ${value} = ${snippet} ) ) {
			${detachStatement}
			${mountStatement}
		}
	` );

	block.builders.detachRaw.addBlock( detachStatement );
}