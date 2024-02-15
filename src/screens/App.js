import React, { useEffect, useState } from 'react';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import EventUpdate from './EventUpdate/EventUpdate';
import Detail from './EventUpdate/Detail';
import AddEvent from './EventUpdate/AddEvent';
import CompletedEvent from './EventUpdate/CompletedEvent';
import AboutUs from './aboutus/AboutUs';
import Facultyload from './facultyload/Facultyload';
import Attendance from './attendance/Attendance';
import DailyAttendance from './attendance/DailyAttendance';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Alumni from './alumni/Alumni';
import Enquiry, { Feedback, Query } from './enquirymanagement/Enquirymanagement';
import StationarySupply from './stationarySupply/StationarySupply';
import Details from './stationarySupply/Details';
import Cart from './stationarySupply/Cart';
import Fees from './fees/Fees';
import Splash from './splash';
import AddJob from './placement/AddJob';
import JobDetails from './placement/JobDetails';
import Chat from './groupchat/chat';

import FAQ from './FAQs/faqs';
import Profile from './bottomTab/profile';
import Notifications from './bottomTab/notifications';
import ContactUs from './bottomTab/contactUs';
import Checkout from './stationarySupply/Checkout';
import Orders from './stationarySupply/Orders';
import CustomHeader from '../components/header';
import FitnessAndHealth from './fitnessandhealth/FitnessAndHealth';
import DigitalAcademy from './digitalAcademy/DigitalAcademy';
import DigitalAcademyDetail from './digitalAcademy/DigitalAcademyDetail';
import Placement from './placement/Placement';
import ImageGrid from './photoGallery';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { white } from '../utils/color';
import Calendar from './holidayCalendar/HolidayCalendar';
import Blog from './blog';
import { useAppSelector } from '../../store/hook';
import Exam from './examSchedule';
import Counselling from './counselling/Counselling';
import ViewAttendance from './attendance/ViewAttendance';
import StudentAttendance from './attendance/StudentAttendance';
import WelcomeUser from './WelcomeUser';
import Booking from './booking';
import Information from './booking/Information';
import Previous from './booking/Previous';
import Venue from './Admin/venues/Venue';


const stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const MyHome = () => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useAppSelector(state => state.profile.data);

  useEffect(() => {
    checkUser();
  }, [user]);

  const checkUser = () => {
    if (user.loginType != 'Guest') {
      setIsVisible(true);
    }
  };

  return (
    <tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-active';
          } else if (route.name === 'ContactUs') {
            iconName = 'email';
          }

          return <Icon name={iconName} size={26} color={white} />;
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
          color: 'white',
        },
        tabBarActiveBackgroundColor: 'rgb(160,80,15)',
        tabBarStyle: {
          backgroundColor: 'rgb(145,40,41)',
        },
      })}>
      <tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      {isVisible ? (
        <tab.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      ) : null}
    </tab.Navigator>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="HomeScreen"
            component={MyHome}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Home" />
              ),
            })}
          />
          <stack.Screen
            name="SignUp"
            component={SignUp}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Register New Account"
                />
              ),
            })}
          />
          <stack.Screen
            name="Alumni"
            component={Alumni}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Alumni" />
              ),
            })}
          />
          <stack.Screen
            name="AboutUs"
            component={AboutUs}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="About Us" />
              ),
            })}
          />
          <stack.Screen
            name="Attendance"
            component={Attendance}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Attendance" />
              ),
            })}
          />
          <stack.Screen
            name="DailyAttendance"
            component={DailyAttendance}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Daily Attendance"
                />
              ),
            })}
          />
          <stack.Screen
            name="ViewAttendance"
            component={ViewAttendance}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="View Attendance" />
              ),
            })}
          />
          <stack.Screen
            name="EventUpdate"
            component={EventUpdate}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Event Updates" />
              ),
            })}
          />
          <stack.Screen
            name="AddEvent"
            component={AddEvent}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Add Events" />
              ),
            })}
          />
          <stack.Screen
            name="Detail"
            component={Detail}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Details" />
              ),
            })}
          />
          <stack.Screen
            name="CompletedEvent"
            component={CompletedEvent}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Completed Events"
                />
              ),
            })}
          />
          <stack.Screen
            name="Queries/Feedback"
            component={Enquiry}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Queries/Feedback"
                />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Query"
            component={Query}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Query" />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Feedback"
            component={Feedback}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Feedback" />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Facultyload"
            component={Facultyload}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Faculty Load" />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Stationary"
            component={StationarySupply}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Stationary Supply Hub"
                />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Details"
            component={Details}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Details" />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Cart"
            component={Cart}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Cart" />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Fees"
            component={Fees}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Fees" />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Calendar"
            component={Calendar}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Calendar" />
              ),
            })}
          />
          <stack.Screen
            name="FAQ"
            component={FAQ}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="FAQs" />
              ),
            })}></stack.Screen>
          <stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headershown: true }}></stack.Screen>
          <stack.Screen
            name="Orders"
            component={Orders}
            options={{ headershown: true }}></stack.Screen>

          <stack.Screen
            name="FitnessAndHealth"
            component={FitnessAndHealth}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Fitness And Health"
                />
              ),
            })}
          />
          <stack.Screen
            name="PhotoGallery"
            component={ImageGrid}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Photo Gallery" />
              ),
            })}
          />
          <stack.Screen
            name="Placement"
            component={Placement}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Placement" />
              ),
            })}
          />
          <stack.Screen
            name="JobDetails"
            component={JobDetails}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="JobDetails" />
              ),
            })}
          />
          <stack.Screen
            name="AddJob"
            component={AddJob}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="AddJob" />
              ),
            })}
          />

          <stack.Screen
            name="Blog"
            component={Blog}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="VES Blog" />
              ),
            })}
          />
          <stack.Screen
            name="DigitalAcademy"
            component={DigitalAcademy}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Digital Academy" />
              ),
            })}
          />
          <stack.Screen
            name="DigitalAcademyDetail"
            component={DigitalAcademyDetail}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  navigation={navigation}
                  title="Digital Academy Detail"
                />
              ),
            })}
          />
          <stack.Screen
            name="Chat"
            component={Chat}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="VES Chat" />
              ),
            })}
          />
          <stack.Screen
            name="Exam"
            component={Exam}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Exam Schedule" />
              ),
            })}
          />
          <stack.Screen
            name="Counselling"
            component={Counselling}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Counselling" />
              ),
            })}
          />
          <stack.Screen
            name="StudentAttendance"
            component={StudentAttendance}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="View Attendance" />
              ),
            })}
          />
          <stack.Screen
            name="WelcomeUser"
            component={WelcomeUser}
            options={() => ({
              headerShown: false,
            })}
          />

          <stack.Screen
            name="Booking"
            component={Booking}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Booking" />
              ),
            })}
          />
          <stack.Screen
            name="Information"
            component={Information}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Infromation" />
              ),
            })}
          />

          <stack.Screen
            name="Previous Bookings"
            component={Previous}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Your Bookings" />
              ),
            })}
          />

          <stack.Screen
            name="Venue"
            component={Venue}
            options={({ navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader navigation={navigation} title="Venue" />
              ),
            })}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
