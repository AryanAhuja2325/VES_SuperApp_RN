import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image } from 'react-native';
import styles from './booking.styles';
import axios from 'axios';
import { useAppSelector } from '../../../store/hook';

const Booking = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data);
    const [sections, setSections] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get('http://192.168.56.1:3000/api/booking');
            const fetchedDocuments = response.data;

            const categorizedVenues = categorizeVenues(fetchedDocuments);
            setSections(categorizedVenues);
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
                item.prodID % 2 === 0 ? styles.fullWidthItem : styles.halfWidthItem,
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

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item._id}
                renderItem={renderCard}
                renderSectionHeader={renderSectionHeader}
                numColumns={2}
                contentContainerStyle={styles.productList}
            />
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
