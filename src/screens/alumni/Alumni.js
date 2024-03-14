import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import styles from './Alumni.styles';
import axios from 'axios';
import { ip } from '../../utils/constant';

const Alumni = () => {
        const [alumniData, setAlumniData] = useState([]);

        useEffect(() => {
                const fetchAlumniData = async () => {
                        try {
                                const data = await axios.get('https://' + ip + '/api/alumni');
                                console.log(data)
                                setAlumniData(data.data);
                        } catch (error) {
                                console.log('Error fetching alumni Data:', error);
                        }
                };

                fetchAlumniData();
        }, []);


        const renderItem = ({ item }) => (
                <View style={styles.itemContainer} >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.Text}>{item.name}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.roletext}>{item.role}</Text>
                </View>
        );

        return (
                <SafeAreaView style={styles.safeView}>
                        <View>
                                <FlatList
                                        data={alumniData}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                        numColumns={2}
                                        contentContainerStyle={styles.container}
                                />
                        </View>
                </SafeAreaView>
        );
};

export default Alumni;
