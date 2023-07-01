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
import Attendance from "./attendance/Attendance";
import DailyAttendance from "./attendance/DailyAttendance";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "../../store";
import Alumni from "./alumni/Alumni";
import Enquiry,{Query,Feedback} from "./Enquiry/enquiry";
import StationarySupply from "./stationarySupply/StationarySupply";
import Details from "./stationarySupply/Details";
import Cart from "./stationarySupply/Cart";
import Fees from "./fees/Fees";
import FAQ from "./FAQ/FAQ";
import Details from "./stationarySupply/Details";
import StationarySupply from "./stationarySupply/StationarySupply";
import Cart from "./stationarySupply/Cart";


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
                        name='AddEvent'
                        component={AddEvent}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='Detail'
                        component={Detail}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='CompletedEvent'
                        component={CompletedEvent}
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
                        name='Stationary'
                        component={StationarySupply}
                        options={{ headerShown: false }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Details'
                        component={Details}
                        options={{ headerShown: false }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Cart'
                        component={Cart}
                        options={{ headerShown: false }}>
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
