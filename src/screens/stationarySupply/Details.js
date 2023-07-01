import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import styles from './Details.styles';
import cartSlice, { addItemToCart } from '../../../store/slice/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';

const Details = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { data } = route.params;
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items)

  useEffect(() => {
    setQuantity(1);
  }, [])


  const cartItems = items.length;
  const handleAdd = () => {
    const item = {
      id: data.prodId,
      name: data.prodName,
      price: data.prodPrice,
      qty: quantity,
      total: data.prodPrice * quantity
    }

    dispatch(addItemToCart(item));
    Alert.alert("Succes", "Item added to cart", [
      {
        text: 'Go to Cart',
        onPress: () => navigation.navigate("Cart")
      },
      {
        text: 'OK'
      }
    ],
      [
        {
          cancelable: true
        }
      ])
  }

  return (
    <ScrollView>
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
        <View style={styles.box}>
          <Image
            source={{ uri: data.prodImg }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{data.prodName}</Text>
          <Text style={styles.productPrice}>{data.prodPrice} Rs</Text>
          <Text style={styles.productDescription}>{data.prodDescription}</Text>
          <View style={styles.qtyContainer}>
            <TouchableOpacity onPress={handleDecrease} style={styles.qtyButtonDel}>
              <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.qtyButtonAdd}>
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;