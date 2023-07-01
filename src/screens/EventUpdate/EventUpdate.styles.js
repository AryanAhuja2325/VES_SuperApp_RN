import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    renderView: {
        padding: 10,
        margin: 20,
        elevation: 5,
        flex: 1,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'visible',
    },
    titleView: {
        alignSelf: 'center',
        backgroundColor: '#A80000',
        width: 320,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    titleText: {
        fontSize: 40,
        color: 'rgb(255, 255, 225)'
    },
    descView: {
        padding: 10,
    },
    descText: {
        fontSize: 20,
        color: 'black'
    },
    mainView: {
        flex: 1,
    },
    image: {
        width: 360,
        height: 200,
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 5
    },
    button: {
        backgroundColor: "#A80000",
        borderWidth: 5,
        alignSelf: 'center'
    },
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'rgb(255, 255, 225)'
    },
    textInput: {
        borderWidth:5,
        margin:10,
        borderRadius:10,
        padding:10
    },
    view:{
        backgroundColor:'#A80000',
        marginBottom:10
    }
})

export default Style;