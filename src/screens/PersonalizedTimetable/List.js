import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import styles from './List.styles';
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
    const removeExpiredTasks = async () => {
      const now = new Date();
      const updatedTasks = tasks.filter(item => !item.dueDate || new Date(item.dueDate) > now);
      setTasks(updatedTasks);
      await saveTasks(updatedTasks); // Save the updated tasks after removing expired ones
    };

    const timer = setInterval(removeExpiredTasks, 60000); // Check every minute for expired tasks

    // return () => clearInterval(timer);
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
      const newTask = { task, dueDate };
      setTasks([...tasks, newTask]);
      setTask('');
      setDueDate(null);

      // Save tasks to AsyncStorage
      const updatedTasks = [...tasks, newTask];
      await saveTasks(updatedTasks);
      Alert.alert("Task Added");
    } else {
      Alert.alert("Task cannot be blank");
    }
  };

  // Function to remove a task
  const removeTask = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  // Function to save tasks to AsyncStorage
  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage:", error);
    }
  };

  // Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from AsyncStorage:", error);
    }
  };

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

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
