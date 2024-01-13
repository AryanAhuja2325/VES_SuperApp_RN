import React, { useState } from 'react';
import { View, TextInput, Alert, TouchableOpacity, Text, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import Style from './EventUpdate.styles';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

const AddEvent = () => {
    const [Title, setTitle] = useState('');
    const [Desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [date, setdate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImagePick = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            });

            setSelectedImage(image);
            setImage('');
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const handleAdd = async () => {
        try {
            setLoading(true);

            // Upload the image to Firebase Storage
            let imageUrl = '';  // Initialize imageUrl variable

            if (selectedImage) {
                const storageRef = storage().ref(`event_images/${Date.now()}_${selectedImage.path.split('/').pop()}`);
                await storageRef.putFile(selectedImage.path);

                // Get the download URL
                imageUrl = await storageRef.getDownloadURL();
                console.log(imageUrl);
            }

            // Add the event data to the server
            const response = await axios.post('http://192.168.56.1:3000/api/eventUpdate/addEvent', {
                Title,
                Desc,
                Image: imageUrl,  // Use the imageUrl variable
                Eventdate: date.toISOString(),
            });

            if (response.status === 200) {
                Alert.alert(
                    'Success',
                    'Event added successfully',
                    [{ text: 'Ok' }],
                    { cancelable: true }
                );
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        } catch (error) {
            console.error('Error adding event:', error);
            Alert.alert(
                'Error',
                'Failed to add event. Please try again.',
                [{ text: 'Ok' }],
                { cancelable: true }
            );
        } finally {
            setLoading(false);
            setSelectedImage(null);
            setTitle('');
            setDesc('');
            setdate(new Date());
            // Clear other input fields if needed
        }
    };


    return (
        <ScrollView>
            <TextInput
                style={Style.textInput}
                placeholder="Enter title"
                value={Title}
                onChangeText={setTitle}
            />
            <TextInput
                style={Style.textInput}
                placeholder="Enter Description"
                value={Desc}
                onChangeText={setDesc}
            />
            <TouchableOpacity
                style={Style.button}
                onPress={handleImagePick} // Trigger the image picker
            >
                <Text style={Style.text}>Pick Image</Text>
            </TouchableOpacity>
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage.path }}
                    style={{ width: 200, height: 200, marginTop: 10 }}
                />
            )}
            {loading && (
                <View style={Style.overlay}>
                    <View style={Style.loaderContainer}>
                        <ActivityIndicator size="large" color="#E5E4E2" />
                    </View>
                </View>
            )}
            <DatePicker
                style={Style.datePicker}
                date={date}
                mode="date"
                onDateChange={(newDate) => setdate(newDate)}
            />
            <TouchableOpacity
                style={Style.button}
                onPress={handleAdd}
            >
                <Text style={Style.text}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddEvent;
