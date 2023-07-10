import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import * as COLORS from '../../utils/color';
import * as CONST from '../../utils/constant'

const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    card1: {
        width: windowWidth - 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        margin: 10,
        shadowColor: COLORS.shadowcolor,
        backgroundColor: COLORS.white,
        elevation: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.maroon,
        marginBottom: 15
    },

    post: {
        color: COLORS.black,
        fontSize: 15,
        marginBottom: 15
    },

    name: {
        color: COLORS.gray
    },

    date: {
        color: COLORS.lightgray,
        textAlign: 'right'
    },

    image: {
        width: '100%',
        height: '20%',
        alignSelf: 'center',
        resizeMode: 'contain',
        marginHorizontal: 10
    },

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'relative'
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: COLORS.black,
        textAlign: 'right',
        marginRight: 20,
        fontFamily: 'sans-serif'
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },

    readMore: {
        color: COLORS.lightgray,
        marginBottom: 10
    },

    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 16,
    },

    modal: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.black
    },
    input: {
        height: 40,
        borderColor: COLORS.gray,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputPost: {
        borderColor: COLORS.gray,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: COLORS.blue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;