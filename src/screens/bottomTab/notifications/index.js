import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Linking, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import styles from "./Notifications.style";
import { useAppSelector } from '../../../../store/hook';
import { ip } from "../../../utils/constant";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const user = useAppSelector(state => state.profile.data);

    const getData = async () => {
        try {
            const data = await axios.get("https://" + ip + "/api/notifications");
            setNotifications(data.data);
        } catch (error) {
            console.log(error)
        }
    };


    const renderCard = ({ item }) => {
        const date = new Date(item.date);
        const formatted = date.toLocaleDateString();
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.heading}>{item.title} </Text>
                    <Text style={styles.desc}>{item.desc} </Text>
                    {item.link ? (
                        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                            <Text style={styles.link}>{item.link} </Text>
                        </TouchableOpacity>
                    ) : null}
                    <Text style={styles.date}>{formatted}</Text>
                </View>
            </View>
        );
    };

    useFocusEffect(
        useCallback(() => {
            getData();
            return () => {
            };
        }, [])
    );


    return (
        <View>
            <FlatList
                data={notifications}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Notifications;
