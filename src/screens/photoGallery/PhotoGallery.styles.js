import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    imageContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    container: {
        paddingHorizontal: 5,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    main: {
        flex: 1,
        padding: 16
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    modalImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },

    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

export default styles;