import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './AttendanceNew.styles';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../store/hook';
import axios from 'axios';
import { ip } from '../utils/constant';

const AttendanceNew = () => {
  const [Classroom, setClassroom] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [classStrength, setClassStrength] = useState('');
  const [sessionCount, setSessionCount] = useState(null);
  const [roomNo, setRoomNo] = useState('');
  const [absentRollNo, setAbsentRollNo] = useState('');
  const currentDate = new Date().toLocaleDateString();
  const user = useAppSelector((state) => state.profile.data);
  const classOptions = Array.from({ length: 21 }, (_, index) => ({
    label: `P${index + 1}`,
    value: `P${index + 1}`,
  }));

  const attendanceData = {
    classroom: Classroom,
    subject: selectedSubject,
    roomNo: roomNo,
    classStrength: classStrength,
    sessionCount: sessionCount,
    currentTime: firestore.Timestamp.now(),
    attendance: [],
    email: user.email,
  };

  const handleSubmit = async () => {
    if (
      !Classroom ||
      !selectedSubject ||
      !sessionCount ||
      !classStrength ||
      !absentRollNo
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    for (let i = 1; i <= parseInt(classStrength, 10); i++) {
      attendanceData.attendance.push({ rollNo: i.toString(), status: 'Present' });
    }

    const absentRollNumbers = absentRollNo.trim().split(',');

    absentRollNumbers.forEach(rollNo => {
      const index = parseInt(rollNo.trim(), 10) - 1;
      if (index >= 0 && index < attendanceData.attendance.length) {
        attendanceData.attendance[index].status = 'Absent';
      }
    });

    try {
      const { classroom, subject, roomNo, classStrength, sessionCount, currentTime, attendance, email } = attendanceData;

      const response = await axios.post(`https://${ip}/api/attendance/addAttendance`, {
        classroom,
        subject,
        roomNo,
        classStrength,
        sessionCount,
        currentTime,
        attendance,
        email,
      });

      if (response.status == 200) {
        Alert.alert("Success", "Attendance marked successfully")
        setClassroom(null);
        setSelectedSubject(null);
        setSessionCount('');
        setClassStrength('');
        setAbsentRollNo('');
      }
      else {
        Alert.alert("Error", "Something went wrong try again")
      }
    } catch (error) {
      console.error('Error adding attendance data: ', error);
      Alert.alert('Error', 'Failed to add attendance data');
    }
  };

  const handleClassroom = itemValue => {
    setClassroom(itemValue);
  };

  return (
    // <ScrollView>
    <KeyboardAvoidingView style={styles.innerContainer}>
      <Text style={styles.label}>Class Name</Text>
      <DropDownPicker
        style={styles.picker}
        textStyle={{ color: 'black' }}
        open={classDropdownOpen}
        value={Classroom}
        items={classOptions}
        placeholder="Select Class Name"
        setOpen={setClassDropdownOpen}
        onSelectItem={item => handleClassroom(item.value)}
        containerStyle={styles.dropdownContainer}
        scrollable={true}
      />
      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Subject"
        value={selectedSubject}
        onChangeText={setSelectedSubject}
      />
      <Text style={styles.label}>Room No.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Room No."
        value={roomNo}
        onChangeText={setRoomNo}
        keyboardType="numeric"
      />
      <View style={styles.row}>
        <Text style={styles.label}>Enter lecture number: </Text>
        <TextInput
          style={styles.input}
          placeholder="Lecture Number (1-7)"
          value={sessionCount}
          onChangeText={text => setSessionCount(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Enter strength of class: </Text>
        <TextInput
          style={styles.input}
          placeholder="Total Students"
          value={classStrength}
          onChangeText={text => setClassStrength(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Enter absent roll numbers : </Text>
        <TextInput
          style={styles.input}
          placeholder="Absent Roll Number"
          value={absentRollNo}
          onChangeText={text => setAbsentRollNo(text)}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.buttonG} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Attendance</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    // </ScrollView>
  );
};

export default AttendanceNew;
