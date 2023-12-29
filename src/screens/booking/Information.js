import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Linking,
  Modal,
  FlatList,
  Button
} from 'react-native';
import styles from './Information.style';
import Swiper from 'react-native-swiper';
import * as COLORS from '../../utils/color';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment, { duration } from 'moment';
import 'moment-timezone';
import { useAppSelector } from '../../../store/hook';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/header/loading';

const Information = ({ route }) => {

  const user = useAppSelector(state => state.profile.data);
  const { data } = route.params || null;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [booking, setBooking] = useState({});
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(false);


  const generateTimeSlots = (startTime, endTime, duration) => {
    const slots = [];
    const format = 'h:mm A';
    const start = moment(startTime, 'h:mm A');
    const end = moment(endTime, 'h:mm A');
    const timeSlotDuration = moment.duration(duration, 'minutes');

    let slotStart = start.clone();
    while (slotStart.isBefore(end)) {
      const slotEnd = slotStart.clone().add(timeSlotDuration);
      if (slotEnd.isAfter(end)) {
        break;
      }

      slots.push({
        start: slotStart.format(format),
        end: slotEnd.format(format),
      });
      slotStart = slotEnd;
    }
    return slots;
  };


  const generateTime = (time, date) => {
    if (!time) {
      console.error('Invalid time:', time);
      return null;
    }

    // Parse the time in "h:mm A" format using moment.js
    const parsedTime = moment(time, 'h:mm A');

    if (!parsedTime.isValid()) {
      console.error('Invalid time format:', time);
      return null;
    }

    // Create a new date with the given date and time
    const currentDate = moment(date)
      .hours(parsedTime.hours())
      .minutes(parsedTime.minutes())
      .seconds(0);

    return firestore.Timestamp.fromDate(currentDate.toDate());
  };


  useEffect(() => {
    const start = new Date();
    start.setHours(9);
    start.setMinutes(0);
    const end = new Date();
    end.setHours(16);
    end.setMinutes(0);
    const duration = 60;
    const slots = generateTimeSlots(start, end, duration);
    setTimeSlots(slots);
  }, []);


  const onDayPress = (day) => {
    const date = day.dateString;
    const updatedDates = { ...selectedDates };
    if (updatedDates[date]) {
      delete updatedDates[date];
    } else {
      updatedDates[date] = { selected: true };
    }
    setSelectedDates(updatedDates);
  };


  const check = () => {
    if (data.bookings[0].bookedBy !== "") {
      Alert.alert("Its Already Booked!!");
    } else {
      Alert.alert("You may proceed!!");
    }
  };

  const startTimeHandler = () => {
    setIsStartTimeSelected(false)
    setStartTimePickerVisible(true)
  }

  const endTimeHandler = () => {
    setIsEndTimeSelected(false);
    setEndTimePickerVisible(true)
  }


  const selectedDateObjects = Object.keys(selectedDates).map((dateString) => new Date(dateString));

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  const bookRequest = async () => {
    try {
      setLoading(true);
      const collectionRef = firestore().collection("Booking");
      const documentRef = collectionRef.doc(data.id);

      const doc = await documentRef.get();

      if (doc.exists) {
        const bookingData = doc.data();
        setDocuments(bookingData);

        const newBookings = [];
        selectedDateObjects.forEach((date) => {
          selectedItems.forEach((timeSlot) => {
            const formattedStartTime = `${timeSlot.start}:00`;
            const formattedEndTime = `${timeSlot.end}:00`;

            newBookings.push({
              bookedBy: user.email,
              date: date,
              time: {
                startTime: generateTime(formattedStartTime, date),
                endTime: generateTime(formattedEndTime, date),
              }
            });
          });
        });

        const conflicts = newBookings.filter((newBooking) => {
          return bookingData.bookings.some((existingBooking) => {
            const existingStartTime = existingBooking.time.startTime;
            const existingEndTime = existingBooking.time.endTime;
            const newStartTime = newBooking.time.startTime;
            const newEndTime = newBooking.time.endTime;

            return (
              newStartTime < existingEndTime && newEndTime > existingStartTime
            );
          });
        });

        if (conflicts.length === 0) {
          const updatedBookings = [...bookingData.bookings, ...newBookings];
          const updatedBookingData = {
            ...bookingData,
            bookings: updatedBookings,
          };

          await documentRef.set(updatedBookingData);
          Alert.alert("Booking Successful");

        } else {
          Alert.alert("Booking conflicts found. Please choose a different time slot.");
        }
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error('Error fetching and updating booking data from Firestore:', error);
    }
    setLoading(false)
  };



  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleItemSelection(item)}
      style={[styles.timeSlot,{backgroundColor: selectedItems.includes(item) ? 'lightblue' : 'white',}]}        
    >
      <Text>{item.start} - {item.end}</Text>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.mainview}>
      <View style={styles.headingview}>
        <Text style={styles.heading}>About Venue</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.venueImage}>
            <Swiper style={styles.wrapper} loop autoplay activeDotColor={COLORS.white}>
              {data.images.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
              ))}
            </Swiper>
          </View>
        </View>
        <View style={styles.venueDetails}>
          <Text style={styles.venueTitle}>{data.name}</Text>
          <TouchableOpacity onPress={() => { Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.location}`) }}>
            <Text style={styles.venueLocation}>Location: {data.institute}</Text>
          </TouchableOpacity>
          <Text style={styles.venueDescription}>{data.desc}</Text>
          <View style={styles.qtyContainer}></View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => { setModalVisible(true) }}>
            <Text style={styles.buttonText}>BOOK</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType='slide'
            transparent={false}
            onRequestClose={() => setModalVisible(false)}
          >
            {!loading&&(
              <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Ionicons name={'arrow-back-circle-outline'} size={25} color={COLORS.white} />
                </TouchableOpacity>
                <View style={styles.modalHeaderTextContainer}>
                  <Text style={styles.modalHeaderText}>Booking Information</Text>
                </View>
              </View>
              <ScrollView>
                <View style={styles.inner}>
                  <Text style={styles.selectText}>Select Date</Text>
                  <Calendar
                    markedDates={selectedDates}
                    onDayPress={onDayPress}
                  />
                  <Text style={styles.selectText}>Select your Time Slots</Text>
                  <FlatList
                    data={timeSlots}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                  />
                  <TouchableOpacity onPress={bookRequest} style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Book</Text>
                    </TouchableOpacity>
                  {/* <TouchableOpacity onPress={startTimeHandler} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Select Start Time</Text>
                </TouchableOpacity>
                {isStartTimePickerVisible && (
                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    display="default"
                    onChange={handleStartTimeConfirm}
                    onCancel={() => setStartTimePickerVisible(false)}
                  />
                )} */}

                  {/* <TouchableOpacity onPress={endTimeHandler} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Select End Time</Text>
                </TouchableOpacity>
                {isEndTimePickerVisible && (
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    display="default"
                    onChange={handleEndTimeConfirm}
                    onCancel={() => setEndTimePickerVisible(false)}
                  />
                )} */}

                  <View style={{ flexDirection: 'row' }}>
                    {selectedDateObjects.length > 0 && (
                      <View style={styles.table}>
                        <View style={styles.tableHeading}>
                          <Text>Selected Dates:</Text>
                        </View>
                        {selectedDateObjects.map((date) => (
                          <Text style={styles.rows} key={date}>
                            {date.toLocaleDateString()}
                          </Text>
                        ))}
                      </View>
                    )}
                    {selectedItems.length > 0 && (
                      <View style={styles.table}>
                        <View style={styles.tableHeading}>
                          <Text>Time:</Text>
                        </View>
                        {selectedItems.map((time) => (
                          <Text style={styles.rows} key={time.start}>
                            {time.start} - {time.end}
                          </Text>
                        ))}
                 </View>
                    )}
                    
                  </View>
                </View>
              </ScrollView>
            </View>
            )}
            {loading && (
                    <Loading/>
                  )}
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

export default Information;
