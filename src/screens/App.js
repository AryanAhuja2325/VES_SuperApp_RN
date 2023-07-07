import React from "react";
import {
    View,
    Text
} from 'react-native';
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import EventUpdate from "./EventUpdate/EventUpdate";
import Detail from "./EventUpdate/Detail";
import AddEvent from "./EventUpdate/AddEvent";
import CompletedEvent from "./EventUpdate/CompletedEvent";
import AboutUs from "./aboutus/AboutUs";
import Facultyload from "./facultyload/Facultyload";
import Attendance from "./attendance/Attendance";
import DailyAttendance from "./attendance/DailyAttendance";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "../../store";
import Alumni from "./alumni/Alumni";
import Enquiry, { Feedback, Query } from "./EnquiryManagement";
import StationarySupply from "./stationarySupply/StationarySupply";
import Details from "./stationarySupply/Details";
import Cart from "./stationarySupply/Cart";
import Fees from "./fees/Fees";
import Splash from "./splash";

import HolidayCalendar from './holidayCalendar/HolidayCalendar';
import FAQ from "./FAQs/faqs";
import Profile from "./bottomTab/profile";
import Notifications from "./bottomTab/notifications";
import ContactUs from "./bottomTab/contactUs";
import Checkout from "./stationarySupply/Checkout";
import Orders from "./stationarySupply/Orders";
import CustomHeader from "../components/header";
import FitnessAndHealth from "./fitnessandhealth/FitnessAndHealth";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as colors from "../utils/color";

const stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const MyHome = () => {
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

                    return <Icon name={iconName} size={26} color={colors.white} />;
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: 'white'
                },
                tabBarActiveBackgroundColor: 'rgb(160,80,15)',
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgb(145,40,41)',
                },
            })}
        >
            <tab.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
            />
            <tab.Screen
                name='Notifications'
                component={Notifications}
                options={{ headerShown: false }}
            />
            <tab.Screen
                name='ContactUs'
                component={ContactUs}
                options={{ headerShown: false }}
            />
            <tab.Screen
                name='Profile'
                component={Profile}
                options={{ headerShown: false }}
            />
        </tab.Navigator>
    )
}
const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <stack.Navigator>
                    <stack.Screen
                        name='splash'
                        component={Splash}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='HomeScreen'
                        component={MyHome}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Home" />,
                        })}
                    />
                    <stack.Screen
                        name='SignUp'
                        component={SignUp}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='Alumni'
                        component={Alumni}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Alumni" />
                        })}
                    />
                    <stack.Screen
                        name='AboutUs'
                        component={AboutUs}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="About Us" />
                        })}
                    />
                    <stack.Screen
                        name='Attendance'
                        component={Attendance}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Attendance" />
                        })}
                    />
                    <stack.Screen
                        name='DailyAttendance'
                        component={DailyAttendance}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Daily Attendance" />
                        })}
                    />
                    <stack.Screen
                        name='EventUpdate'
                        component={EventUpdate}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Event Updates" />
                        })}
                    />
                    <stack.Screen
                        name='AddEvent'
                        component={AddEvent}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Add Events" />
                        })}
                    />
                    <stack.Screen
                        name='Detail'
                        component={Detail}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Details" />
                        })}
                    />
                    <stack.Screen
                        name='CompletedEvent'
                        component={CompletedEvent}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Completed Events" />
                        })}
                    />
                    <stack.Screen
                        name='Queries/Feedback'
                        component={Enquiry}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Queries/Feedback" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Query'
                        component={Query}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Query" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Feedback'
                        component={Feedback}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Feedback" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Facultyload'
                        component={Facultyload}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Faculty Load" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Stationary'
                        component={StationarySupply}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Stationary Supply Hub" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Details'
                        component={Details}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Details" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Cart'
                        component={Cart}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Cart" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Fees'
                        component={Fees}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Fees" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='HolidayCalendar'
                        component={HolidayCalendar}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Holiday Calendar" />
                        })}
                    />
                    <stack.Screen
                        name='FAQ'
                        component={FAQ}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="FAQs" />
                        })}>
                    </stack.Screen>
                    <stack.Screen
                        name='Checkout'
                        component={Checkout}
                        options={{ headershown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Orders'
                        component={Orders}
                        options={{ headershown: true }}>
                    </stack.Screen>

                    <stack.Screen
                        name='FitnessAndHealth'
                        component={FitnessAndHealth}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => <CustomHeader navigation={navigation} title="Fitness And Health" />
                        })}
                    />
                </stack.Navigator>
            </NavigationContainer>
        </Provider >

    )
}

export default App;