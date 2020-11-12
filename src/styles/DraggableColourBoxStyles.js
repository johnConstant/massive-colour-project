import chroma from 'chroma-js';
import sizes from './sizes';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-5px',

		[sizes.down('lg')]: {
			width: '25%',
			height: '20%'
		},
		[sizes.down('md')]: {
			width: '50%',
			height: '10%'
		},
		[sizes.down('sm')]: {
			width: '100%',
			height: '5%'
		}
	},
	boxContent: {
		position: 'absolute',
		padding: '10px',
		width: '100%',
		left: '0px',
		bottom: '0px',
		letterSpacing: '1px',
		color: (props) => (chroma(props.color).luminance() <= 0.09 ? 'white' : 'black'),
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between'
	},
	deleteIcon: {
		color: (props) => (chroma(props.color).luminance() <= 0.09 ? 'white' : 'rgba(0,0,0,0.6)'),
		transition: 'all 0.3s ease-in-out',
		'& :hover': {
			color: (props) => (chroma(props.color).luminance() <= 0.09 ? 'white' : 'black'),
			transform: 'scale(1.1)'
		}
	}
};

export default styles;
