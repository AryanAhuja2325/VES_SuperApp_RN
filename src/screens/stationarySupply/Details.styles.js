import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    mainview: {
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },

    headingview: {
        flexDirection: 'row',
        borderBottomColor: 'rgb(145,40,41)',
        borderBottomWidth: 2,
        marginBottom: 20,
        margin: 4
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16
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
        backgroundColor: 'rgb(145,41,40)',
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
        borderWidth: 1,
        backgroundColor: '#D3D3D3',
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
    },
    qtyButtonDel: {
        borderWidth: 1,
        backgroundColor: '#D3D3D3',
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
    },
    quantityText: {
        fontSize: 20,
        color: 'black',
        borderWidth: 1,
        paddingHorizontal: 15
    },
    cart: {
        position: 'absolute',
        right: 1,
    },
    carticon: {
        zIndex: 1,
        margin: 4,
    },

    badge: {
        position: 'absolute',
        right: 1,
        top: 1,
        zIndex: 2,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 10,
        width: 16,
        height: 16,
        fontSize: 10,
        textAlign: 'center',
        overflow: 'hidden',
    },
});

export default styles;