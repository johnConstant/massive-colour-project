import drawerWidth from '../constants';

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		display: 'flex',
		alignItems: 'center'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		// padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	button: {
		width: '50%'
	},
	leftIcon: {
		marginRight: theme.spacing(1)
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	iconSmall: {
		fontSize: 20
	},
	icon: {
		margin: theme.spacing(2)
	},
	iconHover: {
		margin: theme.spacing(2),
		'&:hover': {
			opacity: '0.8'
		}
	},
	container: {
		width: '90%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	btns: {
		width: '100%'
	}
});

export default styles;
