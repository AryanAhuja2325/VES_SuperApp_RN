import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './AddProducts.styles';
import ImagePicker from 'react-native-image-crop-picker';
import { firebase } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { ip } from '../../utils/constant';

const AddProducts = () => {
    const [prodDescription, setProdDescription] = useState('');
    const [prodImg, setProdImg] = useState('');
    const [prodName, setProdName] = useState('');
    const [availQty, setAvailQty] = useState('');
    const [discount, setDiscount] = useState('');
    const [mrp, setMrp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImagePicker = async () => {
        try {
            const selectedImages = await ImagePicker.openPicker({
                multiple: false,
                mediaType: 'photo',
                minFiles: 2,
                maxFiles: 6,
            });

            uploadImagesToFirebase(selectedImages);
        } catch (error) {
            console.error('Error picking images:', error);
        }
    };

    const uploadImagesToFirebase = async (image) => {
        try {
            const fileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;
            const storageRef = storage().ref().child(`images/${fileName}`);
            const blob = await fetch(image.path).then(res => res.blob());

            console.log('Uploading Image:', fileName);
            await storageRef.put(blob);

            const downloadURL = await storageRef.getDownloadURL();
            console.log('Download URL:', downloadURL);

            setProdImg(downloadURL);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const formData = {
                prodDescription,
                prodImg,
                prodName,
                availQty,
                discount,
                mrp,
            };

            const response = await axios.post("http://" + ip + ":3000/api/stationary/addProduct", formData)

            if (response.status === 201) {
                Alert.alert("Success", "Data Added successfully");
                reset();
            } else {
                Alert.alert("Error", "Failed to add data. Please try again.");
            }
            setProdDescription('');
            setProdImg('');
            setProdName('');
            setAvailQty('');
            setDiscount('');
            setMrp('');
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <ScrollView>
            <View style={styles.main}>
                <Text style={styles.label}>Product Name:</Text>
                <TextInput
                    value={prodName}
                    onChangeText={(text) => setProdName(text)}
                    style={styles.input}
                    placeholder='Name'
                />

                <Text style={styles.label}>Product Description:</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    value={prodDescription}
                    onChangeText={(text) => setProdDescription(text)}
                    style={styles.input1}
                    placeholder='Description'
                />

                <Text style={styles.label}>Product Image:</Text>
                <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
                    <Text style={styles.buttonText}>Select Images</Text>
                </TouchableOpacity>
                {prodImg !== '' && <Image source={{ uri: prodImg }} style={styles.image} />}

                <Text style={styles.label}>Available Quantity:</Text>
                <TextInput
                    value={availQty}
                    onChangeText={(text) => setAvailQty(text)}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder='Quantity'
                />

                <Text style={styles.label}>Discount:</Text>
                <TextInput
                    value={discount}
                    onChangeText={(text) => setDiscount(text)}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder='Discount(in Rs)'
                />

                <Text style={styles.label}>MRP:</Text>
                <TextInput
                    value={mrp}
                    onChangeText={(text) => setMrp(text)}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder='MRP'

                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {isLoading && (
                    <View style={styles.overlay}>
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="#E5E4E2" />
                        </View>
                    </View>
                )}

            </View>
        </ScrollView>
    );
};

export default AddProducts;
