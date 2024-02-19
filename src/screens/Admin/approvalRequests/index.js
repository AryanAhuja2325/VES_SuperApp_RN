import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios, { all } from 'axios';
import { ip } from '../../../utils/constant';
import { useAppSelector } from '../../../../store/hook';
import styles from './approvalRequest.styles';

const HorizontalLine = () => {
    return <View style={styles.line} />;
};

const ApproveRequest = () => {
    const [currentRequests, setCurrentRequests] = useState([]);
    const [previousRequests, setPreviousRequests] = useState([]);
    const [userNames, setUserNames] = useState({});
    const user = useAppSelector((state) => state.profile.data);

    const fetchBookingRequests = async () => {
        try {
            const response = await axios.get(`http://${ip}:3000/api/booking/approvalRequests/${user.institute}`);
            const allRequests = response.data;

            const current = [];
            const previous = [];

            allRequests.forEach((venue) => {
                venue.bookings.forEach((booking) => {
                    if (booking.status === 'Pending') {
                        current.push({ ...venue, bookings: [booking] });
                    } else {
                        previous.push({ ...venue, bookings: [booking] });
                    }
                });
            });

            setCurrentRequests(current);
            setPreviousRequests(previous);
        } catch (error) {
            console.error('Error fetching booking requests:', error.message);
            console.log(error.info);
        }
    };



    const approveBookingRequest = async (bookingId, targetBookingId) => {
        try {
            const response = await axios.post(`http://${ip}:3000/api/booking/approveBooking/${bookingId}`, {
                bookingId: targetBookingId,
            });
            Alert.alert('Success', response.data.message);
            fetchBookingRequests();
        } catch (error) {
            console.error('Error approving booking:', error.message);
        }
    };

    const rejectBookingRequest = async (bookingId, targetBookingId) => {
        try {
            const response = await axios.post(`http://${ip}:3000/api/booking/rejectBooking/${bookingId}`, {
                bookingId: targetBookingId,
            });
            Alert.alert('Success', response.data.message);
            fetchBookingRequests();
        } catch (error) {
            console.error('Error rejecting booking:', error.message);
        }
    };

    useEffect(() => {
        fetchBookingRequests();
    }, []);

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const getUser = async (email) => {
        try {
            const response = await axios.post(`http://${ip}:3000/api/login/getUserByEmail`, { email });
            const user = response.data.user;

            if (user && user.firstName && user.lastName) {
                const name = `${user.firstName} ${user.lastName}`;
                return name;
            } else {
                console.error('Invalid user data received:', user);
                return 'N/A';
            }
        } catch (error) {
            console.error('Error fetching user:', error.message);
            return 'N/A';
        }
    };


    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const allBookings = [...previousRequests, ...currentRequests];
                const uniqueUserEmails = new Set(allBookings.flatMap((booking) => booking.bookings.map((individual) => individual.bookedBy)));

                const userPromises = Array.from(uniqueUserEmails).map(async (email) => {
                    const name = await getUser(email);
                    return { [email]: name };
                });

                const userResults = await Promise.all(userPromises);
                const mergedUserNames = Object.assign({}, ...userResults);

                setUserNames(mergedUserNames);
            } catch (error) {
                console.error('Error fetching user names:', error);
            }
        };

        fetchUserNames();
    }, [previousRequests, currentRequests]);

    const renderBookingRequest = ({ item }) => (
        <View style={styles.bookingItem}>
            {item.bookings.map((booking) => (
                <View key={booking.bookingId} style={styles.bookingCard}>
                    <Text style={styles.venueText}>Venue: {item.name}</Text>
                    <Text style={styles.bookingDetailText}>Booking ID: {booking.bookingId}</Text>
                    <Text style={styles.bookingDetailText}>Date: {new Date(booking.date).toDateString()}</Text>
                    <Text style={styles.bookingDetailText}>Booked By: {userNames[booking.bookedBy]}</Text>
                    <Text style={styles.bookingDetailText}>Time: {`${new Date(booking.time.startTime).toLocaleString('en-US', timeOptions)} - ${new Date(booking.time.endTime).toLocaleString('en-US', timeOptions)}`}</Text>
                    <Text style={styles.bookingDetailText}>Status: {booking.status}</Text>

                    {booking.status === 'Pending' && (
                        <View style={styles.actionButtonsContainer}>
                            <TouchableOpacity onPress={() => approveBookingRequest(item._id, booking.bookingId)}>
                                <Text style={styles.approveButton}>Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => rejectBookingRequest(item._id, booking.bookingId)}>
                                <Text style={styles.rejectButton}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );


    return (
        <ScrollView>
            <Text style={styles.header}>Current Requests</Text>
            {
                currentRequests.length > 0 ?
                    <FlatList
                        data={currentRequests}
                        keyExtractor={(item) => item.bookingId}
                        renderItem={renderBookingRequest}
                    />
                    :
                    <Text style={styles.noRequestsText}>No Current Requests Found</Text>
            }
            <HorizontalLine />
            <Text style={styles.header}>Previous Requests</Text>
            {
                previousRequests.length > 0 ?
                    <FlatList
                        data={previousRequests}
                        keyExtractor={(item) => item.bookingId}
                        renderItem={renderBookingRequest}
                    />
                    :
                    <Text style={styles.noRequestsText}>No Previous Requests Found</Text>
            }
        </ScrollView>
    );
};

export default ApproveRequest;
