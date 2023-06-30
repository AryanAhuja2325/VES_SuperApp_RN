import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert
} from 'react-native';
import styles from './Attendance.styles';

const Attendance = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Attendance</Text>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('DailyAttendance')
                    }}
                    style={styles.clickable}
                >
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.cardTitle}>Daily Attendance</Text>
                            <Text style={styles.cardText}>Edit the daily attendance of students</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.clickable}
                    onPress={() => {
                        Alert.alert("Error", " Developement in Progress")
                    }}
                >
                    <View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.cardTitle}>Monthly Attendance</Text>
                            <Text style={styles.cardText}>View the monthly attendance of students</Text>
                        </View>
                    </View>
                </TouchableOpacity >
            </View >

        </View>
    );
};


export default Attendance;
