import { StyleSheet } from "react-native";
import * as COLOR from '../utils/color'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#fff'
    },

    submitContainer: {
        alignItems: 'center',
        alignContent: 'center'
    },

    picker: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 20,
    },

    heading: {
        color: 'rgb(145,41,40)',
        fontSize: 35,
        marginBottom: 30,
        fontWeight: 'bold',
    },

    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    inputCaptcha: {
        width: '40%',
        height: 35,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 30,
        marginHorizontal: 20,
        elevation: 10,
    },

    text: {
        color: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 20,
        textDecorationLine: 'underline',
    },

    captchaText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        color: COLOR.gray,
        textDecorationLine: 'line-through'
    },

    captchaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        textAlign: 'center'
    },

    icon: {
        marginLeft: 15,
        marginRight: 10
    },

    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
});

export default styles;