import sizes from './sizes';

export default {
	Palette: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column'
	},
	PaletteColours: {
		height: '90%'
	},
	backBtn: {
		backgroundColor: 'black',
		width: '20%',
		height: '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-5px',
		opacity: '1',
		'& a': {
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
			backgroundColor: 'rgba(255, 255, 255, 0.3)',
			fontSize: '1rem',
			lineHeight: '30px',
			color: 'white',
			textTransform: 'uppercase',
			border: 'none',
			textDecoration: 'none'
		},
		[sizes.down('lg')]: {
			width: '75%',
			height: '33.333%'
		},
		[sizes.down('md')]: {
			width: '50%',
			height: '20%'
		},
		[sizes.down('sm')]: {
			width: '100%',
			height: '10%'
		}
	}
};
