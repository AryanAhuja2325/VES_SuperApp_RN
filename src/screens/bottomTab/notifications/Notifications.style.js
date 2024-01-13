import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../../utils/color';
import { cartborderradius, elevationsize } from '../../../utils/constant';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 25,
        paddingTop: 20,
    },

    card: {
        shadowColor: COLORS.shadowcolor,
        backgroundColor: COLORS.white,
        elevation: elevationsize,
        borderRadius: cartborderradius,
        padding: 20,
    },

    heading: {
        color: COLORS.black,
        fontSize: 27,
        marginBottom: 10,
        fontWeight: '600'
    },

    desc: {
        fontSize: 15,
        color: COLORS.black
    },

    link: {
        color: COLORS.blue,
        fontSize: 13,
        marginTop: 7
    },
    date: {
        color: COLORS.desctext,
        textAlign: 'right',
        marginTop: 10
    },
    button: {
        backgroundColor: COLORS.lightMaroon,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        elevation: 7,
        shadowColor: COLORS.maroon
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonContainer: {
        paddingHorizontal: 25,
        paddingVertical: 10

    },
    modalContainer: {
        flex: 1,
    },
})

export default styles;