import sizes from './sizes';
import bg from './bg.svg';

export default {
	'@global': {
		'.item-enter': {
			opacity: 0
		},
		'.item-enter-active': {
			opacity: 1,
			transition: 'opacity 500ms ease-in'
		},
		'.item-exit': {
			opacity: 1
		},
		'.item-exit-active': {
			opacity: 0,
			transition: 'opacity 500ms ease-in'
		}
	},
	root: {
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		/* background by SVGBackgrounds.com */
		backgroundColor: '#fff',
		backgroundImage: `url(${bg})`,
		overflow: 'scroll'
	},
	container: {
		width: '70%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flewWrap: 'wrap',
		[sizes.down('md')]: {
			width: '80%'
		}
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: 'white',
		'& a': {
			color: 'white'
		}
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '2rem',
		[sizes.down('md')]: {
			gridTemplateColumns: 'repeat(2, 50%)'
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 80%)',
			justifyContent: 'center'
		}
	},
	title: {
		fontSize: '2rem',
		textShadow: '1px 1px 3px rgba(0, 0, 0, 1);'
	}
};
