import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import styles from './Cart.styles';
import { removeItemFromCart } from '../../../store/slice/cartSlice';

const Cart = ({ navigation }) => {
    const items = useAppSelector(state => state.cart.items)
    const user = useAppSelector(state => state.profile)
    const [total, setTotal] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let netTotal = 0;
        items.forEach((item) => {
            netTotal += item.total;
        });
        setTotal(netTotal);
    }, [items]);


    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Details', { data: item }) }}
                >
                    <Text style={styles.itemName}>{item.name}</Text>
                </TouchableOpacity>
                <Text style={styles.itemName}>{item.price}</Text>
                <Text style={styles.itemName}>{item.qty}</Text>
                <Text style={styles.itemPrice}>{item.total} Rs</Text>
                <TouchableOpacity
                    onPress={() => dispatch(removeItemFromCart(item.id))}
                >
                    <Text style={styles.removeButton}>-</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading1}>Cart</Text>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Name</Text>
                <Text style={styles.heading}>Price</Text>
                <Text style={styles.heading}>Qty</Text>
                <Text style={styles.heading}>Total</Text>
            </View>
            {items.length > 0 ? (
                <View style={styles.container}>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <Text style={styles.bottomText}>Total payable amount:</Text>
                        <Text style={styles.bottomText}>{total} Rs</Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    </TouchableOpacity>

                </View>
            ) : (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            )}

        </View>
    );
};

export default Cart;
