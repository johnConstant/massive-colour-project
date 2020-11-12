import chroma from 'chroma-js';

const levels = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 ];

function generatePalette(starterPalette) {
	let newPalette = {
		paletteName: starterPalette.paletteName,
		id: starterPalette.id,
		emoji: starterPalette.emoji,
		colors: {}
	};
	for (let level of levels) {
		newPalette.colors[level] = [];
	}
	for (let colour of starterPalette.colors) {
		let scale = generateScale(colour.color, 10).reverse();
		for (let i in scale) {
			newPalette.colors[levels[i]].push({
				name: `${colour.name} ${levels[i]}`,
				id: colour.name.toLowerCase().replace(/ /g, '-'),
				hex: scale[i],
				rgb: chroma(scale[i]).css(),
				rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')
			});
		}
	}
	return newPalette;
}

function getRange(hex) {
	const end = '#fff';
	return [ chroma(hex).darken(1.4).hex(), hex, end ];
}
function generateScale(hex, numOfColours) {
	return chroma.scale(getRange(hex)).mode('lab').colors(numOfColours);
}

export { generatePalette };
