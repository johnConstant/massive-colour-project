import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formShowing: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	showForm() {
		this.setState({ formShowing: true });
	}
	hideForm() {
		this.setState({ formShowing: false });
	}
	render() {
		const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
		const { formShowing } = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<ChevronRightIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Create a palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Button variant="contained" color="primary" className={classes.btn} onClick={this.showForm}>
							Save Palette
						</Button>
						<Link to="/">
							<Button variant="contained" color="secondary" className={classes.btn}>
								Go Back
							</Button>
						</Link>
					</div>
				</AppBar>
				{formShowing && (
					<PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
