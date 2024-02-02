import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'black'
    },
    orderItem: {
        backgroundColor: '#e0e0e0',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    orderDate: {
        fontSize: 14,
        color: 'gray',
    },
})

export default styles;