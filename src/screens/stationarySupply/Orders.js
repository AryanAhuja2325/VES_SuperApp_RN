import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppSelector } from '../../../store/hook';
import firestore from '@react-native-firebase/firestore';
import styles from './Orders.styles';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const user = useAppSelector(state => state.profile.data)
    const getData = async () => {
        try {
            const snapshot = await firestore().collection('Orders').where('email', '==', user.email).get();

            const fetchedOrders = snapshot.docs.map((doc) => doc.data())

            setOrders(fetchedOrders)
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity style={styles.orderItem}>
            <Text style={styles.orderTitle}>
                {item.items.map((order) => order.name).join("\n")}
            </Text>
            <Text style={styles.orderDate}>{item.netTotal} Rs</Text>
            <Text style={styles.orderDate}>{new Date(item.date._seconds * 1000).toLocaleString()}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Previous Orders</Text>
            <FlatList
                data={orders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default Orders;
