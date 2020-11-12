import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'form',
			paletteName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	showEmojiPicker() {
		this.setState({
			stage: 'emoji'
		});
	}
	savePalette(emoji) {
		const newPalette = { paletteName: this.state.paletteName, emoji: emoji.native };
		this.props.handleSubmit(newPalette);
	}
	handleClose() {
		this.setState({ open: false });
	}

	render() {
		const { hideForm } = this.props;
		const { stage } = this.state;

		return (
			<div>
				<Dialog open={stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id="form-dialog-title">Choose an Emoji for your palette.</DialogTitle>
					<Picker onSelect={this.savePalette} title="Pick your emoji…" />
				</Dialog>
				<Dialog open={stage === 'form'} aria-labelledby="form-dialog-title" onClose={hideForm}>
					<DialogTitle id="form-dialog-title">
						Choose a palette name
						<span role="img" aria-label="Palette">
							🎨
						</span>
					</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your new palette. Names must be unique.
							</DialogContentText>
							<TextValidator
								name="paletteName"
								label="Palette Name"
								value={this.state.paletteName}
								fullWidth
								margin="normal"
								onChange={this.handleChange}
								validators={[ 'required', 'isPaletteNameUnique' ]}
								errorMessages={[ 'Enter Palette name', 'Palette Name already exists' ]}
							/>
						</DialogContent>
						<DialogActions>
							<Button color="primary" onClick={hideForm}>
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
