import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#912929',
		borderRadius: 8,
		padding: 16,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 2,
		height: 180,
		width: 180,
		marginHorizontal: 8,
		margin: 10
	},
	main: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fef7d7'
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 8,
		color: 'white',
		fontFamily: 'arial'
	},
	description: {
		fontSize: 20,
		color: '#c1ccde',
		fontFamily: 'Poppins'
	},
	body: {
		backgroundColor: '#fef7d7',
		flex: 1
	},
	photoItem: {
		width: 20,
		height: 100,
		margin: 5
	},
	text: {
		backgroundColor: '#912929',
		padding: 10,
		borderRadius: 5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'arial',
		fontWeight: 'bold',
		marginLeft: 15,
		marginRight: 67
	},

	image: {
		width: 300,
		height: 250,
		resizeMode: 'cover',
		margin: 20
	}
});

export default styles;
