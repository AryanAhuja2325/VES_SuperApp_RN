import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';
import styles from './previous.styles';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const Previous = ({ route }) => {
  const [documents, setDocuments] = useState([]);
  const [isElapsedExpanded, setIsElapsedExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useAppSelector((state) => state.profile.data);

  const fetchUserBookings = async () => {
    try {
      let response;
      if (user.loginType == 'Admin') {
        response = await axios.get(`http://192.168.56.1:3000/api/booking/allBookings`);
      }
      else {
        response = await axios.get(`http://192.168.56.1:3000/api/booking/userBookings/${user.email}`);
      }
      const fetchedUserBookings = response.data;

      fetchedUserBookings.forEach((booking) => {
        booking.bookings.sort((a, b) => a.date - b.date);
      });

      setDocuments(fetchedUserBookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error.message);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [user.email]);

  const deleteBooking = async (documentId, bookingToDelete) => {
    try {
      Alert.alert(
        'Cancel Booking',
        'Are you sure you want to cancel this booking?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const response = await axios.post(`http://192.168.56.1:3000/api/booking/cancelBooking/${documentId}`, bookingToDelete);
              if (response.status == 200) {
                Alert.alert("Success", "Booking cancelled successfully");
                fetchUserBookings();
              }
              else if (status == 400) {
                Alert.alert("Error", "Cannot cancel booking made more that 2 days ago");
              }
              else {
                Alert.alert("Network Error", "Please try again")
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const currentDate = new Date();
  const toggleElapsedExpand = () => {
    setIsElapsedExpanded(!isElapsedExpanded);
  };

  const handleSearch = () => {
    const filteredDocuments = documents.map((booking) => {
      return {
        ...booking,
        bookings: booking.bookings.filter((individual) => {
          const bookingIdLowerCase = individual.bookingId
            ? individual.bookingId.toLowerCase()
            : '';
          const searchQueryLowerCase = searchQuery.toLowerCase();
          return (
            bookingIdLowerCase.includes(searchQueryLowerCase) ||
            individual.bookingId.includes(searchQuery)
          );
        }),
      };
    });

    setDocuments(filteredDocuments);
  };

  const handleTextChange = (text) => {
    setSearchQuery(text);
    if (!text) {
      fetchUserBookings();
    } else {
      handleSearch();
    }
  };

  return (
    <ScrollView style={{ margin: 1 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Booking ID"
        value={searchQuery}
        onChangeText={(text) => {
          handleTextChange(text);
        }}
      />

      {documents.length === 0 ? (
        <View style={styles.noBookingsContainer}>
          <Text style={styles.noBookingsText}>No bookings found</Text>
        </View>
      ) : (
        documents.map((booking) => (
          booking.bookings.map((individual) => (
            <View key={individual.id}>
              {individual.date && currentDate < new Date(individual.date) && (
                <View key={individual.id} style={styles.card}>
                  <LinearGradient
                    colors={['#EFBF38', '#F5DE7A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ ...styles.gradient }}
                  >
                    <View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Booked By: </Text>
                        <Text style={styles.record}>
                          {user.firstName} {user.lastName}
                        </Text>
                        <TouchableOpacity
                          style={styles.icon}
                          onPress={() => deleteBooking(booking._id, individual)}
                        >
                          <Icons name="delete" size={25} color="black" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Venue: </Text>
                        <Text style={styles.record}>{booking.name}</Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Date: </Text>
                        <Text style={styles.record}>
                          {individual.date
                            ? new Date(individual.date).toLocaleString(
                              'en-US',
                              dateOptions
                            )
                            : 'N/A'}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Time: </Text>
                        <Text style={[styles.record, { color: '#228B22' }]}>
                          {individual.time &&
                            individual.time.startTime &&
                            individual.time.endTime ? (
                            new Date(individual.time.startTime).toLocaleString('en-US', timeOptions) == '12:00 AM' &&
                              new Date(individual.time.endTime).toLocaleString('en-US', timeOptions) == '11:00 PM' ? (
                              'Full Day'
                            ) : (
                              <>
                                {new Date(
                                  individual.time.startTime
                                ).toLocaleString('en-US', timeOptions)}-{' '}
                                {new Date(
                                  individual.time.endTime
                                ).toLocaleString('en-US', timeOptions)}
                              </>
                            )
                          ) : (
                            'N/A'
                          )}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Booking Id: </Text>
                        <Text style={styles.record}>{individual.bookingId}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              )}
            </View>
          ))
        ))
      )}

      <HorizontalLine />
      <TouchableOpacity onPress={toggleElapsedExpand}>
        <View style={styles.container}>
          <Text style={styles.header}>Elapsed</Text>
          <Text style={styles.header}>{isElapsedExpanded ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>

      {isElapsedExpanded && documents.length > 0 && (
        documents.map((booking) => (
          booking.bookings.map((individual) => (
            <View key={individual.id}>
              {individual.date &&
                currentDate >= new Date(individual.date) && (
                  <View key={individual.id} style={styles.card}>
                    <LinearGradient
                      colors={['#DDDDDD', '#CCCCCC']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ ...styles.gradient }}
                    >
                      <View>
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>Booked By: </Text>
                          <Text style={styles.record}>
                            {user.firstName} {user.lastName}
                          </Text>
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>Venue: </Text>
                          <Text style={styles.record}>{booking.name}</Text>
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>Date: </Text>
                          <Text style={styles.record}>
                            {individual.date
                              ? new Date(individual.date).toLocaleString(
                                'en-US',
                                dateOptions
                              )
                              : 'N/A'}
                          </Text>
                        </View>
                        {/* <View style={styles.textContainer}>
                          <Text style={styles.text}>Time: </Text>
                          <Text style={[styles.record, { color: '#228B22' }]}>
                            {individual.time && individual.time.startTime
                              ? new Date(
                                individual.time.startTime
                              ).toLocaleString('en-US', timeOptions)
                              : 'N/A'}-{' '}
                            {individual.time && individual.time.endTime
                              ? new Date(
                                individual.time.endTime
                              ).toLocaleString('en-US', timeOptions)
                              : 'N/A'}
                          </Text>
                        </View> */}
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>Time: </Text>
                          <Text style={[styles.record, { color: '#228B22' }]}>
                            {individual.time &&
                              individual.time.startTime &&
                              individual.time.endTime ? (
                              new Date(individual.time.startTime.toLocaleString('en-US', timeOptions)) === '12:00 AM' &&
                                new Date(individual.time.endTime.toLocaleString('en-US', timeOptions)) === '11:00 PM' ? (
                                'Full Day'
                              ) : (
                                <>
                                  {new Date(
                                    individual.time.startTime
                                  ).toLocaleString('en-US', timeOptions)}-{' '}
                                  {new Date(
                                    individual.time.endTime
                                  ).toLocaleString('en-US', timeOptions)}
                                </>
                              )
                            ) : (
                              'N/A'
                            )}
                          </Text>
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>Booking Id: </Text>
                          <Text style={styles.record}>
                            {individual.bookingId}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                )}
            </View>
          ))
        ))
      )}
    </ScrollView>
  );

};

export default Previous;