import { Dimensions, StyleSheet } from "react-native";
import { maroon, white } from "../../utils/color";

const windowheight = Dimensions.get('window').height

const Style = StyleSheet.create({
    text1: {
        color: maroon,
        marginTop:35,
        fontSize: 35,
        alignSelf:'center',
        marginBottom:35
    },
    button: {
        backgroundColor: maroon,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 10,
        width: "50%"
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: white,
        padding: 5,
    },
    inputtxt: {
        borderWidth: 2,
        borderColor: 'maroon',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 15
    },
    view: {
        height: windowheight / 2,
    },
    cart: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        shadowColor: '#800000',
        elevation: 8,
    },
    selectionCart: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        height:windowheight-150,
        margin:20,
        // marginTop:40,
        shadowColor: '#800000',
        elevation: 8,
    },
    next_button: {
        backgroundColor: maroon,
        borderRadius: 5,
        margin: 10,
        width: "40%",
        position: 'absolute', 
        bottom: 20, 
        right: 15 
    },
    back_button: {
        backgroundColor: maroon,
        borderRadius: 5,
        margin: 10,
        width: "40%",
        position: 'absolute', 
        bottom: 20, 
        left: 15 
    },
    heading: {
        color: maroon,
        marginTop:25,
        fontSize: 20,
        alignSelf:'center',
    },
    flatList:{
        height:"90%",
    }
})

export default Style