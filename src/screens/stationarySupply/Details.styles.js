import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 25
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
    },
    productDetails: {
        marginTop: 16,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black'
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF5722',
    },
    box: {
        borderWidth: 1,
    },
    productDescription: {
        fontSize: 16,
        color: '#555555',
        fontStyle: 'italic',
        marginBottom: 10,
        marginTop: 10
    },
    buttonContainer: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 30
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButtonAdd: {
        backgroundColor: 'green',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 50
    },
    qtyButtonDel: {
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 50
    },
    qtyButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 20,
        color: 'black'
    },
    cart: {
        width: 28,
        height: 28,
        marginLeft: 10,
        marginTop: 10
    },

    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'red',
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        overflow: 'hidden',
        paddingHorizontal: 2,
    },
});

export default styles;