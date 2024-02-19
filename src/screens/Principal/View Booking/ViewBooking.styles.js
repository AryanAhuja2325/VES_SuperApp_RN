import { StyleSheet } from "react-native";
import { shadowcolor, white } from "../../../utils/color";

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        backgroundColor: white,
        shadowColor: shadowcolor,
        elevation: 8,
        margin: 10,

    },

    text: {
        fontWeight: '900',
        color: 'black',
        marginLeft: 15,
    },

    gradient: {
        flex: 1, // Ensure the LinearGradient takes up the entire card
        borderRadius: 16, // Apply the borderRadius to the LinearGradient
    },

    record: {
        fontWeight: 'bold',
        color: '#4B0082',
    },

    textContainer: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },

    icon: {
        position: 'absolute',
        right: 4,
        bottom: 2,
    }
});

export default styles;
