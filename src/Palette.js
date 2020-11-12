import React, { Component } from 'react';

import ColourBox from './ColourBox';
import Footer from './Footer';
import Navbar from './Navbar';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyles';

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			level: 500,
			format: 'hex'
		};
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}
	changeLevel(level) {
		this.setState({ level: level });
	}
	changeFormat(val) {
		this.setState({ format: val });
	}
	render() {
		const { classes } = this.props;
		const { colors, paletteName, emoji, id } = this.props.palette;
		const { level, format } = this.state;

		const colourBoxes = colors[level].map((colour) => (
			<ColourBox
				background={colour[format]}
				name={colour.name}
				key={colour.id}
				id={colour.id}
				paletteId={id}
				showingFullPalette={true}
			/>
		));
		return (
			<div className={classes.Palette}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleChange={this.changeFormat}
					showingAllColours
				/>
				<div className={classes.PaletteColours}>{colourBoxes}</div>
				<Footer paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
