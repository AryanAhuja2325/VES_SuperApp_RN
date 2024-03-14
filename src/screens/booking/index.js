import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import styles from './booking.styles';
import axios from 'axios';
import { useAppSelector } from '../../../store/hook';
import { ip } from '../../utils/constant';

const Booking = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data);
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get('https://' + ip + '/api/booking');
            const fetchedDocuments = response.data;
            const categorizedVenues = categorizeVenues(fetchedDocuments);
            setData(categorizedVenues);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const categorizeVenues = (venues) => {
        const categorized = {};
        venues.forEach((venue) => {
            const category = venue.institute || 'Uncategorized';
            if (!categorized[category]) {
                categorized[category] = [];
            }
            categorized[category].push(venue);
        });

        const sectionsArray = Object.keys(categorized).map((category) => ({
            title: category,
            data: categorized[category],
        }));

        return sectionsArray;
    };

    useEffect(() => {
        getData();
    }, []);

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.productContainer,
            ]}
            onPress={() => navigation.navigate('Information', { data: item })}
        >
            <Image style={styles.productImage} source={{ uri: item.images[0] }} />
            <Text style={styles.productName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    const renderData = ({ item }) => (
        <View>
            {renderSectionHeader({ section: { title: item.title } })}
            <FlatList
                data={item.data}
                keyExtractor={(item) => item._id}
                renderItem={renderCard}
                numColumns={2}
                contentContainerStyle={styles.productList}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.title}
                    renderItem={renderData}
                    scrollEnabled={false}
                />
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Previous Bookings") }}>
                <Text style={styles.buttonText}>{user.loginType == 'Admin'
                    ? "View Bookings"
                    : "View Your Bookings"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Booking;
