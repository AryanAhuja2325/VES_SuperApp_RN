import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Alert, TouchableOpacity, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';


const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const user1 = useAppSelector(state => state.profile.data);
    const u1 = user1.email;
    useEffect(() => {
        groupChat();
    }, []);

    const groupChat = async () => {
        const collectionRef = firestore().collection('GroupChat');
        const querySnapshot = await collectionRef.orderBy('createdAt', 'asc').get();
        const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
        setMessages(fetchedMessages);
    };

    const sendMessage = async () => {
        const currentTime = firestore.Timestamp.now();
        const user = u1;
        const message = text.trim();

        if (message === '') {
            return;
        }

        try {
            await firestore().collection('GroupChat').add({
                email: user,
                text: message,
                createdAt: currentTime,
            });
            setText('');
            groupChat();
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };

    const renderMessage = ({ item }) => {
        const isUser = item.email === u1;
        const messageContainerStyle = isUser ? styles.userMessageContainer : styles.otherMessageContainer;
        const messageTextStyle = isUser ? styles.userMessageText : styles.otherMessageText;
        const messageTimestampStyle = isUser ? styles.userMessageTimestamp : styles.otherMessageTimestamp;
        // const formattedTime = `${item.createdAt.getHours()}:${item.createdAt.getMinutes()}`

        return (
            <View style={[styles.messageContainer, messageContainerStyle]}>
                <Text style={messageTextStyle}>{item.text}</Text>
                <Text style={messageTimestampStyle}>{item.createdAt.toDate().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Parent</Text>
            </View>
            <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message"
                    placeholderTextColor="#757575"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        height: 50,
        backgroundColor: '#128C7E',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    logoutButton: {
        padding: 8,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    date: {
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8,
        color: '#888',
    },
    messageContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        maxWidth: '75%',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#dcf8c6',
    },
    otherMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
    },
    userMessageText: {
        fontSize: 16,
        color: '#000',
    },
    otherMessageText: {
        fontSize: 16,
        color: '#000',
    },
    userMessageTimestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    otherMessageTimestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
        fontSize: 16,
        color: '#000',
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#128C7E',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 40,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
