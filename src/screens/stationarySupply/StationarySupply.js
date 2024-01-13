import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from './StationarySupply.styles';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import Icons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';

const StationarySupply = ({ navigation }) => {

    const items = useAppSelector(state => state.cart.items)

    const cartItems = items.length;

    const [documents, setDocuments] = useState([]);

    const getData = async () => {
        try {
            const data = await axios.get('http://192.168.56.1:3000/api/stationary/products');
            console.log(data)
            setDocuments(data.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
    }, [])

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.productContainer,
                item.prodID % 2 === 0 ? styles.fullWidthItem : styles.halfWidthItem
            ]}
            onPress={() => navigation.navigate('Details', { data: item })}
        >
            <Image style={styles.productImage} source={{ uri: item.prodImg }} />
            <Text style={styles.productName}>{item.prodName}</Text>
            <View style={styles.priceContainer}>
                {item.discount > 0 && (
                    <Text style={styles.discount}>{item.discount}% off</Text>
                )}
                <Text style={styles.productPrice}>{item.prodPrice} Rs</Text>
                {item.discount > 0 && (
                    <Text style={styles.mrp}>MRP: {item.mrp} Rs</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headingview}>
                <Text style={styles.heading}>Products</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Cart")}
                    style={styles.cart}
                >
                    <View>
                        <Icons name='shopping-cart' size={30} color='black' style={styles.carticon} />
                        <Text style={styles.badge}>{cartItems}</Text>
                    </View>

                </TouchableOpacity>
            </View>
            <FlatList
                data={documents}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.prodId.toString()}
                numColumns={2}
                contentContainerStyle={styles.productList}
            />

            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Orders')}
            >
                <Text style={styles.buttonText}>View your orders</Text>
            </TouchableOpacity>
        </View>
    );
};


export default StationarySupply;