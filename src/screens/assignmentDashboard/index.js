
import React, { useRef, useState } from "react";
import { DrawerLayoutAndroid, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './assignmentdashboard.styles.js'
import AssignmentCreationScreen from "./assignmentCreate.js";
import AssignmentHomeScreen from "./assignmenthome.js";
import { useAppSelector } from "../../../store/hook";
const AssignmentDashboard = () => {
    const drawer = useRef(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const user = useAppSelector(state => state.profile.data);


    const navigationView = () => (
      user.loginType === 'teacher' ? (
        <View>
          <TouchableOpacity
            style={[
              styles.optionTouchable,
              selectedOption === "Home" && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect("Home")}
          >
            <Text style={[styles.optionText,selectedOption === "Home" && styles.selectedOptionText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionTouchable,
              selectedOption === "Upload Notes" && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect("Upload Notes")}>
            <Text style={[styles.optionText,selectedOption === "Upload Notes" && styles.selectedOptionText]}>Upload Notes</Text>
          </TouchableOpacity>
          </View>
     ):(
        <View>
           <TouchableOpacity
            style={[
              styles.optionTouchable,
              selectedOption === "Home" && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect("Home")}
          >
            <Text style={[styles.optionText,selectedOption === "Home" && styles.selectedOptionText]}>Home</Text>
          </TouchableOpacity>
    </View>
     )
      );

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        drawer.current.closeDrawer();
    };

    const renderContent = () => {
        switch (selectedOption) {
            case "Home":
                return <AssignmentHomeScreen/>;
            case "Upload Notes":
                return <AssignmentCreationScreen/>;
            default:
                return <AssignmentHomeScreen/>
        }
    };

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            renderNavigationView={navigationView}
        >
            <View style={styles.drawerStyles}>
                <TouchableOpacity
                    style={styles.drawerIcon}
                    onPress={() => drawer.current.openDrawer()}
                >
                    <Icon name="bars" size={30} color="black" />
                </TouchableOpacity>
                <View>
                    {renderContent()}
                </View>
            </View>
        </DrawerLayoutAndroid>
    );
};

export default AssignmentDashboard;