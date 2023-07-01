import React from "react";
import {
    View,
    Text
} from 'react-native';
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import AboutUs from "./aboutus/AboutUs";
import Attendance from "./attendance/Attendance";
import DailyAttendance from "./attendance/DailyAttendance";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "../../store";
import Alumni from "./alumni/Alumni";
import Enquiry,{Query,Feedback} from "./Enquiry/enquiry";
import EventUpdate from "./EventUpdate/EventUpdate";
import Fees from "./fees/Fees";
import FAQ from "./FAQ/FAQ";

const stack = createNativeStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <stack.Navigator>
                    <stack.Screen
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='Home'
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='SignUp'
                        component={SignUp}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='Alumni'
                        component={Alumni}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='AboutUs'
                        component={AboutUs}
                        options={{ headerShown: true }}
                    />

                    <stack.Screen
                        name='Attendance'
                        component={Attendance}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='DailyAttendance'
                        component={DailyAttendance}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='EventUpdate'
                        component={EventUpdate}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='Queries/Feedback'
                        component={Enquiry}
                        options={{ headerShown: false }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Query'
                        component={Query}
                        options={{ headerShown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Feedback'
                        component={Feedback}
                        options={{ headerShown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Fees'
                        component={Fees}
                        options={{ headershown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='FAQs'
                        component={FAQ}
                        options={{ headershown: true }}>
                    </stack.Screen>
                </stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;
