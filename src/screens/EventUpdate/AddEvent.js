import React, {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Style from './AddEvent.styles';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import {ip} from '../../utils/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddEvent = () => {
  const [Title, setTitle] = useState('');
  const [Desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [date, setdate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = selectedDate.toDateString();

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
    
    if (!Title || !Desc || !selectedImage || !selectedDate) {
        Alert.alert(
          'Error',
          'Please fill in all fields',
          [{ text: 'Ok' }],
          { cancelable: true }
        );
        return;
      }

      const words = Desc.split(/\s+/);
      if (words.length < 20) {
        Alert.alert(
          'Error',
          'Description should be more than 20 words',
          [{ text: 'Ok' }],
          { cancelable: true }
        );
        return;
      }

    try {
      setLoading(true);

      // Upload the image to Firebase Storage
      let imageUrl = ''; // Initialize imageUrl variable

      if (selectedImage) {
        const storageRef = storage().ref(
          `event_images/${Date.now()}_${selectedImage.path.split('/').pop()}`,
        );
        await storageRef.putFile(selectedImage.path);

        // Get the download URL
        imageUrl = await storageRef.getDownloadURL();
        console.log(imageUrl);
      }

      // Add the event data to the server
      const response = await axios.post(
        'https://' + ip + '/api/eventUpdate/addEvent',
        {
          Title,
          Desc,
          Image: imageUrl, // Use the imageUrl variable
          Eventdate: date.toISOString(),
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Event added successfully', [{text: 'Ok'}], {
          cancelable: true,
        });
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert(
        'Error',
        'Failed to add event. Please try again.',
        [{text: 'Ok'}],
        {cancelable: true},
      );
    } finally {
      setLoading(false);
      setSelectedImage(null);
      setTitle('');
      setDesc('');
      setdate(new Date());
    }
  };

  return (
    <ScrollView contentContainerStyle={Style.container}>
      <View style={Style.row}>
        <Text style={Style.title}>Add Event</Text>
        <TextInput
          style={Style.textInput}
          placeholder="Enter title"
          value={Title}
          onChangeText={setTitle}
        />
        <View style={Style.textInputContainer}>
         <TextInput
          style={Style.textAreaInput}
          placeholder="Enter Description"
          multiline={true}
          value={Desc}
          onChangeText={setDesc}
        />
        <View style={Style.wordCountContainer}>
          <Text style={Style.wordCount}>{Desc.split(/\s+/).length}/100 words</Text>
        </View>
        </View>
        <TouchableOpacity style={Style.button} onPress={handleImagePick}>
          <Text style={Style.buttonText}>Pick Image</Text>
        </TouchableOpacity>
        {selectedImage && (
          <Image source={{uri: selectedImage.path}} style={Style.image} />
        )}
        {loading && (
          <View style={Style.overlay}>
            <ActivityIndicator size="large" color="#E5E4E2" />
          </View>
        )}
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={[Style.input, Style.selectedDateText]}
            editable={false}
            value={selectedDate.toDateString()}
          />
          <MaterialIcons
            name="date-range"
            size={30}
            color="black"
            style={Style.calendarIcon}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            isVisible={showDatePicker}
            date={date}
            mode="date"
            onConfirm={newdate => {
              setSelectedDate(newdate);
              setShowDatePicker(false);
            }}
            onCancel={() => setShowDatePicker(false)}
          />
        )}
        <TouchableOpacity style={Style.button} onPress={handleAdd}>
          <Text style={Style.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddEvent;
