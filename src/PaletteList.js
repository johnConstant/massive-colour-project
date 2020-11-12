import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';

import MiniPalette from './MiniPalette';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false,
			deletingId: ''
		};
		this.openDialog = this.openDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.goToPalette = this.goToPalette.bind(this);
	}
	openDialog(id) {
		this.setState({
			dialogOpen: true,
			deletingId: id
		});
	}
	handleDelete() {
		this.props.deletePalette(this.state.deletingId);
		this.setState({
			dialogOpen: false,
			deletingId: ''
		});
	}
	closeDialog() {
		this.setState({
			dialogOpen: false,
			deletingId: ''
		});
	}
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}
	render() {
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.title}>Colour Palettes</h1>
						<Link to="/palette/new">Create new palette</Link>
					</nav>

					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames="item" timeout={500}>
								<MiniPalette
									{...palette}
									handleClick={this.goToPalette}
									//handleDelete={deletePalette}
									openDialog={this.openDialog}
									key={palette.id}
									id={palette.id}
								/>
							</CSSTransition>
							// <Link exact to={`/palette/${palette.id}`}>
							// 	{palette.paletteName}
							// </Link>
						))}
					</TransitionGroup>
				</div>
				<Dialog open={this.state.dialogOpen} onClose={this.closeDialog} aria-labelledby="delete-palette-title">
					<DialogTitle id="delete-palette-title">Delete this palette</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: green[100], color: green[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Are you sure?</ListItemText>
						</ListItem>

						<ListItem button onClick={this.closeDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red['A700'] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
