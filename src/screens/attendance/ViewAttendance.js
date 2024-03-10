import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import styles from './ViewAttendance.styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const ViewAttendance = () => {
    const user = useAppSelector((state) => state.profile.data);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [fetchedAttendance, setFetchedAttendance] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const fetchData = async (selectedDate) => {
        try {
            const startDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                0, 0, 0
            );
            const endDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                23, 59, 59
            );

            const snapshot = await firestore()
                .collection('Classroom')
                .where('email', '==', user.email)
                .where('currentTime', '>=', startDate)
                .where('currentTime', '<=', endDate)
                .get();

            // Process data if available
            if (!snapshot.empty) {
                const dataArr = snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }));

                console.log("Document Data===>", dataArr[0].data.sessionCount);
                setFetchedAttendance(dataArr);
            } else {
                console.log("No data available for the selected date.");
                setFetchedAttendance([]);
            }
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
        console.log("===>",fetchedAttendance);
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
            <Text style={styles.title}>Welocme {user.firstName}!</Text>
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
                                    <Text style={styles.headerText}>Lecture No: {attendance.data.sessionCount}</Text>
                                    <Text style={styles.headerText}>{index === expandedIndex ? '-' : '+'}</Text>
                                </View>
                                <Text style={styles.headerText}>{attendance.data.subject}</Text>
                            </TouchableOpacity>
                            {index === expandedIndex && (
    <View>
        {attendance.data.attendance.map((attendenceData, index) => (
            <View key={index} style={styles.childAttendanceContainer}>
                <Text style={styles.childName}>{attendenceData.rollNo}</Text>
                <Text style={styles.childStatus}>{attendenceData.status}</Text>
            </View>
        ))}
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
