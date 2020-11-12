import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ColourBox from './ColourBox';
import Footer from './Footer';
import Navbar from './Navbar.js';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyles';

class SingleColourPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colourId);
		this.state = { format: 'hex' };

		this.changeFormat = this.changeFormat.bind(this);
		//console.log(this._shades);
	}
	gatherShades(palette, colourToFilterBy) {
		let shades = [];
		let allColours = palette.colors;

		for (let key in allColours) {
			shades = shades.concat(allColours[key].filter((colour) => colour.id === colourToFilterBy));
		}
		// Removes shade 50 because this is white
		return shades.slice(1);
	}
	changeFormat(val) {
		this.setState({ format: val });
	}
	render() {
		const { format } = this.state;
		const { classes } = this.props;
		const { paletteName, emoji, id } = this.props.palette;
		const colourBoxes = this._shades.map((colour) => (
			<ColourBox key={colour.name} name={colour.name} background={colour[format]} showingFullPalette={false} />
		));
		return (
			<div className={classes.Palette}>
				<Navbar handleChange={this.changeFormat} />
				<div className={classes.PaletteColours}>
					{colourBoxes}
					<div className={classes.backBtn}>
						<Link to={`/palette/${id}`}>Go Back</Link>
					</div>
				</div>
				<Footer paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColourPalette);
