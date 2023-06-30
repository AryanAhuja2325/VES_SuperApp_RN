import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    renderView:{
        alignSelf: 'center', 
        backgroundColor: 'rgb(255, 255, 225)', 
        padding: 10, margin: 20, 
        elevation: 50, 
        width: 350, 
        height: 350, 
        borderBlockColor: 'brown', 
        borderWidth: 10, 
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'visible'
    },
    titleView:{
        alignSelf: 'center', 
        backgroundColor: '#A80000', 
        padding: 10, 
        width: 320,
        borderTopLeftRadius: 20, 
        borderBottomRightRadius: 20
    },
    titleText:{
        fontSize: 40, 
        backgroundColor: 'rgba(255,0,0,0)',
        color:'rgb(255, 255, 225)'
    },
    descView:{
        alignSelf: 'center', 
        padding: 10,
    },
    descText:{ 
        fontSize: 30,
        color:'black' 
    },
    mainView:{
        marginBottom:20,
        flex:1
    },
    image:{
        width: 390, 
        height: 200, 
        alignSelf: 'center', 
        borderColor: 'orange', 
        borderWidth: 10 
    }
})

export default Style;