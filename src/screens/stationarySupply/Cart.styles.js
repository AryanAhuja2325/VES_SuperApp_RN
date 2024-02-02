import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F9F9F9',
    },
    heading1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
        paddingHorizontal: 3
    },
    itemName: {
        fontSize: 15,
        color: 'black',
        flex: 2,
        marginRight: 20,
        marginTop: 10
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        flex: 1,
        textAlign: 'right',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    quantityButton: {
        backgroundColor: 'blue',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    itemTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        textAlign: 'right',
    },
    emptyText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: 'black',
        marginTop: 20,
        textAlign: 'center',
    },
    checkoutButton: {
        backgroundColor: 'blue',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        elevation: 2,
    },
    heading: {
        flex: 2,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    bottomText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'right',
    },
    removeButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginTop: 4,
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    removeButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    flatListContainer: {
        marginTop: 16,
        flex: 1,
    },
});

export default styles;
