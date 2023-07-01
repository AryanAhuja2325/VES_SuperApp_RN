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

const StationarySupply = ({ navigation }) => {

    const items = useAppSelector(state => state.cart.items)

    const cartItems = items.length;

    const [documents, setDocuments] = useState([]);

    const getData = async () => {
        try {
            const snapshot = await firestore().collection('Products').get();

            const fetchedDocuments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setDocuments(fetchedDocuments);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productContainer}
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
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading}>VES Stationary Supply Hub</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Cart")}
                >
                    <Image
                        source={require('../../assets/imgs/cart.png')}
                        style={styles.cart}
                    />
                    <Text style={styles.badge}>{cartItems}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={documents}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.prodId.toString()}
                numColumns={2}
                contentContainerStyle={styles.productList}
                style={{ marginTop: 40 }}
            />
        </View>
    );
};


export default StationarySupply;