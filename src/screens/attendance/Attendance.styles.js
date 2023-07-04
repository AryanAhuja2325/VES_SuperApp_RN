import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 400,
        marginHorizontal: 130
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
        marginLeft: 10,
        marginTop: 10
    },
    clickable: {
        height: '20%',
        width: windowWidth / 2 - 20,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#rgb(145, 41, 40)',
        shadowRadius: 3.84,
        elevation: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'rgb(145, 41, 40)'
    },
    cardText: {
        fontSize: 16,
        color: '#495057',
    },

    body: {
        backgroundColor: 'black',
        flex: 1
    }
});

export default styles;
