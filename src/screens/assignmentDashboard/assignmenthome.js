import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Linking, Platform, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import styles from './assignmenthome.styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useAppSelector } from '../../../store/hook';

const AssignmentHomeScreen = () => {
  const [assignments, setAssignments] = useState([]);
  const user = useAppSelector(state => state.profile.data);
  const assignmentObject = {
    postedBy: user.email,
    // className: className,
    // title: title,
    // DOS: selectedDate.toISOString(),
    pdf: null,
    pdflink: null,
  }

    useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      if (user.loginType === 'Teacher') {
              const snapshot = await firestore().collection('Assignments').where('postedBy', '==', user.email).get();
              const assignmentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setAssignments(assignmentList);
              console.log("Assignments for Teacher==>", assignmentList);
            } else {
              const snapshot = await firestore().collection('Assignments').where('className', '==', user.className).get();
              const assignmentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setAssignments(assignmentList);
              console.log("Assignments for Student==>", assignmentList);
            }
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
          <TouchableOpacity style={styles.submitButton} onPress={selectFile}>
            <Text style={styles.submitButtonText}>Upload Assignment</Text>
          </TouchableOpacity>
        )}
    </TouchableOpacity>
  );

  const handleAssignmentPress = (item) => {
    // Handle onPress event for an assignment item
    // You can navigate to another screen or perform any other action here
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      setSelectedFile(res);
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
      assignmentObject.pdf = selectedFile[0].name;
      const response = await storage().ref(`/Assignments/${selectedFile[0].name}`).putFile(selectedFile[0].fileCopyUri);
      url = await storage().ref(`/Assignments/${selectedFile[0].name}`).getDownloadURL();
      assignmentObject.pdf = selectedFile[0].name;
      assignmentObject.pdflink = url;
      console.log("File====>",assignmentObject)
    } catch (error) {
      Alert.alert("Assignment Posting Falied...!!");
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
