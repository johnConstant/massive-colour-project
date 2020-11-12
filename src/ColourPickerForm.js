import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';

import styles from './styles/ColourPickerFormStyles';

class ColourPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			background: '#fff',
			colorName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.background)
		);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleChangeComplete = (color) => {
		this.setState({ background: color.hex });
	};
	handleSubmit() {
		const newColour = {
			color: this.state.background,
			name: this.state.colorName
		};
		this.setState({ colorName: '' });
		this.props.addNewColor(newColour);
	}
	render() {
		const { paletteIsFull, classes } = this.props;
		const { colorName, background } = this.state;

		return (
			<div className={classes.container}>
				<ChromePicker
					width="100%"
					color={background}
					className={classes.picker}
					onChangeComplete={this.handleChangeComplete}
				/>
				<ValidatorForm
					// ref="form"
					instantValidate={false}
					onSubmit={this.handleSubmit}
					onError={(errors) => console.log(errors)}
				>
					<TextValidator
						label="Colour Name"
						onChange={this.handleChange}
						variant="filled"
						margin="normal"
						name="colorName"
						value={colorName}
						placeholder="Enter colour name"
						className={classes.textInput}
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[
							'this field is required',
							'Colour name must be unique',
							'This Colour is already in palette'
						]}
					/>
					<Button
						type="submit"
						variant="contained"
						size="large"
						style={{ backgroundColor: paletteIsFull ? 'lightgrey' : background }}
						className={classes.addColourBtn}
						disabled={paletteIsFull}
						//onClick={this.addNewColor}
					>
						{paletteIsFull ? 'Palette Full' : 'Save Colour'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColourPickerForm);
