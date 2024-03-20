import { StyleSheet } from "react-native";
import { black, blue, gray, maroon, white, lightMaroon } from "../../../utils/color";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        paddingTop: 20,
        alignItems: "center"
    },

    input: {
        width: '80%',
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginBottom: 20,
        color: black,
        borderRadius: 10,
    },

    button: {
        backgroundColor: lightMaroon,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 7,
        shadowColor: maroon,
        width: '80%',
        marginTop: 20
    },

    buttonText: {
        color: white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    label: {
        color: maroon,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },

    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },

});

export default styles;