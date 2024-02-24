import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { useAppSelector } from '../../store/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Home.styles';
import { red, white, black, gray, maroon } from '../utils/color';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
// import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { request, PERMISSIONS } from '@react-native-permissions/permissions';
import axios from 'axios';
import { ip } from '../utils/constant';

const Card = ({ title, showDot, count }) => {
  return (
    <View style={styles.outercard}>
      <View style={styles.card1}>
        <Text style={styles.title}>{title}</Text>
        {showDot && (
          <View style={styles.dot}>
          </View>
        )}
      </View>
    </View>
  );
};

const Home = ({ navigation }) => {
  const user = useAppSelector(state => state.profile.data);
  const data = useAppSelector(state => state.profile.modules);
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDetail, setEventDetail] = useState('');
  const [confirmRequests, setConfirmRequests] = useState([]);
  const [approveRequests, setApproveRequests] = useState([]);

  useEffect(() => {
    getEvent();
    fetchBookingRequests();
  }, []);

  const fetchBookingRequests = async () => {
    try {
      const responseConfirm = await axios.get(`http://${ip}:3000/api/booking/confirmationRequests/${user.institute}`);
      const responseApprove = await axios.get(`http://${ip}:3000/api/booking/approvalRequests/${user.institute}`);

      const confirmRequests = responseConfirm.data.filter((item) => item.bookings.some((booking) => booking.status === 'Approved'));
      const approveRequests = responseApprove.data.filter((item) => item.bookings.some((booking) => booking.status === 'Pending'));

      console.log(confirmRequests)
      console.log(approveRequests)
      setConfirmRequests(confirmRequests);
      setApproveRequests(approveRequests);
    } catch (error) {
      console.error('Error fetching booking requests:', error.message);
    }
  };


  const renderCard = ({ item }) => {
    let showDot = false;
    let dotCount = 0;

    switch (item.title) {
      case 'Approve Requests':
        dotCount = approveRequests.reduce((acc, venue) => acc + venue.bookings.length, 0);
        showDot = dotCount > 0;
        break;
      case 'Confirm Requests':
        dotCount = confirmRequests.reduce((acc, venue) => acc + venue.bookings.length, 0);
        showDot = dotCount > 0;
        break;
      default:
        break;
    }

    const navigateToScreen = () => {
      switch (item.title) {
        case 'Attendance':
          if (user.loginType === 'Teacher') {
            navigation.navigate('Attendance');
          } else if (user.loginType === 'Student') {
            navigation.navigate('StudentAttendance');
          }
          break;
        case 'Events Update':
          navigation.navigate('EventUpdate');
          break;
        case 'About Us':
          navigation.navigate('AboutUs');
          break;
        case 'Enquiry Management':
          navigation.navigate('Queries/Feedback');
          break;
        case 'Faculty Load':
          navigation.navigate('Facultyload');
          break;
        case 'Stationary Supply Hub':
          navigation.navigate('Stationary');
          break;
        case 'Alumni and Mentorship':
          navigation.navigate('Alumni');
          break;
        case 'Fees':
          navigation.navigate('Fees');
          break;
        case 'Holiday Calender':
          navigation.navigate('Calendar');
          break;
        case 'FAQs':
          navigation.navigate('FAQ');
          break;
        case 'Fitness And Health':
          navigation.navigate('FitnessAndHealth');
          break;
        case 'Digital Academy':
          navigation.navigate('DigitalAcademy');
          break;
        case 'Photo Gallery':
          navigation.navigate('PhotoGallery');
          break;
        case 'Placement':
          navigation.navigate('Placement');
          break;
        case 'Blog':
          navigation.navigate('Blog');
          break;
        case 'Chat':
          navigation.navigate('Chat');
          break;
        case 'Exam Schedule':
          navigation.navigate('Exam');
          break;
        case 'Counselling':
          navigation.navigate('Counselling');
          break;
        case 'Booking':
          navigation.navigate('Booking');
          break;
        case 'Add Venue':
          navigation.navigate('Venue');
          break;
<<<<<<< HEAD
        case 'View Bookings':
          navigation.navigate('Previous Bookings');
          break;
        case 'Send Notification':
          navigation.navigate('Send Notification');
          break;
        case 'Campus Contact':
          navigation.navigate('Campus Contact')
          break;
        case 'View Orders':
          navigation.navigate('Orders');
          break;
        case 'Add Products':
          navigation.navigate('Add Products');
          break;
        case 'Approve Requests':
          navigation.navigate("Approve Requests")
          break;
        case 'Confirm Requests':
          navigation.navigate("Confirm Requests");
          break;
        case 'Resume Generator':
          navigation.navigate("Resume Generator");
          break;
=======
        case 'Resume Generator':
          navigation.navigate('Resume Generator');
          break;
          case 'Campus Contact':
            navigation.navigate('Campus Contact');
            break;
          case 'Assignment Dashboard':
            navigation.navigate('Assignment Dashboard')
            break;
>>>>>>> 7e48ce65d1f5c82a4bcbf9069192211c3c6615a4
        default:
          break;
      }
    };

    return (
      <TouchableOpacity onPress={navigateToScreen}>
        <Card title={item.title} showDot={showDot} />
      </TouchableOpacity>
    );
  };

  const getEvent = async () => {
    try {
      const response = await axios.get('http://' + ip + ':3000/api/eventupdate');

      const events = response.data;

      if (events.length > 0) {
        const latestEvent = events[0];

        setEventDetail(latestEvent.Detail);
        setEventName(latestEvent.Title);
        setEventDesc(latestEvent.Desc);
      } else {
        console.log('No events found');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#F4F4F4', flex: 1 }}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: responsiveHeight(1),
            height: responsiveHeight(7)
          }}>
          <Image
            source={require('../assets/imgs/user_profile.png')}
            style={{ height: responsiveHeight(7), width: responsiveWidth(14.5) }}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.greeting}>Hello {user.firstName},</Text>
          <Text style={styles.mail}>{user.email}</Text>
        </View>
      </View>

      <View
        style={{
          height: responsiveHeight(25),
          margin: responsiveWidth(2),
          borderRadius: 20,
          backgroundColor: maroon,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: white,
            height: responsiveHeight(23),
            borderRadius: 20,
            margin: 5,
          }}>
          <View
            style={{ margin: responsiveWidth(2), height: responsiveHeight(21) }}>
            <Text style={{ fontSize: 16, fontWeight: 900, color: white }}>
              Newsfeed/Upcoming Events
            </Text>
            <View style={{ borderWidth: 1, borderColor: white }}></View>
            <Text></Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EventUpdate');
              }}>
              <Text style={{ color: white, fontSize: 18 }}>{eventName}</Text>
              <Text
                style={{
                  color: white,
                  fontSize: 12,
                  textAlign: 'justify',
                }}>
                {eventDesc}
              </Text>
              <Text
                style={{
                  color: white,
                  fontSize: 12,
                  textAlign: 'justify',
                }}>
                {eventDetail}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SectionList
          sections={data}
          renderItem={renderCard}
          keyExtractor={(item, index) => item + index}
          contentContainerStyle={styles.contentContainer}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
