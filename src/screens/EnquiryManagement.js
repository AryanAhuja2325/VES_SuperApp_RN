import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Enquiry = ({ navigation }) => {

    0
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Query");
                }}
                    style={{
                        backgroundColor: '#E7B909',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginHorizontal: 30,
                        marginVertical: 300,
                        width: '80%',
                    }}>
                    <Text style={{
                        color: '#B02A30',
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        borderColor: 'black'
                    }}>Post a Query</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Feedback");
                }}
                    style={{
                        backgroundColor: '#E7B909',
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 2,
                        marginHorizontal: 30,
                        marginVertical: 50,
                        width: '80%'
                    }}>
                    <Text style={{
                        color: '#B02A30',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        borderColor: 'black'
                    }}>Send FeedBack</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )

};

export default Enquiry;



export const Query = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitData = async () => {
        const usedata = {
            Title: title,
            Description: description
        };

        if (title || description) {
            await firestore().collection('Query').add(usedata);
            setTitle("");
            setDescription("");
            Alert.alert("Query submitted");
        } else {
            Alert.alert("Please write a query");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <TextInput
                    name="queryTitle"
                    style={{
                        width: '80%',
                        borderRadius: 10,
                        height: 50,
                        fontSize: 20,
                        borderColor: 'white',
                        borderWidth: 1,
                        marginBottom: 20,
                        paddingHorizontal: 10,
                        marginHorizontal: 40,
                        marginVertical: 90,
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                    placeholder="Query Title"
                    value={title}
                    onChangeText={value => setTitle(value)}
                    placeholderTextColor="white"
                />
                <TextInput
                    name="Description"
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={value => setDescription(value)}
                    placeholderTextColor="white"
                    multiline
                    numberOfLines={6}
                />

                <TouchableOpacity
                    onPress={submitData}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};




export const Feedback = () => {
    const [feedbackDescription, setFeedbackDescription] = useState("");

    const submitData = async () => {
        if (feedbackDescription) {
            const feedbackData = {
                description: feedbackDescription
            };

            await firestore().collection("Feedback").add(feedbackData);
            setFeedbackDescription("");
            Alert.alert("Feedback submitted");
        } else {
            Alert.alert("Please write your feedback");
        }
    }

    const handleFeedbackChange = (value) => {
        setFeedbackDescription(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <TextInput
                    name="Description"
                    style={styles.input}
                    placeholder="Feedback Description"
                    value={feedbackDescription}
                    onChangeText={handleFeedbackChange}
                    placeholderTextColor="white"
                    multiline
                    numberOfLines={6}
                />
                <TouchableOpacity
                    onPress={submitData}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B02A30'
    },
    input: {
        width: '80%',
        height: 300,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        padding: 16,
        borderRadius: 10,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 50,
        textAlign: 'left',
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#E7B909',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        marginHorizontal: 40,
        marginVertical: 50,
        width: '80%',
    },
    buttonText: {
        color: '#B02A30',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        borderColor: 'black'
    }
});

