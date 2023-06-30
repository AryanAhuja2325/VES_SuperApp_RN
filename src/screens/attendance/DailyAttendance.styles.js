import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#912929'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fbe98d'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        marginTop: 10,
        color: 'white'
    },
    card: {
        width: 300,
        height: 300,
        marginTop: 100,
        alignItems: 'center',
        padding: 20
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    heading1: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fdf1b7'
    },
    buttonP: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    buttonA: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    buttonG: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        height: 40,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 20,
    },
});

export default styles;