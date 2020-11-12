import chroma from 'chroma-js';
import sizes from './sizes';

export default {
	colourBox: {
		width: '20%',
		height: (props) => (props.showingFullPalette ? '25%' : '50%'),
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-5px',
		'&:hover button': {
			opacity: '1',
			transition: '0.5s ease'
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: (props) => (props.showingFullPalette ? '20%' : '33.333%')
		},
		[sizes.down('md')]: {
			width: '50%',
			height: (props) => (props.showingFullPalette ? '10%' : '20%')
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: (props) => (props.showingFullPalette ? '5%' : '10%')
		}
	},
	copyText: {
		color: (props) => (chroma(props.background).luminance() >= 0.75 ? 'black' : 'white'),
		textShadow: (props) => (chroma(props.background).luminance() >= 0.8 ? '' : '1px 2px rgba(0, 0, 0, 0.2)')
	},
	colourName: {
		color: (props) => (chroma(props.background).luminance() <= 0.09 ? 'white' : 'black')
	},
	seeMore: {
		color: (props) => (chroma(props.background).luminance() >= 0.08 ? 'black' : 'white'),
		position: 'absolute',
		right: '0px',
		bottom: '0px',
		background: 'rgba(255, 255, 255, 0.3)',
		border: '0px',
		width: '60px',
		height: '30px',
		textAlign: 'center',
		lineHeight: '30px',
		textTransform: 'uppercase'
	},
	copyBtn: {
		width: '100px',
		height: '30px',
		display: 'inline-block',
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginLeft: '-50px',
		marginTop: '-15px',
		textAlign: 'center',
		outline: 'none',
		background: 'rgba(255, 255, 255, 0.3)',
		fontSize: '1rem',
		lineHeight: '30px',
		color: (props) => (chroma(props.background).luminance() >= 0.08 ? 'black' : 'white'),
		textTransform: 'uppercase',
		border: 'none',
		textDecoration: 'none',
		opacity: '0'
	},
	boxContent: {
		position: 'absolute',
		padding: '10px',
		width: '100%',
		left: '0px',
		bottom: '0px',
		letterSpacing: '1px',
		color: 'black',
		textTransform: 'uppercase',
		fontSize: '12px'
	},
	copyOverlay: {
		opacity: '0',
		zIndex: '0',
		width: '100%',
		height: '100%',
		transform: 'scale(0.1)',
		transition: 'transform 0.5s ease-in-out'
	},
	showOverlay: {
		opacity: '1',
		transform: 'scale(50)',
		zIndex: '10',
		position: 'absolute'
	},
	copyMsg: {
		position: 'fixed',
		right: '0',
		top: '0',
		bottom: '0',
		left: '0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '3rem',
		transform: 'scale(0.1)',
		opacity: '0',
		color: 'white',
		textAlign: 'center',
		'& h1': {
			fontWeight: '400',
			textShadow: '1px 2px black',
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
			width: '100%',
			marginBottom: '0',
			padding: '1rem',
			textTransform: 'uppercase',

			[sizes.down('sm')]: {
				fontSize: '6rem'
			}
		},
		'& p': {
			fontSize: '2rem',
			fontWeight: '200'
		}
	},
	showMsg: {
		opacity: '1',
		transform: 'scale(1)',
		transition: 'all 0.4s ease-in-out',
		transitionDelay: '0.3s',
		zIndex: '25'
	},
	backBtn: {
		backgroundColor: 'black'
	}
};
