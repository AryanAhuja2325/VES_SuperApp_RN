import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './AttendanceNew.styles';
import firestore from '@react-native-firebase/firestore';

const AttendanceNew = () => {
  const [Classroom, setClassroom] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [classStrength, setClassStrength] = useState('');
  const [sessionCount, setSessionCount] = useState(null);
  const [roomNo, setRoomNo] = useState('');
  const [absentRollNo, setAbsentRollNo] = useState('');
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  
  const classOptions = Array.from({length: 21}, (_, index) => ({
    label: `P${index + 1}`,
    value: `P${index + 1}`,
  }));

  const attendanceData = {
    classroom: Classroom,
    subject: selectedSubject,
    roomNo: roomNo,
    classStrength: classStrength,
    sessionCount: sessionCount,
    timestamp: new Date().toISOString(),
    attendance: [],
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

    // Initialize attendance for all students as 'Present'
    for (let i = 1; i <= parseInt(classStrength, 10); i++) {
      attendanceData.attendance.push({rollNo: i.toString(), status: 'Present'});
    }

    // Split the absent roll numbers by comma and remove any leading or trailing whitespace
    const absentRollNumbers = absentRollNo.trim().split(',');

    // Mark the status of absent students as 'Absent'
    absentRollNumbers.forEach(rollNo => {
      const index = parseInt(rollNo.trim(), 10) - 1; // Adjust index since roll numbers start from 1
      if (index >= 0 && index < attendanceData.attendance.length) {
        attendanceData.attendance[index].status = 'Absent';
      }
    });

    try {
      // Add the attendance data to the Firestore database
      await firestore()
        .collection('Classroom')
        .add(attendanceData)
        .then(() => {
          Alert.alert(
            'Success',
            `Attendance data added successfully on..\n\nDate: ${currentDate}\nTime: ${currentTime}`,
          );
          setClassroom(null);
          setSelectedSubject(null);
          setSessionCount('');
          setClassStrength('');
          setAbsentRollNo('');
        });
    } catch (error) {
      console.error('Error adding attendance data: ', error);
      Alert.alert('Error', 'Failed to add attendance data');
    }
  };

  const handleClassroom = itemValue => {
    setClassroom(itemValue);
  };

  return (
       <View style={styles.innerContainer}>
        <Text style={styles.label}>Class Name</Text>
        <DropDownPicker
          style={styles.picker}
          textStyle={{color: 'black'}}
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
      </View>
  );
};

export default AttendanceNew;
