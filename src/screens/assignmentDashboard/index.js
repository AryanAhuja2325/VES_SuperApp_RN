
import React, { useRef, useState } from "react";
import { DrawerLayoutAndroid, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './assignmentdashboard.styles'
import AssignmentHomeScreen from "./assignmenthome";
import AssignmentCreationScreen from "./assignmentCreate";
import AssignmentResponseScreen from "./assignmentResponse";
import AssignmentPending from "./assignmentpending";
import { useAppSelector } from "../../../store/hook";


const AssignmentDashboard = () => {
  const drawer = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const user = useAppSelector(state => state.profile.data);

  const navigationView = () => (
    user.loginType === 'Teacher' ? (
      <View>
        <TouchableOpacity
          style={[
            styles.optionTouchable,
            selectedOption === "Home" && styles.selectedOption
          ]}
          onPress={() => handleOptionSelect("Home")}
        >
          <Text style={[styles.optionText, selectedOption === "Home" && styles.selectedOptionText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionTouchable,
            selectedOption === "Upload Notes" && styles.selectedOption
          ]}
          onPress={() => handleOptionSelect("Upload Notes")}>
          <Text style={[styles.optionText, selectedOption === "Upload Notes" && styles.selectedOptionText]}>Upload Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionTouchable,
            selectedOption === "Response" && styles.selectedOption
          ]}
          onPress={() => handleOptionSelect("Response")}>
          <Text style={[styles.optionText, selectedOption === "Response" && styles.selectedOptionText]}>Response</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <TouchableOpacity
          style={[
            styles.optionTouchable,
            selectedOption === "Home" && styles.selectedOption
          ]}
          onPress={() => handleOptionSelect("Home")}
        >
          <Text style={[styles.optionText, selectedOption === "Home" && styles.selectedOptionText]}>Home</Text>
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
        return <AssignmentHomeScreen />;
      case "Upload Notes":
        return <AssignmentCreationScreen />;
      case "Response":
        return <AssignmentResponseScreen />;
      case "Pending":
        return <AssignmentPending />;
      default:
        return <AssignmentHomeScreen />
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