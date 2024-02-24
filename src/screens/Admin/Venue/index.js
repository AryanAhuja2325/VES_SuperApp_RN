import React, { useEffect, useState } from 'react';
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
// import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './Venue.styles';
import ModalDropdown from 'react-native-modal-dropdown';
import { useAppSelector } from '../../../../store/hook';
import { ip } from '../../../utils/constant';

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
  const user = useAppSelector(state => state.profile.data);

  useEffect(() => {
    if (user.loginType === 'Principal') {
      setInstitute(user.institute);
    }
  }, [])

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
      if (!name || !institute || !description || !location || selectedImages.length === 0) {
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

      formData.append('timetable', JSON.stringify(Array.isArray(timetable) ? timetable : []));

      const response = await axios.post('http://' + ip + ':3000/api/venue/upload-data', formData, {
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

  const isValidTimeFormat = (time) => {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;
    return regex.test(time);
  };

  const handleAddSlot = () => {
    if (
      selectedDay.trim() !== '' &&
      newStartTime.trim() !== '' &&
      newEndTime.trim() !== '' &&
      newActivity.trim() !== ''
    ) {
      if (!isValidTimeFormat(newStartTime) || !isValidTimeFormat(newEndTime)) {
        Alert.alert('Error', 'Invalid time format. Please use HH:MM AM/PM.');
        return;
      }

      const startTimeString = newStartTime.trim();
      const endTimeString = newEndTime.trim();

      const existingDayIndex = timetable.findIndex((day) => day.day === selectedDay.trim());

      if (existingDayIndex !== -1) {
        setTimetable((prevTimetable) => {
          const updatedTimetable = [...prevTimetable];
          updatedTimetable[existingDayIndex].slots.push({
            startTime: startTimeString,
            endTime: endTimeString,
            activity: newActivity.trim(),
          });
          return updatedTimetable;
        });
      } else {
        setTimetable((prevTimetable) => [
          ...prevTimetable,
          {
            day: selectedDay.trim(),
            slots: [
              {
                startTime: startTimeString,
                endTime: endTimeString,
                activity: newActivity.trim(),
              },
            ],
          },
        ]);
      }

      setNewStartTime('');
      setNewEndTime('');
      setNewActivity('');
    }
  };



  const confirmTimetable = () => {
    if (timetable.length > 0) {
      const isTimetableComplete = timetable.every((day) => day.slots.length > 0);

      if (isTimetableComplete) {
        setTimetable((prevTimetable) =>
          prevTimetable.map((day) => ({ ...day, confirmed: true }))
        );
        toggleModal();
      } else {
        Alert.alert('Error', 'Please add at least one slot for each day before confirming.');
      }
    } else {
      Alert.alert('Error', 'Please add at least one slot before confirming.');
    }
  };


  const renderTimetable = () => {
    return (
      <View style={styles.timetableContainer}>
        <Text style={styles.timetableHeader}>Time Table</Text>
        {timetable.map((day, index) => (
          <View key={index} style={styles.timetableDayContainer}>
            <Text style={styles.timetableDay}>{day.day}</Text>
            <View style={styles.timetableSlotsContainer}>
              {day.slots.map((slot, slotIndex) => (
                <View key={slotIndex} style={styles.timetableSlot}>
                  <Text>{`${slot.startTime} - ${slot.endTime}: ${slot.activity}`}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
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
        {
          user.loginType !== 'Principal' ?
            <ModalDropdown
              options={['VESP', 'VESIT', 'VESIM', 'VEPS']}
              onSelect={(index, value) => setInstitute(value)}
              value={institute}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownTextStyle}
            >
            </ModalDropdown> :
            null
        }
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
        {renderTimetable()}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add Time Slot</Text>

            <ModalDropdown
              options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
              onSelect={(index, value) => setSelectedDay(value)}
              value={selectedDay}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownTextStyle}
            >
            </ModalDropdown>

            <TextInput
              value={newStartTime}
              onChangeText={(text) => setNewStartTime(text)}
              placeholder="Start Time (HH:MM AM/PM)"
              style={styles.input}
            />
            <TextInput
              value={newEndTime}
              onChangeText={(text) => setNewEndTime(text)}
              placeholder="End Time (HH:MM AM/PM)"
              style={styles.input}
            />
            <TextInput
              value={newActivity}
              onChangeText={(text) => setNewActivity(text)}
              placeholder="Activity/Subject"
              style={styles.input}
            />

            {renderTimetable()}
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
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetForm} style={styles.resetButton}>
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
