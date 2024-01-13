import { StyleSheet } from "react-native";
import * as COLORS from '../../utils/color';

const styles = StyleSheet.create({
    mainview: {
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },

    headingview: {
        flexDirection: 'row',
        borderBottomColor: 'rgb(145,40,41)',
        borderBottomWidth: 2,
        marginBottom: 20,
        margin: 4
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16
    },
    venueImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',

    },
    venueDetails: {
        marginTop: 16,

    },
    venueTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black'
    },
    venueLocation: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF5722',
    },
    venueDescription: {
        fontSize: 16,
        color: '#555555',
        fontStyle: 'italic',
        marginBottom: 10,
        marginTop: 10
    },
    buttonContainer: {
        backgroundColor: 'rgb(145,41,40)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 30,
        width: '70%'
    },
    fullButtonContainer: {
        backgroundColor: 'rgb(145,41,40)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '70%'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtyContainer: {
        flexDirection: 'column',

    },
    slide: {
        height: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    modalContainer: {
        flex: 1,
    },

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.maroon,
        padding: 16,
    },
    modalHeaderText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalHeaderTextContainer: {
        flex: 1,
        alignItems: 'center'
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        color: COLORS.white,
        fontSize: 16,
    },

    inner: {
        marginTop: 30,
        alignItems: 'center'
    },

    selectText: { padding: 10, fontWeight: 'bold', color: COLORS.shadowcolor, fontSize: 20, },

    table: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    tableHeading:
    {
        borderWidth: 1, alignItems: 'center', backgroundColor: '#f0f0f0', padding: 5,
    },
    rows:
    {
        borderWidth: 1, marginTop: 5, paddingLeft: 5, padding: 5,
    },
    timeSlot:
    {
        padding: 10,
        borderColor: COLORS.shadowcolor,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 5,
    },
});

export default styles;