import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, StyleSheet } from 'react-native';
import storage from '@react-native-firebase/storage'; // Import Firebase Storage
import ImageCropPicker from 'react-native-image-crop-picker'; // Import Image Crop Picker
import axios from 'axios';
import { ip } from '../../../utils/constant';
import styles from './AddAlumni.styles';

const AddAlumni = () => {
    const [alumniData, setAlumniData] = useState({
        name: '',
        role: '',
        company: '',
        linkedin: '',
        imageURI: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const selectImage = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
            });
            setAlumniData({ ...alumniData, imageURI: image.path });
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    const uploadImageToFirebase = async () => {
        if (!alumniData.imageURI) {
            return '';
        }

        const imageRef = storage().ref('alumni_images').child(alumniData.name);
        try {
            await imageRef.putFile(alumniData.imageURI);
            const downloadURL = await imageRef.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image to Firebase:', error);
            return '';
        }
    };

    const addAlumni = async () => {
        try {
            setIsLoading(true);

            if (!alumniData.name.trim() || !alumniData.role.trim() || !alumniData.company.trim() || !alumniData.linkedin.trim()) {
                Alert.alert('Error', 'All fields are required');
                return;
            }

            const imageURL = await uploadImageToFirebase();

            const alumni = {
                name: alumniData.name,
                role: alumniData.role,
                description: alumniData.company,
                linkedin: alumniData.linkedin,
                image: imageURL,
            };

            console.log(alumni);
            const response = await axios.post(`https://${ip}/api/alumni/add`, alumni);

            if (response.status = 200) {
                Alert.alert('Success', 'Alumni added successfully');
                setAlumniData({
                    name: '',
                    role: '',
                    company: '',
                    linkedin: '',
                    imageURI: '',
                });

            } else {
                Alert.alert('Error', 'Failed to add alumni');
            }
        } catch (error) {
            Alert.alert('Error', 'Internal Server Error');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(text) =>
                    setAlumniData({ ...alumniData, name: text })
                }
                value={alumniData.name}
                placeholder="Name"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) =>
                    setAlumniData({ ...alumniData, role: text })
                }
                value={alumniData.role}
                placeholder="Role"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) =>
                    setAlumniData({ ...alumniData, company: text })
                }
                value={alumniData.company}
                placeholder="Company"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) =>
                    setAlumniData({ ...alumniData, linkedin: text })
                }
                value={alumniData.linkedin}
                placeholder="LinkedIn Profile"
                style={styles.input}
            />
            <TouchableOpacity onPress={selectImage} style={styles.button}>
                <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            {alumniData.imageURI ? (
                <Image
                    source={{ uri: alumniData.imageURI }}
                    style={styles.image}
                />
            ) : null}
            <TouchableOpacity onPress={addAlumni} style={styles.button}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Add Alumni</Text>
                )}
            </TouchableOpacity>

        </View>
    );
};


export default AddAlumni;
