import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './List.styles';
import firestore from '@react-native-firebase/firestore'; // Make sure this import is correct
import { useAppSelector } from '../../../store/hook';

const List = ({ navigation }) => {
  // State variables
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const user = useAppSelector(state => state.profile.data);

  // UseEffect for removing expired tasks
  useEffect(() => {
    const removeExpiredTasks = () => {
      const now = new Date();
      const updatedTasks = tasks.filter(item => !item.dueDate || new Date(item.dueDate) > now);
      setTasks(updatedTasks);
      //saveTasks(); // Save the updated tasks after removing expired ones
    };

    const timer = setInterval(removeExpiredTasks, 60000); // Check every minute for expired tasks

    return () => clearInterval(timer);
  }, [tasks]);

  // Function to show date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Function to hide date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function to handle confirmed date
  const handleConfirmDate = (date) => {
    setDueDate(date);
    hideDatePicker();
  };

  // Function to add a task
  const addTask = async () => {
    if (task.trim() !== '') {
      // Update local state first
      setTasks([...tasks, { task, dueDate }]);
      setTask('');
      setDueDate(null);
  
      // Prepare data for Firestore
      const submitData = {
        Email: user.email,
        Task: task,
        DueDate: dueDate,
      };
  
      // Save task to Firebase Firestore
      try {
        await firestore().collection("Personalized Timetable").add(submitData);
        Alert.alert("Task Added");
      } catch (error) {
        console.error("Error adding task to Firestore:", error);
        Alert.alert("Failed to add task. Please try again.");
      }
    } else {
      Alert.alert("Task cannot be blank");
    }
  };
  

  // Function to remove a task
  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Set Due Date" onPress={showDatePicker} color={styles.addtask.color} />
      </View>
      {dueDate && (
        <Text style={styles.dueDateText}>
          Due Date: {dueDate.toLocaleString()}
        </Text>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>{item.task}</Text>
            {item.dueDate && (
              <Text style={styles.dueDateText}>
                Due Date: {new Date(item.dueDate).toLocaleString()}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Button
                title="Remove"
                onPress={() => removeTask(index)}
                color={styles.removeButton.color}
              />
            </View>
          </View>
        )}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <Button title="Add Task" onPress={addTask} color={styles.addtask.color} />
    </View>
  );
};

export default List;