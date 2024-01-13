import React, { useState } from 'react';
import {
  View,
  Alert,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import styles from './Venue.styles';
import ModalDropdown from 'react-native-modal-dropdown';

const Venue = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [institute, setInstitute] = useState('');
  const [location, setLocation] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImagesSelected, setIsImagesSelected] = useState(false);
  const [newFacility, setNewFacility] = useState('');

  const [timetable, setTimetable] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [dayTimetable, setDayTimetable] = useState([]);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [newActivity, setNewActivity] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImagePicker = async () => {
    try {
      setIsImagesSelected(false);
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        minFiles: 2,
        maxFiles: 6,
        includeBase64: true,
      });

      console.log('Selected images:', selectedImages);
      setSelectedImages(selectedImages);
      setIsImagesSelected(true);
    } catch (error) {
      console.error('Error picking images:', error);
      Alert.alert('Error', 'Error picking images. Please try again.');
    }
  };

  const handleAddFacility = () => {
    if (newFacility.trim() !== '') {
      setFacilities((prevFacilities) => [...prevFacilities, newFacility.trim()]);
      setNewFacility('');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!name || !institute || !description || !location || selectedImages.length === 0 || timetable.length === 0) {
        Alert.alert('Error', 'Please fill out all the fields, select at least one image, and enter the timetable before submitting.');
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('institute', institute);
      formData.append('desc', description);
      formData.append('location', location);

      facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });

      selectedImages.forEach((image, index) => {
        formData.append(`images`, {
          uri: image.path,
          type: image.mime,
          name: image.filename || `image_${index}.jpg`,
        });
      });

      formData.append('timetable', JSON.stringify(timetable));

      const response = await axios.post('http://192.168.56.1:3000/api/venue/upload-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { success, insertedId } = response.data;

      if (success) {
        Alert.alert('Success', 'Data submitted successfully!');
        resetForm();
      } else {
        Alert.alert('Error', 'Failed to submit data.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setInstitute('');
    setLocation('');
    setFacilities([]);
    setSelectedImages([]);
    setNewFacility('');
    setTimetable([]);
  };

  const handleLocationClick = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    Linking.openURL(mapsUrl);
  };

  const handleAddSlot = () => {
    if (selectedDay.trim() !== '' && newStartTime.trim() !== '' && newEndTime.trim() !== '' && newActivity.trim() !== '') {
      const existingDayIndex = timetable.findIndex(day => day.day === selectedDay.trim());

      if (existingDayIndex !== -1) {
        // Day already exists, add slot to existing day
        setTimetable((prevTimetable) => {
          const updatedTimetable = [...prevTimetable];
          updatedTimetable[existingDayIndex].slots.push({
            startTime: newStartTime.trim(),
            endTime: newEndTime.trim(),
            activity: newActivity.trim(),
          });
          return updatedTimetable;
        });
      } else {
        // Day doesn't exist, create a new day with the slot
        setTimetable((prevTimetable) => [
          ...prevTimetable,
          {
            day: selectedDay.trim(),
            slots: [{
              startTime: newStartTime.trim(),
              endTime: newEndTime.trim(),
              activity: newActivity.trim(),
            }],
          },
        ]);
      }

      // Clear input fields
      setNewStartTime('');
      setNewEndTime('');
      setNewActivity('');
    }
  };

  const confirmTimetable = () => {
    if (selectedDay.trim() !== '' && dayTimetable.length > 0) {
      setTimetable((prevTimetable) => [
        ...prevTimetable,
        {
          day: selectedDay.trim(),
          slots: [...dayTimetable],
        },
      ]);
      setDayTimetable([]);
      toggleModal();
    } else {
      Alert.alert('Error', 'Please structure the timetable for the selected day before confirming.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
          style={styles.input}
        />
        <TextInput
          value={institute}
          onChangeText={(text) => setInstitute(text)}
          placeholder="Institute"
          style={styles.input}
        />
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Description"
          style={[styles.input, styles.multilineInput]}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <TextInput
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Location"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLocationClick} style={styles.button1}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
        <TextInput
          value={newFacility}
          onChangeText={(text) => setNewFacility(text)}
          placeholder="Add Facility"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddFacility} style={styles.button}>
          <Text style={styles.buttonText}>Add Facility</Text>
        </TouchableOpacity>
        {facilities.length > 0 && (
          <View style={styles.facilitiesContainer}>
            <Text style={styles.facilityHeader}>Facilities:</Text>
            {facilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
          <Text style={styles.buttonText}>Select Images</Text>
        </TouchableOpacity>

        {selectedImages.length > 0 && isImagesSelected && (
          <ScrollView horizontal style={styles.imagePreviewContainer}>
            {selectedImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: `data:${image.mime};base64,${image.data}` }}
                style={styles.imagePreview}
              />
            ))}
          </ScrollView>
        )}

        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Add Time Table</Text>
        </TouchableOpacity>
        {/* Modal for adding time slots */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add Time Slot</Text>

            {/* Use ModalDropdown for day selection */}
            <ModalDropdown
              options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
              onSelect={(index, value) => setSelectedDay(value)}
              value={selectedDay}
            >
              <Text style={styles.dropdownText}>Select Day</Text>
            </ModalDropdown>

            <TextInput
              value={newStartTime}
              onChangeText={(text) => setNewStartTime(text)}
              placeholder="Start Time"
              style={styles.input}
            />
            <TextInput
              value={newEndTime}
              onChangeText={(text) => setNewEndTime(text)}
              placeholder="End Time"
              style={styles.input}
            />
            <TextInput
              value={newActivity}
              onChangeText={(text) => setNewActivity(text)}
              placeholder="Activity"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddSlot} style={styles.button}>
              <Text style={styles.buttonText}>Add Slot</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmTimetable} style={styles.button}>
              <Text style={styles.buttonText}>Confirm Time Table</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* ... other components */}

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetForm} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
      {isLoading && (
        <View style={styles.overlay}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#E5E4E2" />
          </View>
        </View>
      )}
    </View>
  );
};

export default Venue;
