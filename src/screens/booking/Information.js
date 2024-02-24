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
import axios from 'axios';
import { ip } from '../../utils/constant';

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
  const [selectedDateObjects, setSelectedDateObjects] = useState([]);
  const [disabledTimeSlots, setDisabledTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(false);
  const [isFullDaySelected, setIsFullDaySelected] = useState(false);

  const generateTimeSlots = (startTime, endTime, duration) => {
    const slots = [];
    const format = 'h:mm A';
    const start = moment(startTime, format);
    const end = moment(endTime, format);
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

  const bookFullDay = async () => {
    try {
      if (!selectedDate) {
        Alert.alert('Error', 'Please select a date before booking full day.');
        return;
      }

      setLoading(true);

      const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
      const fullDayTimeSlot = {
        start: '00:00:00',
        end: '23:00:00',
      };

      const response = await axios.post(`http://${ip}:3000/api/booking/bookRequest/${data._id}`, {
        selectedDates: { [formattedSelectedDate]: { selected: true } },
        selectedItems: [fullDayTimeSlot],
        user: { email: user.email },
        bookingId: generateId(),
        institute: user.institute,
        bookingInstitute: data.institute
      });

      if (response.data.message) {
        Alert.alert("Success", 'Request Sent to your Principal');
        setSelectedDates([]);
        setSelectedItems([]);
        setSelectedDate(null);
      } else if (response.data.error) {
        Alert.alert('Booking conflicts found. Please choose a different time slot.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };


  const generateId = () => {
    const newId = uuidv4();
    return newId;
  };

  const fetchBookingsForDate = async (date) => {
    try {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const response = await axios.get(`http://${ip}:3000/api/booking/bookingsForDate/${data._id}/${formattedDate}`);
      const fetchedBookings = response.data;
      return fetchedBookings;
    } catch (error) {
      console.error(`Error fetching bookings for date ${date}:`, error);
      return [];
    }
  };

  const onDayPress = async (day) => {
    const clickedDate = day.dateString;

    if (selectedDate === clickedDate) {
      resetModalState();
    } else {
      try {
        const bookingsForDate = await fetchBookingsForDate(clickedDate);

        setSelectedDate(clickedDate);
        const updatedDates = {
          [clickedDate]: { selected: true },
        };
        setSelectedDates(updatedDates);

        const updatedDateObjects = Object.keys(updatedDates).map((dateString) => new Date(dateString));
        setSelectedDateObjects(updatedDateObjects);

        const bookedTimeSlots = bookingsForDate.length > 0 ? bookingsForDate[0].bookings : [];

        const updatedTimeSlots = generateTimeSlots(
          moment().startOf('day'),
          moment().endOf('day'),
          60
        );
        const hasTimetable = data && data.timetable && data.timetable.length > 0 && isVenueTimetableAvailable(moment(clickedDate).format('dddd'));

        const disabledSlots = hasTimetable
          ? disableTimeSlotsBasedOnTimetable(clickedDate, updatedTimeSlots)
          : updatedTimeSlots.map((timeSlot) => ({ ...timeSlot, isInTimeTable: false }));

        setTimeSlots(disabledSlots);

        const finalTimeSlots = disabledSlots.map((timeSlot) => {
          let isTimeSlotAvailable = true;

          if (bookedTimeSlots.length > 0) {
            isTimeSlotAvailable = !bookedTimeSlots.some((bookedSlot) => {
              const bookedStartTime = new Date(bookedSlot.time.startTime);
              const bookedEndTime = new Date(bookedSlot.time.endTime);

              if (bookedStartTime && bookedEndTime) {
                const formattedTimeSlot = {
                  start: moment(`${clickedDate} ${timeSlot.start}`, 'YYYY-MM-DD h:mm A').toDate(),
                  end: moment(`${clickedDate} ${timeSlot.end}`, 'YYYY-MM-DD h:mm A').toDate(),
                };

                return (
                  (formattedTimeSlot.start >= bookedStartTime && formattedTimeSlot.start < bookedEndTime) ||
                  (formattedTimeSlot.end > bookedStartTime && formattedTimeSlot.end <= bookedEndTime) ||
                  (formattedTimeSlot.start <= bookedStartTime && formattedTimeSlot.end >= bookedEndTime)
                );
              }
              return false;
            });
          }

          return {
            ...timeSlot,
            isAvailable: isTimeSlotAvailable,
          };
        });

        setTimeSlots(finalTimeSlots);
      } catch (error) {
        console.error('Error in onDayPress:', error);
      }
    }
  };

  const isVenueTimetableAvailable = (selectedDay) => {
    const timetableForDay = data.timetable.find((entry) => entry.day.toLowerCase() === selectedDay.toLowerCase());
    return !!timetableForDay;
  };

  const disableTimeSlotsBasedOnTimetable = (selectedDate, timeSlots) => {
    const selectedDay = moment(selectedDate).format('dddd').toLowerCase();

    if (!data || !data.timetable || !data.timetable.length) {
      return timeSlots.map((timeSlot) => ({
        ...timeSlot,
        isInTimeTable: false,
      }));
    }

    const timetableForDay = data.timetable.find((entry) => entry.day.toLowerCase() === selectedDay);

    if (!timetableForDay) {
      return timeSlots.map((timeSlot) => ({
        ...timeSlot,
        isInTimeTable: false,
      }));
    }

    const timetableSlots = timetableForDay.slots || [];

    return timeSlots.map((timeSlot) => {
      const slotStart = moment(`${selectedDate} ${timeSlot.start}`, 'YYYY-MM-DD h:mm A');
      const slotEnd = moment(`${selectedDate} ${timeSlot.end}`, 'YYYY-MM-DD h:mm A');
      const isOverlapping = timetableSlots.some((timetableSlot) => {
        const timetableSlotStart = moment(`${selectedDate} ${timetableSlot.startTime}`, 'YYYY-MM-DD h:mm A');
        const timetableSlotEnd = moment(`${selectedDate} ${timetableSlot.endTime}`, 'YYYY-MM-DD h:mm A');
        return (
          (slotStart.isSameOrBefore(timetableSlotStart) && slotEnd.isAfter(timetableSlotStart)) ||
          (slotStart.isSameOrAfter(timetableSlotStart) && slotStart.isBefore(timetableSlotEnd))
        );
      });

      return {
        ...timeSlot,
        isInTimeTable: isOverlapping,
      };
    });
  };

  useEffect(() => {
    const start = moment().startOf('day');
    const end = moment().endOf('day');
    const duration = 60;
    const slots = generateTimeSlots(start, end, duration);
    setTimeSlots(slots);
  }, []);

  useEffect(() => {
    const start = moment().startOf('day');
    const end = moment().endOf('day');
    const duration = 60;
    const updatedTimeSlots = generateTimeSlots(start, end, duration);

    updatedTimeSlots.forEach((timeSlot, index, array) => {
      const isAvailable = isTimeSlotAvailable(timeSlot);
      timeSlot.isAvailable = isAvailable;

      if (index > 0 && !array[index - 1].isAvailable && isAdjacentSlotDisabled(array[index - 1], timeSlot)) {
        timeSlot.isAvailable = false;
      }

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

      const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
      const formattedSelectedItems = selectedItems.map(item => ({
        start: moment(`${formattedSelectedDate} ${item.start}`, 'YYYY-MM-DD h:mm A').format('HH:mm:ss'),
        end: moment(`${formattedSelectedDate} ${item.end}`, 'YYYY-MM-DD h:mm A').format('HH:mm:ss'),
      }));


      const response = await axios.post(`http://${ip}:3000/api/booking/bookRequest/${data._id}`, {
        selectedDates: { [formattedSelectedDate]: { selected: true } },
        selectedItems: formattedSelectedItems,
        user: { email: user.email },
        bookingId: generateId(),
        userInstitute: user.institute,
        bookingInstitute: data.institute,
      });



      if (response.data.message) {
        Alert.alert('Success', "Approval Request Sent to your Principal Successfully");
        setSelectedDates([]);
        setSelectedItems([]);
        setSelectedDate(null);
      } else if (response.data.error) {
        Alert.alert('Booking conflicts found. Please choose a different time slot.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };


  const isTimeSlotAvailable = (timeSlot) => {
    const selectedDate = Object.keys(selectedDates)[0];
    if (!selectedDate) {
      return false;
    }

    const selectedStartTime = new Date(`${selectedDate} ${timeSlot.start}`);
    const selectedEndTime = new Date(`${selectedDate} ${timeSlot.end}`);

    const existingBookings = documents?.bookings || [];

    return !existingBookings.some((booking) => {
      if (booking.time && booking.time.startTime && booking.time.endTime) {
        const bookingStartTime = moment(booking.time.startTime.toDate());
        const bookingEndTime = moment(booking.time.endTime.toDate());

        const isOverlap = (
          selectedStartTime < bookingEndTime &&
          selectedEndTime > bookingStartTime
        );

        const isAdjacent = (
          selectedEndTime.getTime() === bookingStartTime.getTime() ||
          selectedStartTime.getTime() === bookingEndTime.getTime()
        );

        return isOverlap || isAdjacent;
      } else {
        return false;
      }
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
    const isAvailable = item.isAvailable;
    const isSelected = selectedItems.includes(item);
    const isBooked = item.isBooked;
    const isInTimeTable = item.isInTimeTable;
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
            opacity: isAvailable && !isInTimeTable ? 1 : 0.5,
            borderColor: isBooked ? 'red' : 'black',
          },
        ]}
        disabled={isInTimeTable || !isAvailable}
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
          {data.facilities ?
            <View style={styles.qtyContainer}>
              <Text>Faciltites:</Text>
              {data.facilities.map((facility, index) => (
                <View key={index}>
                  <Text>{`${index + 1}) ${facility}`}</Text>
                </View>
              ))}
            </View>
            : null}
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
                      maxDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
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
                    <TouchableOpacity
                      onPress={bookFullDay}
                      style={styles.fullButtonContainer}
                      disabled={selectedItems.length > 0 ? true : false}
                    >
                      <Text style={styles.buttonText}>Book Full Day</Text>
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