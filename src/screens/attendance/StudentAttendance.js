import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './ViewAttendance.styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ip } from '../../utils/constant';
import { useAppSelector } from '../../../store/hook';

const StudentAttendance = () => {
    const user = useAppSelector((state) => state.profile.data);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [fetchedAttendance, setFetchedAttendance] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const fetchData = async (selectedDate) => {
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const response = await axios.get(`http://${ip}/api/attendance/P16/${formattedDate}`);
            const dataArr = response.data;

            if (Array.isArray(dataArr) && dataArr.length > 0) {
                const sortedAttendance = dataArr.sort((a, b) => a.sessionCount - b.sessionCount);
                setFetchedAttendance(sortedAttendance);
            } else {
                console.log("No data available for the selected date.");
                setFetchedAttendance([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleExpand = (index) => {
        if (index === expandedIndex) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
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
                    {fetchedAttendance.map((attendance, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles.header} onPress={() => toggleExpand(index)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.headerText}>Lecture No: {attendance.sessionCount}</Text>
                                    <Text style={styles.headerText}>{index === expandedIndex ? '-' : '+'}</Text>
                                </View>
                                <Text style={styles.headerText}>{attendance.subject}</Text>
                            </TouchableOpacity>
                            {index === expandedIndex && (
                                <View>
                                    {Array.isArray(attendance.attendance) && attendance.attendance.length > 0 ? (
                                        attendance.attendance.map((attendanceData, innerIndex) => (
                                            <View key={innerIndex} style={[styles.childAttendanceContainer, attendanceData.rollNo === user.rollNo && { backgroundColor: 'yellow' }]}>
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

export default StudentAttendance;
