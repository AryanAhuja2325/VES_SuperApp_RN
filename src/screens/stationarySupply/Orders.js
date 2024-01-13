import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppSelector } from '../../../store/hook';
import axios from 'axios';  // Import Axios
import styles from './Orders.styles';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const user = useAppSelector(state => state.profile.data);

    const fetchDataFromServer = async () => {
        try {
            const response = await axios.get(`http://192.168.56.1:3000/api/stationary/orders/${user.email}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity style={styles.orderItem}>
            <Text style={styles.orderTitle}>
                {item.items.map((order) => order.name).join("\n")}
            </Text>
            <Text style={styles.orderDate}>{item.netTotal} Rs</Text>
            <Text style={styles.orderDate}>{new Date(item.date).toLocaleString()}</Text>
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
