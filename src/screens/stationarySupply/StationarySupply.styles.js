import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 18,
        marginLeft: 22,
    },
    container: {
        flex: 1,
        backgroundColor: '#ceddf4'
    },
    productList: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    productContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#912929',
        backgroundColor: '#fef7d7'
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black'
    },
    productPrice: {
        fontSize: 14,
        color: 'black',
    },
    discount: {
        fontSize: 12,
        color: 'red',
        marginRight: 5,
    },
    mrp: {
        fontSize: 10,
        color: '#888',
        textDecorationLine: 'line-through',
        marginLeft: 10
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        justifyContent: 'flex-end'
    },
    icon: {
        width: 20,
        height: 20
    },
    cart: {
        width: 28,
        height: 28,
        marginLeft: 10,
        marginTop: 20
    },

    badge: {
        position: 'absolute',
        top: 5,
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
})

export default styles;