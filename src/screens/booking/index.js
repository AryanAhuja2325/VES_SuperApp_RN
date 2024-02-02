import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from './booking.styles';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Booking = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data);
    const [documents, setDocuments] = useState([]);

    const getData = async () => {
        try {
            const snapshot = await firestore().collection('Booking').get();

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

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.productContainer,
                item.prodID % 2 === 0 ? styles.fullWidthItem : styles.halfWidthItem
            ]}
            onPress={() => navigation.navigate('Information', { data: item })}
        >
            <Image style={styles.productImage} source={{ uri: item.images[0] }} />
            <Text style={styles.productName}>{item.name}</Text>

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headingview}>
                <Text style={styles.heading}>Venues</Text>
            </View>
            <FlatList
                data={documents}
                renderItem={renderCard}
                keyExtractor={(item) => item}
                numColumns={2}
                contentContainerStyle={styles.productList}
            />
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Previous Bookings") }}>
                <Text style={styles.buttonText}>{user.loginType == 'Admin'
                    ? "View Bookings"
                    : "View Your Bookings"}
                </Text>
                {/* <Icon name="pending_actions" size={30} color="white" /> */}
            </TouchableOpacity>
        </View>
    );
};

export default Booking;
