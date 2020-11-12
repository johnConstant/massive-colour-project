import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, MenuItem, Select } from '@material-ui/core';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { format: 'hex', open: false, showingAllColours: false };
		this.handleFormatChange = this.handleFormatChange.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}
	handleFormatChange(e) {
		this.setState({ format: e.target.value, open: true });
		this.props.handleChange(e.target.value);
	}
	closeSnackbar(ev, reason) {
		if (reason === 'clickaway') {
			return;
		}
		this.setState({ open: false });
	}
	render() {
		const { level, changeLevel, showingAllColours, classes } = this.props;
		const { format, open } = this.state;
		return (
			<nav className={classes.Navbar}>
				<div className={classes.Logo}>
					<Link to="/">reactcolourpicker</Link>
				</div>
				{showingAllColours && (
					<div>
						<span>Level: {level}</span>
						<div className={classes.slider}>
							<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
						</div>
					</div>
				)}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleFormatChange}>
						<MenuItem value="hex">Hex - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBa - rgba(255,255,255,1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={open}
					autoHideDuration={3000}
					message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					onClickaway={this.closeSnackbar}
					action={[
						<IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
							<CloseIcon />
						</IconButton>
					]}
				/>
			</nav>
		);
	}
}

export default withStyles(styles)(Navbar);
