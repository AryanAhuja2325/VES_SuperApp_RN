import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import styles from './ViewAttendance.styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { ip } from '../../utils/constant';
const ViewAttendance = () => {
    const user = useAppSelector((state) => state.profile.data);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [fetchedAttendance, setFetchedAttendance] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);


    const fetchData = async (selectedDate) => {
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            console.log(formattedDate)
            const response = await axios.get(`https://${ip}/api/attendance/viewAsTeacher/${user.email}/${formattedDate}`);
            const dataArr = response.data;
            setFetchedAttendance(dataArr)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData(date);
        setExpandedIndex(null);
    }, []);

    const showDateTimePicker = () => {
        setShowPicker(true);
    };

    const hideDateTimePicker = () => {
        setShowPicker(false);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        hideDateTimePicker();
        setIsDateSelected(true);
        fetchData(currentDate);
        console.log("===>", fetchedAttendance);
    };

    const toggleExpand = (index) => {
        if (index === expandedIndex) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Welcome {user.firstName}!</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Select a date: </Text>
                <TouchableOpacity style={styles.button} onPress={showDateTimePicker}>
                    <Text style={styles.buttonText}>Select a date</Text>
                </TouchableOpacity>
            </View>
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            {isDateSelected && (
                <View>
                    <Text style={styles.label1}>You selected: {date.toDateString()}</Text>
                    {fetchedAttendance.map((lecture, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles.header} onPress={() => toggleExpand(index)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.headerText}>Lecture No: {lecture.sessionCount}</Text>
                                    <Text style={styles.headerText}>{index === expandedIndex ? '-' : '+'}</Text>
                                </View>
                                <Text style={styles.headerText}>{lecture.subject}</Text>
                            </TouchableOpacity>
                            {index === expandedIndex && (
                                <View>
                                    {Array.isArray(lecture.attendance) && lecture.attendance.length > 0 ? (
                                        lecture.attendance.map((attendanceData, innerIndex) => (
                                            <View key={innerIndex} style={styles.childAttendanceContainer}>
                                                <Text style={styles.childName}>{attendanceData.rollNo}</Text>
                                                <Text style={styles.childStatus}>{attendanceData.status}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text>No attendance data available for the selected lecture.</Text>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}

        </ScrollView>
    );

};

export default ViewAttendance;
