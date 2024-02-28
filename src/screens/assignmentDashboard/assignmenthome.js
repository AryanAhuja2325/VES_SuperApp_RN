import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Linking, Platform, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import styles from './assignmenthome.styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useAppSelector } from '../../../store/hook';

const AssignmentHomeScreen = () => {
  const [assignments, setAssignments] = useState([]);
 const selectedDate = new Date();
  const user = useAppSelector(state => state.profile.data);
  const assignmentObject = {
    studentName: user.firstName +" "+ user.lastName,
    postedBy: user.email,
    pdf: null,
    pdflink: null,
    uploadDateTime: null,
  }
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const snapshot = await firestore().collection('Assignments')
        .where(user.loginType === 'Teacher' ? 'postedBy' : 'className', '==', user.email || user.className)
        .get();
      const assignmentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssignments(assignmentList);
      console.log("Assignments:", assignmentList);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const openLink = (link) => {
    if (link) {
      Linking.openURL(link);
    }
  };

  const renderAssignmentItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleAssignmentPress(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>Class: {item.className}</Text>
      {item.pdf && <Text style={styles.text}>PDF: {item.pdf}</Text>}
      {item.pdflink && <Text style={[styles.text, styles.linktext]} onPress={() => openLink(item.pdflink)}>Click to download pdf</Text>}
      {item.link && <Text style={[styles.text, styles.linktext]} onPress={() => openLink(item.link)}>Link: {item.link}</Text>}
      {user.loginType === 'Student' && (
        <TouchableOpacity style={styles.submitButton} onPress={() => selectFile(item)}>
          <Text style={styles.submitButtonText}>Upload Assignment</Text>
        </TouchableOpacity>
      )}
       {selectedFile && selectedFile.id === item.id && (
      <Text style={styles.selectedAssignment}>Selected Assignment: {selectedFile.pdf}</Text>
    )}
    </TouchableOpacity>
  );


  const handleAssignmentPress = (item) => {
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      setSelectedFile(res);
      await uploadAssignmentToFirebase()
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker.');
      } else {
        console.log('Error while picking the file:', err);
      }
    }
  };
  const uploadAssignmentToFirebase = async () => {
    try {
        // Check if selectedFile is null
        if (!selectedFile) {
          Alert.alert('Error', 'Please select a file to upload');
          return;
        }
    
      const currentTime = new Date();
      assignmentObject.pdf = selectedFile[0].name;
      const response = await storage().ref(`/Assignments/${selectedFile[0].name}`).putFile(selectedFile[0].fileCopyUri);
      url = await storage().ref(`/Assignments/${selectedFile[0].name}`).getDownloadURL();
      assignmentObject.pdf = selectedFile[0].name;
      assignmentObject.pdflink = url;

      assignmentObject.uploadDateTime = currentTime.toISOString();

      Alert.alert('Success', 'File uploaded successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file');
      console.error('Error uploading file:', error);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Your Assignments</Text>
        <FlatList
          data={assignments}
          renderItem={renderAssignmentItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default AssignmentHomeScreen;
