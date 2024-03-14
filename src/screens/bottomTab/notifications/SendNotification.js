import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './SendNotification.styles';
import { ip } from '../../../utils/constant';

const SendNotification = () => {
    const [notificationData, setNotificationData] = useState({
        title: '',
        desc: '',
        link: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const addNotification = async () => {
        try {
            if (!notificationData.title.trim() || !notificationData.desc.trim()) {
                Alert.alert('Error', 'Title and Description are required');
                return;
            }

            setIsLoading(true);
            const response = await axios.post(
                'https://' + ip + '/api/notifications/add-notification',
                notificationData
            );

            if (response.data.success) {
                Alert.alert('Success', 'Notification added successfully');
                // Reset inputs after successful addition
                setNotificationData({
                    title: '',
                    desc: '',
                    link: '',
                });
            } else {
                Alert.alert('Error', 'Failed to add notification');
            }
        } catch (error) {
            console.error('Error adding notification:', error);
            Alert.alert('Error', 'Internal Server Error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    onChangeText={(text) =>
                        setNotificationData({ ...notificationData, title: text })
                    }
                    value={notificationData.title}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    onChangeText={(text) =>
                        setNotificationData({ ...notificationData, desc: text })
                    }
                    value={notificationData.desc}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Link (Optional):</Text>
                <TextInput
                    onChangeText={(text) =>
                        setNotificationData({ ...notificationData, link: text })
                    }
                    value={notificationData.link}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={addNotification} style={styles.button}>
                    {isLoading ? (
                        <View style={styles.overlay}>
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#E5E4E2" />
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.buttonText}>Add Notification</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SendNotification;
