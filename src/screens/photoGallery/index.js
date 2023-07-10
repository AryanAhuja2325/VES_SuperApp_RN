import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './PhotoGallery.styles';

const ImageGrid = () => {
    const [imageArrays, setImageArrays] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedImageType, setSelectedImageType] = useState('');

    const handleClick = (image, title) => {
        setSelectedImage(image);
        setModalVisible(true);
        setSelectedImageType(title)
    };

    useEffect(() => {
        // Fetch image arrays from Firebase
        const fetchImageArrays = async () => {
            try {
                const snapshot = await firestore().collection('Images').get();
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().imageTitle,
                    images: doc.data().imageURL,
                }));

                setImageArrays(data);
            } catch (error) {
                console.log('Error fetching image arrays:', error);
            }
        };

        fetchImageArrays();
    }, []);

    const renderItem = ({ item }) => {
        const title = item.title;
        return (
            <View style={styles.imageContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <FlatList
                    data={item.images}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleClick(item, title)}>
                            <Image
                                source={{ uri: item }}
                                style={styles.image}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.container}
                />
            </View>
        );

    }
    return (
        <View style={styles.main}>
            <FlatList
                data={imageArrays}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => setModalVisible(false)}
                >
                    <Image source={{ uri: selectedImage }} style={styles.modalImage} />
                    <Text style={styles.caption}>{selectedImageType}</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default ImageGrid;
