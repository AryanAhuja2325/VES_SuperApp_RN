import { StyleSheet } from "react-native";
import { black, blue, gray, maroon, white, lightMaroon } from "../utils/color";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },

    lower: {
        fontSize: 15,
        color: blue,
        textDecorationLine: 'underline',
    },
    nullaccount: {
        fontSize: 15,
        color: blue
    },
    
    logo: {
        width: responsiveWidth(100),
        height: responsiveHeight(50),
        resizeMode: 'stretch'
    },

    icon: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 10,
    },

    text: {
        color: white,
        fontSize: 22,
        fontWeight: '900',
        alignSelf: 'center'
    },


    input: {
        width: '80%',
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 35,
        color: black,
        borderRadius: 10,
    },

    usericon: {
        position: 'absolute',
        left: 1,
        padding: 10
    },
    lockicon: {
        position: 'absolute',
        left: 1,
        padding: 10,
    },
    eyeicon: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 1,
        marginVertical: 5,
        marginHorizontal: 10,
    },

    button: {
        backgroundColor: lightMaroon,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 7,
        shadowColor: maroon
    },
    buttonText: {
        color: white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backgroundView: {
        height: responsiveHeight(50),
        width: responsiveWidth(100)
    },
    logoView: {
        width: responsiveWidth(100),
        height: responsiveHeight(14),
        justifyContent: 'center'
    },
    logoImg: {
        height: responsiveHeight(7),
        width: responsiveWidth(68),
        alignSelf: 'center'
    },
    textView: {
        backgroundColor: '#A82C2C',
        height: responsiveHeight(6),
        width: responsiveWidth(100),
        justifyContent: 'center'
    },
    inputView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(44),
        width: responsiveWidth(100)
    },
    inputiconView: {
        flexDirection: 'row'
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: black
    },

    label: {
        color: maroon,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },

    inputContainer: {
        marginLeft: 10
    },

    otpInput: {
        width: responsiveWidth(90),
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
    },


});

export default styles;