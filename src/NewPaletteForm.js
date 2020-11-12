import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { arrayMove } from 'react-sortable-hoc';

import DraggableColourList from './DraggableColourList';
import PaletteFormNav from './PaletteFormNav';
import ColourPickerForm from './ColourPickerForm';

import styles from './styles/NewPaletteFormStyles';
import seedColours from './SeedColours';

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColours: 20
	};
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			colors: seedColours[0].colors
		};
		this.addNewColor = this.addNewColor.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deleteColour = this.deleteColour.bind(this);
		this.clearColours = this.clearColours.bind(this);
		this.randomColour = this.randomColour.bind(this);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};
	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	addNewColor(newColour) {
		this.setState({ colors: [ ...this.state.colors, newColour ] });
	}
	deleteColour(name) {
		this.setState({
			colors: this.state.colors.filter((colour) => colour.name !== name)
		});
	}
	clearColours() {
		this.setState({ colors: [] });
	}
	randomColour() {
		// pick random colour from exisiting palettes
		const allColours = this.props.palettes.map((palette) => palette.colors).flat();
		let index;
		let randomColour;
		let isDuplicateColour = true;
		while (isDuplicateColour) {
			index = Math.floor(Math.random() * allColours.length);
			randomColour = allColours[index];
			console.log(randomColour);
			isDuplicateColour = this.state.colors.some((colour) => colour.name === randomColour.name);
		}
		this.setState({ colors: [ ...this.state.colors, randomColour ] });
	}
	handleSubmit(newPalette) {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = this.state.colors;
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};

	render() {
		const { classes, maxColours, palettes } = this.props;
		const { open, colors } = this.state;
		const paletteIsFull = colors.length >= maxColours;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant="h4" gutterBottom>
							Design your Palette
						</Typography>
						<div className={classes.btns}>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								onClick={this.clearColours}
							>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}
								onClick={this.randomColour}
								disabled={paletteIsFull}
							>
								{paletteIsFull ? 'Palette Full' : 'Random Colour'}
							</Button>
						</div>
						<ColourPickerForm
							paletteIsFull={paletteIsFull}
							addNewColor={this.addNewColor}
							colors={colors}
						/>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColourList
						axis="xy"
						onSortEnd={this.onSortEnd}
						colors={colors}
						deleteColour={this.deleteColour}
						distance={20}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
