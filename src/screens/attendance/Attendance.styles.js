import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fef7d7',
        paddingTop: 20
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    main: {
        backgroundColor: '#a82c2c',
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
        color: '#fbe682',
        marginBottom: 16,
        marginLeft: 10,
        marginTop: 10
    },
    clickable: {
        width: 150,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#2a9d8f'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000000'
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
