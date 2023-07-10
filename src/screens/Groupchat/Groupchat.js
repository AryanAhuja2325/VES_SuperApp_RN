import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { black, gray, lightgray, white } from '../../utils/color';
import { useAppSelector } from '../../../store/hook';
import { TabRouter } from '@react-navigation/native';

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const user = useAppSelector(state => state.profile.data)

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('GroupChat')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(documentSnapshot => {
                    const data = documentSnapshot.data();
                    return {
                        _id: documentSnapshot.id,
                        text: data.text,
                        createdAt: data.createdAt.toDate(),
                        user: data.user,
                    };
                });
                setMessages(messages);
            });

        return () => unsubscribe();
    }, []);

    const onSend = async (newMessages = []) => {
        const message = newMessages[0];
        const { _id, createdAt, text, user } = message;

        try {
            await firestore().collection('GroupChat').add({
                _id,
                createdAt: firestore.Timestamp.fromDate(createdAt),
                text,
                user,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: styles.senderBubble,
                    left: styles.receiverBubble,
                }}
                textStyle={{
                    right: styles.senderText,
                    left: styles.receiverText,
                }}
            />
        );
    };

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={styles.inputToolbarContainer}
                primaryStyle={styles.inputToolbarPrimary}
            />
        );
    };
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <Icon name="send" size={26} color="black" />
            </Send>
        );
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
                _id: user.email,
            }}
            renderUsernameOnMessage={true}
            renderAvatarOnTop={true}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
        />
    );
};

const styles = StyleSheet.create({
    senderBubble: {
        backgroundColor: '#2ECC71',
    },
    receiverBubble: {
        backgroundColor: white,
    },
    senderText: {
        color: '#FFFFFF',
    },
    receiverText: {
        color: black,
    },
    inputToolbarContainer: {
        backgroundColor: lightgray,
        // borderTopWidth: 0,
        paddingBottom: 5,
        paddingHorizontal: 10,
    },
    inputToolbarPrimary: {
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,

    },
});

export default GroupChat;
