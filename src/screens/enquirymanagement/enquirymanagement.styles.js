import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B02A30'
    },
    input: {
        width: '80%',
        height: 300,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        padding: 16,
        borderRadius: 10,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 50,
        textAlign: 'left',
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#E7B909',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        marginHorizontal: 40,
        marginVertical: 50,
        width: '80%',
    },
    buttonText: {
        color: '#B02A30',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        borderColor: 'black'
    },
    title: {
        width: '80%',
        borderRadius: 10,
        height: 50,
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        marginHorizontal: 40,
        marginVertical: 90,
        color: 'white',
        fontWeight: 'bold',
    }
});

export  default styles;