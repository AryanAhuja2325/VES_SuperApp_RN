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
} from 'react-native';
import styles from './Information.style';
import Swiper from 'react-native-swiper';
import * as COLORS from '../../utils/color';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useAppSelector } from '../../../store/hook';
import firestore from '@react-native-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import Loading from '../../components/header/loading';

const Information = ({ route }) => {
  const user = useAppSelector((state) => state.profile.data);
  const { data } = route.params || null;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [documents, setDocuments] = useState({});
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const [allBookingIds, setAllBookingIds] = useState([]);
  const [selectedDateObjects, setSelectedDateObjects] = useState([]);
  const [disabledTimeSlots, setDisabledTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null)
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

  const resetModalState = () => {
    setSelectedDates({});
    setSelectedItems([]);
    setTimeSlots([]);
    setDisabledTimeSlots([]);
    setSelectedDateObjects([]);
    setSelectedDate(null);
  };


  const generateId = () => {
    const newId = uuidv4();
    return newId;
  };

  const fetchBookingsForDate = async (date) => {
    try {
      const snapshot = await firestore()
        .collection('Booking')
        .doc(data.id)
        .get();

      if (snapshot.exists) {
        const bookingData = snapshot.data();
        setDocuments(bookingData);

        const bookingsForDate = bookingData.bookings.filter(
          (booking) =>
            moment(booking.date.toDate()).isSame(moment(date), 'day')
        );

        return bookingsForDate;
      } else {
        console.log('Document not found.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
      return [];
    }
  };

  const onDayPress = async (day) => {
    const date = day.dateString;
    const bookingsForDate = await fetchBookingsForDate(date);

    setSelectedDate(date);
    const updatedDates = {
      [date]: { selected: true },
    };
    setSelectedDates(updatedDates);

    setSelectedDates(updatedDates);

    const updatedDateObjects = Object.keys(updatedDates).map((dateString) => new Date(dateString));
    setSelectedDateObjects(updatedDateObjects);

    const updatedTimeSlots = timeSlots.map((timeSlot, index, array) => {
      const isTimeSlotAvailable =
        !bookingsForDate.some((booking) => {
          const bookingStartTime = moment(booking.time.startTime.toDate());
          const bookingEndTime = moment(booking.time.endTime.toDate());

          const selectedStartTime = moment(
            `${date} ${timeSlot.start}`,
            'YYYY-MM-DD h:mm A'
          );
          const selectedEndTime = moment(
            `${date} ${timeSlot.end}`,
            'YYYY-MM-DD h:mm A'
          );

          return (
            selectedStartTime.isSame(bookingEndTime) &&
            selectedEndTime.isSame(bookingStartTime)
          );
        });

      if (index > 0 && array[index - 1].isBooked) {
        isTimeSlotAvailable = false;
      }

      return {
        ...timeSlot,
        isAvailable: isTimeSlotAvailable,
      };
    });

    setTimeSlots(updatedTimeSlots);
  };

  useEffect(() => {
    const start = moment().startOf('day');
    const end = moment().endOf('day');
    const duration = 60;
    const slots = generateTimeSlots(start, end, duration);
    setTimeSlots(slots);
  }, []);

  const generateTime = (time, date) => {
    const formattedTime = moment(`${date} ${time}`, 'YYYY-MM-DD h:mm A');
    return firestore.Timestamp.fromDate(formattedTime.toDate());
  };

  useEffect(() => {
    const start = moment().startOf('day');
    const end = moment().endOf('day');
    const duration = 60;
    const updatedTimeSlots = generateTimeSlots(start, end, duration);

    updatedTimeSlots.forEach((timeSlot, index, array) => {
      const isAvailable = isTimeSlotAvailable(timeSlot);
      timeSlot.isAvailable = isAvailable;

      // Check if the previous slot is booked and the current slot is adjacent
      if (index > 0 && !array[index - 1].isAvailable && isAdjacentSlotDisabled(array[index - 1], timeSlot)) {
        timeSlot.isAvailable = false;
      }

      // Check if the current slot is booked and the next slot is adjacent
      if (index < array.length - 1 && !array[index + 1].isAvailable && isAdjacentSlotDisabled(timeSlot, array[index + 1])) {
        array[index + 1].isAvailable = false;
      }
    });

    setTimeSlots(updatedTimeSlots);
  }, [selectedDates, documents]);

  const isAdjacentSlotDisabled = (prevSlot, currentSlot) => {
    const prevEndTime = moment(prevSlot.end, 'h:mm A');
    const currentStartTime = moment(currentSlot.start, 'h:mm A');

    return prevEndTime.isSame(currentStartTime);
  };

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

        const selectedDate = Object.keys(selectedDates)[0];

        const conflicts = selectedItems.some((timeSlot) => {
          const formattedStartTime = moment(`${selectedDate} ${timeSlot.start}`, 'YYYY-MM-DD h:mm A');
          const formattedEndTime = moment(`${selectedDate} ${timeSlot.end}`, 'YYYY-MM-DD h:mm A');

          return bookingData.bookings.some((existingBooking) => {
            const existingStartTime = moment(existingBooking.time.startTime.toDate());
            const existingEndTime = moment(existingBooking.time.endTime.toDate());

            return (
              formattedStartTime.isBefore(existingEndTime) && formattedEndTime.isAfter(existingStartTime)
            );
          });
        });

        if (!conflicts) {
          const newBookings = await Promise.all(
            selectedItems.map(async (timeSlot) => {
              const formattedStartTime = moment(`${selectedDate} ${timeSlot.start}`, 'YYYY-MM-DD h:mm A');
              const formattedEndTime = moment(`${selectedDate} ${timeSlot.end}`, 'YYYY-MM-DD h:mm A');

              return {
                bookedBy: user.email,
                date: firestore.Timestamp.fromDate(new Date(selectedDate)),
                time: {
                  startTime: firestore.Timestamp.fromDate(formattedStartTime.toDate()),
                  endTime: firestore.Timestamp.fromDate(formattedEndTime.toDate()),
                },
                bookedOn: firestore.Timestamp.fromDate(new Date()),
                bookingId: await generateId(),
              };
            })
          );

          const updatedBookings = [...bookingData.bookings, ...newBookings];
          const updatedBookingData = {
            ...bookingData,
            bookings: updatedBookings,
          };

          await documentRef.set(updatedBookingData);
          Alert.alert('Booking Successful');
          setSelectedDates([]);
          setSelectedItems([]);
          setSelectedDate(null);

          const refreshedDoc = await documentRef.get();
          setDocuments(refreshedDoc.data());
        } else {
          Alert.alert(
            'Booking conflicts found. Please choose a different time slot.'
          );
        }
      }
    } catch (error) {
      console.error('Error fetching and updating booking data from Firestore:', error);
    }
    setLoading(false)
  };

  const doTimeSlotsOverlap = (slotA, slotB) => {
    const startA = moment(slotA.start, 'h:mm A');
    const endA = moment(slotA.end, 'h:mm A');
    const startB = moment(slotB.start, 'h:mm A');
    const endB = moment(slotB.end, 'h:mm A');

    return startA.isBefore(endB) && endA.isAfter(startB);
  };

  const areTimeSlotsAdjacent = (slotA, slotB) => {
    const endA = moment(slotA.end, 'h:mm A');
    const startB = moment(slotB.start, 'h:mm A');

    return endA.isSame(startB);
  };

  const isTimeSlotAvailable = (timeSlot) => {
    const selectedDate = Object.keys(selectedDates)[0];
    if (!selectedDate) {
      return false;
    }

    const selectedStartTime = moment(`${selectedDate} ${timeSlot.start}`, 'YYYY-MM-DD h:mm A');
    const selectedEndTime = moment(`${selectedDate} ${timeSlot.end}`, 'YYYY-MM-DD h:mm A');

    const existingBookings = documents?.bookings || [];

    return !existingBookings.some((booking) => {
      const bookingStartTime = moment(booking.time.startTime.toDate());
      const bookingEndTime = moment(booking.time.endTime.toDate());

      const isOverlap = doTimeSlotsOverlap(
        { start: selectedStartTime, end: selectedEndTime },
        { start: bookingStartTime, end: bookingEndTime }
      );

      const isAdjacent = areTimeSlotsAdjacent(
        { start: selectedStartTime, end: selectedEndTime },
        { start: bookingStartTime, end: bookingEndTime }
      );

      return isOverlap || isAdjacent;
    });
  };

  useEffect(() => {
    const start = moment().startOf('day');
    const end = moment().endOf('day');
    const duration = 60;
    const updatedTimeSlots = generateTimeSlots(start, end, duration);

    updatedTimeSlots.forEach((timeSlot) => {
      timeSlot.disabled = !isTimeSlotAvailable(timeSlot);
    });

    setTimeSlots(updatedTimeSlots);
  }, [selectedDates, documents]);

  const renderItem = ({ item }) => {
    const isAvailable = isTimeSlotAvailable(item);
    const isSelected = selectedItems.includes(item);

    return (
      <TouchableOpacity
        onPress={() => {
          if (isAvailable) {
            toggleItemSelection(item);
          }
        }}
        style={[
          styles.timeSlot,
          {
            backgroundColor: isSelected ? 'lightblue' : 'white',
            opacity: isAvailable ? 1 : 0.5,
          },
        ]}
        disabled={!isAvailable}
      >
        <Text>{item.start} - {item.end}</Text>
      </TouchableOpacity>
    );
  };

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
          <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.location}`)}>
            <Text style={styles.venueLocation}>Location: {data.institute}</Text>
          </TouchableOpacity>
          <Text style={styles.venueDescription}>{data.desc}</Text>
          <View style={styles.qtyContainer}></View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>BOOK</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType='slide'
            transparent={false}
            onRequestClose={() => {
              setModalVisible(false)
              resetModalState()
            }}
          >
            {!loading && (
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => { setModalVisible(false), resetModalState() }} style={styles.closeButton}>
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
                      onDayPress={onDayPress}
                      minDate={minDate}
                      disableAllTouchEventsForDisabledDays={true}
                      markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
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

                    <View style={{ flexDirection: 'row' }}>
                      {Object.keys(selectedDates).length > 0 && (
                        <View style={styles.table}>
                          <View style={styles.tableHeading}>
                            <Text>Selected Dates:</Text>
                          </View>
                          {Object.keys(selectedDates).map((date) => (
                            <Text style={styles.rows} key={date}>
                              {moment(date).format('YYYY-MM-DD')}
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
              <Loading />
            )}
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default Information;