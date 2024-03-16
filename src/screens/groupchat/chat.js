import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import styles from './Chat.styles';
import { useAppSelector } from '../../../store/hook';
import { ip } from '../../utils/constant';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const user1 = useAppSelector((state) => state.profile.data);
    const u1 = user1.email;
    const uname = user1.firstName;

    useEffect(() => {
        groupChat();
    }, []);

    const groupChat = async () => {
        try {
            const response = await axios.get(`https://${ip}/api/groupChat`);

            // Group messages by date
            const groupedMessages = response.data.reduce((result, message) => {
                const date = new Date(message.createdAt).toLocaleDateString();
                if (!result[date]) {
                    result[date] = [];
                }
                result[date].push(message);
                return result;
            }, {});

            // Flatten the grouped messages into an array of objects with date and data properties
            const flattenedMessages = Object.keys(groupedMessages).map((date) => ({
                date,
                data: groupedMessages[date],
            }));

            setMessages(flattenedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    const sendMessage = async () => {
        if (text.trim() === '') {
            return;
        }

        try {
            const response = await axios.post(`https://${ip}/api/groupChat/sendMessage`, {
                user: u1,
                text: text.trim(),
                uname: uname,
            });

            console.log(response.data);
            setText('');
            groupChat();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const renderMessage = ({ item }) => {
        const isUser = item.email === u1;
        const messageContainerStyle = isUser ? styles.userMessageContainer : styles.otherMessageContainer;
        const messageTextStyle = isUser ? styles.userMessageText : styles.otherMessageText;
        const messageTimestampStyle = isUser ? styles.userMessageTimestamp : styles.otherMessageTimestamp;
        const messageNameStyle = isUser ? styles.usernameText : styles.othernameText;

        return (
            <View style={[styles.messageContainer, messageContainerStyle]}>
                <Text style={messageNameStyle}>~{item.name}</Text>
                <Text style={messageTextStyle}>{item.text}</Text>
                <Text style={messageTimestampStyle}>
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}
                </Text>
            </View>
        );
    };

    const renderDateHeader = ({ section: { date } }) => {
        return (
            <View style={styles.dateHeaderContainer}>
                <Text style={styles.dateHeaderText}>{new Date(date).toLocaleDateString()}</Text>
            </View>
        );
    };

    const keyExtractor = (item, index) => index.toString();

    const renderFlatList = () => {
        const groupedMessages = messages.reduce((result, message) => {
            const date = new Date(message.createdAt).toLocaleDateString();
            if (!result[date]) {
                result[date] = [];
            }
            result[date].push(message);
            return result;
        }, {});

        const groupedData = Object.keys(groupedMessages).map((date) => ({
            date,
            data: groupedMessages[date],
        }));

        return (
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <>
                        <Text style={styles.dateHeaderText}>{item.date}</Text>
                        {item.data.map((message) => renderMessage({ item: message }))}
                    </>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

        );
    };

    return (
        <View style={styles.container}>
            {renderFlatList()}
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
