import { StyleSheet } from 'react-native';
import * as COLORS from '../../../utils/color';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bookingCard: {
        borderRadius: 16,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.shadowcolor,
        elevation: 8,
        margin: 10,
        padding: 10
    },
    venueText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    bookingDetailText: {
        marginBottom: 5,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    approveButton: {
        color: 'green',
    },
    rejectButton: {
        color: 'red',
    },
    header: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 30
    },
    noRequestsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
});

export default styles;