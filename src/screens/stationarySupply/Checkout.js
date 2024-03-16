import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import styles from './Checkout.styles';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import firestore from '@react-native-firebase/firestore';
import { clearCart } from '../../../store/slice/cartSlice';
import axios from 'axios';
import { ip } from '../../utils/constant';

const Checkout = ({ navigation, route }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.profile.data)
    const total = route.params.total;
    const items = useAppSelector(state => state.cart.items)
    const name = `${user.firstName} ${user.lastName}`
    const [isLoading, setIsLoading] = useState(false);

    const placeOrder = async () => {
        try {
            setIsLoading(true)
            const order = {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                itemCount: items.length,
                items: items,
                netTotal: total,
                date: new Date() // Create a Date object
            };

            const response = await axios.post('https://' + ip + '/api/stationary/placeOrder', order);

            if (response.data.message === 'Order placed successfully') {
                Alert.alert("Success", "Order Placed Successfully", [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Stationary')
                    }
                ]);
                dispatch(clearCart());
            } else {
                Alert.alert("Error", "Order placement failed");
            }
            setIsLoading(false)
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert("Error", "Internal Server Error");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>

            <View style={styles.cartContainer}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>{item.total} Rs</Text>
                        </View>
                    )}
                />
                <View style={styles.cartItem}>
                    <Text style={styles.textMain}>Total payable Amount:</Text>
                    <Text style={styles.textMain}>{total} Rs</Text>
                </View>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder="Full Name"
                    placeholderTextColor={'grey'}
                    editable={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor={'grey'}
                    value={user.email}
                    editable={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    placeholderTextColor={'grey'}
                    value={user.phoneNo}
                    editable={user.phoneNo ? false : true}
                />

            </View>

            <TouchableOpacity style={styles.button}
                onPress={placeOrder}
            >
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
            {isLoading && (
                <View style={styles.overlay}>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#E5E4E2" />
                    </View>
                </View>
            )}
        </View>
    );
};

export default Checkout;

