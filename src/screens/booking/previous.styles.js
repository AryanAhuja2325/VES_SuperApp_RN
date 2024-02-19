import { StyleSheet } from "react-native";
import * as COLORS from "../../utils/color";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.shadowcolor,
        elevation: 8,
        margin: 10,

    },

    text: {
        fontWeight: '900',
        color: 'black',
        marginLeft: 15,
    },

    gradient: {
        flex: 1,
        borderRadius: 16,
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
    },

    header: {
        fontWeight: '900',
        color: COLORS.black,
        marginLeft: 15,
        fontSize: 20,
        paddingVertical: 10,
    },

    line: {
        borderBottomColor: COLORS.black,
        borderBottomWidth: 1,
        marginVertical: 5,
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 30
    },

    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 10,
        margin: 10,
    },

    noBookingsText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },

});

export default styles;