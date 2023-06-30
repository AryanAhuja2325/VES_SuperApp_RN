import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 8,
        marginTop: 15,
        paddingTop: 15,
        borderColor: '#800000',
        borderWidth: 2,
        borderRadius: 20,

    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        paddingTop: 3,
        flex: 1,
        marginBottom: 10,
        shadowColor: '#800000',
        marginRight: 5,
        elevation: 8,
        width: '100%',
        borderTopColor: '#800000',
        borderTopWidth: 8,
    },
    image: {
        width: "100%",
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: '#fff',

    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',

    },

    description: {
        marginTop: 5,
        textAlign: 'left',
        fontStyle: 'italic',
        marginLeft: 1,
        fontSize: 12
    },
    Text: {
        borderTopWidth: 2,
        fontWeight: 'bold',
        color: 'black',
    },
    roletext: {
        fontSize: 10,
        color: 'blue'
    },
});

export default styles;