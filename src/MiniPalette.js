import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends PureComponent {
	constructor(props) {
		super(props);
		this.deletePalette = this.deletePalette.bind(this);
	}
	deletePalette(e) {
		e.stopPropagation();
		this.props.openDialog(this.props.id);
		//alert('hi');
	}
	render() {
		const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
		const miniBoxes = colors.map((colour) => (
			<div className={classes.miniColour} style={{ backgroundColor: colour.color }} key={colour.name} />
		));
		return (
			<div className={classes.root} onClick={() => handleClick(id)}>
				<DeleteIcon
					className={classes.deleteIcon}
					style={{ transition: 'all 0.3s ease-in-out' }}
					onClick={this.deletePalette}
				/>
				<div className={classes.colours}>{miniBoxes}</div>
				<div className={classes.title}>
					<h5>{paletteName}</h5>
					<span className={classes.emoji}>{emoji}</span>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
