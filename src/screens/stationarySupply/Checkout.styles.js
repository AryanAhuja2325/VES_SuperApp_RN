import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    text: {
        color: 'black',
        fontSize: 15
    },
    textMain: {
        color: 'black',
        fontWeight: '600',
        fontSize: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: 'black'
    },
    cartContainer: {
        marginBottom: 24,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    formContainer: {
        marginBottom: 24,
    },
    input: {
        height: 48,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        color: 'black',
    },
    inputAddress: {
        height: 130,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        color: 'black',
        textAlignVertical: 'top'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallInput: {
        flex: 1,
        marginRight: 8,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
})

export default styles;