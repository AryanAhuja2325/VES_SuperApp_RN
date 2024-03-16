import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
        paddingVertical: 20
    },
    productList: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    productContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 5,
        borderRadius: 5,
        elevation: 15,
        shadowColor: 'rgb(145,41,40)',
        backgroundColor: 'white',
        width: (screenWidth / 2) - 30,
    },
    sectionHeader: {
        marginHorizontal: 10,
        flex: 1
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
});

export default styles;
