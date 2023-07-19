import { StyleSheet } from "react-native";
import { black, maroon, shadowcolor, white } from "../../utils/color";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: 'white',
        shadowColor: shadowcolor,
        width: '100%',
        overflow: 'hidden',
        marginBottom: responsiveHeight(3),
        borderRadius: 10,
        elevation: 5
    },
    location: {
        fontSize: 14,
        color: black,
        paddingHorizontal: responsiveWidth(1)
    },
    bottomView: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(2),
        borderTopWidth: 1
    },
    share: {
        position: 'absolute',
        right: 1,
        paddingHorizontal: responsiveWidth(2),
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black,
        paddingHorizontal: responsiveWidth(1)
    },

    image: {
        // width: "100%",
        borderColor: '#fff',
        height: responsiveHeight(56),
        width: responsiveWidth(100),
    },


    main: {
        flex: 1,
        padding: 10
    },

    dropdown: {
        width: responsiveWidth(95),
    },
    dropdownText: {
        fontSize: 24,
        color: black,

    },
    dropdownStyle: {
        maxHeight: responsiveHeight(30),
        width: responsiveWidth(90),
        borderRadius: 5,
        elevation: 10,
    },

});

export default styles;