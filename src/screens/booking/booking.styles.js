import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    fullWidthItem: {
        width: screenWidth,
    },

    halfWidthItem: {
        maxWidth: (screenWidth / 2) - 30,
    },

    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        padding: 5,
        borderRadius: 5,
        elevation: 15,
        shadowColor: 'rgb(145,41,40)',
        backgroundColor: 'white',
    },
    sectionHeader: {
        marginHorizontal: 10,
        felx: 1
    },
    sectionHeaderText: {
        color: 'black',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    productImage: {
        width: '100%',
        height: 100,
        marginBottom: 10,
        resizeMode: 'stretch',
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
    headingview: {
        margin: 2,
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(145,41,40)',
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

})

export default styles;