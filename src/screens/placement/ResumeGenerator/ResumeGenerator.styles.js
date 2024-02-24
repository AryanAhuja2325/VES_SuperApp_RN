import { StyleSheet } from "react-native";
import * as COLOR from '../../../utils/color';
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    input1: {
        height: 100,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        alignItems: 'center',
        textAlignVertical: 'top',
    },
    additionalFieldContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    additionalField: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
    },
    label: {
        color: COLOR.maroon,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    button: {
        backgroundColor: COLOR.maroon,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 15,
    },
    cancelButton: {
        backgroundColor: COLOR.maroon,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 500,
        alignItems: 'center'
    },
    button2: {
        backgroundColor: COLOR.maroon,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 15,
        marginBottom: 30
    },
    button1: {
        backgroundColor: COLOR.maroon,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: COLOR.white,
        fontWeight: 'bold'
    },
    dropdownText: {
        width: responsiveWidth(90),
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        textAlign: 'left',
        flexDirection: 'row',
        textAlignVertical: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    dropdownStyle: {

        fontSize: 20,
        width: responsiveWidth(90),
        height: responsiveHeight(25),
        borderWidth: 1,
        borderColor: '#912929',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontWeight: 'bold',
    },

    dropdownTextStyle: {
        textAlign: 'justify',
        fontWeight: 'bold',
        fontSize: 14,
        color: COLOR.blue
    },
    modalContainer: {
        padding: 20
    },
    modalHeader: {
        color: COLOR.maroon,
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    eduContainer: {
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    eduText: {
        color: COLOR.black,
        fontSize: 18
    }
});

export default styles;