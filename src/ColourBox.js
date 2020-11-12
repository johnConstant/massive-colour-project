import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/ColourBoxStyles';

class ColourBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		};
		this.changeCopyState = this.changeCopyState.bind(this);
	}
	changeCopyState() {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 2000);
		});
	}
	render() {
		const { name, background, paletteId, id, showingFullPalette, classes } = this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div className={classes.colourBox} style={{ backgroundColor: background }}>
					<div
						className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
						style={{ backgroundColor: background }}
					/>
					<div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
						<p className={classes.copyText}>{name}</p>
						<h1>Copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
							<span className={classes.colourName}>{name}</span>
						</div>
						<button className={classes.copyBtn}>Copy</button>
					</div>
					{showingFullPalette && (
						<Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
							<span className={classes.seeMore}>More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColourBox);
