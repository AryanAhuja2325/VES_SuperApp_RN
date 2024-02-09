import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';

const AssignmentPending = () => {
  const user = useAppSelector(state => state.profile.data);
  const [pendingAssignments, setPendingAssignments] = useState([]);

  useEffect(() => {
    fetchPendingAssignments();
  }, []);

  const fetchPendingAssignments = async () => {
    try {
      const snapshot = await firestore().collection('Assignments').where('submittedBy', '==', user.email).where('status', '==', 'pending').get();
      const pendingAssignmentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingAssignments(pendingAssignmentsList);
    } catch (error) {
      console.error('Error fetching pending assignments:', error);
    }
  };

  const transferDataToAssignments = async () => {
    try {
      // Fetch documents from Users collection where loginType is student
      const usersSnapshot = await firestore().collection('Users').where('loginType', '==', 'student').get();
  
      // Iterate over each user document
      usersSnapshot.forEach(async userDoc => {
        const userData = userDoc.data();
  
        // Extract relevant data
        const { grNo, email } = userData;
  
        // Get the corresponding assignment document ID
        const assignmentDocId = "4OuuHgckVTJ3u47359Ty"
  
        // Update Assignments collection with grNo and email
        await firestore().collection('Assignments').doc(assignmentDocId).set(
          { assignTo: { grNo, email } },
          { merge: true } // Use merge: true to merge the data if document already exists
        );
      });
  
      console.log('Data transferred successfully');
    } catch (error) {
      console.error('Error transferring data:', error);
    }
  };
  
  // Example usage:
  transferDataToAssignments();
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pending Assignments</Text>
      {pendingAssignments.length === 0 ? (
        <Text>No pending assignments</Text>
      ) : (
        <FlatList
          data={pendingAssignments}
          renderItem={({ item }) => (
            <View style={styles.assignmentItem}>
              <Text>{item.title}</Text>
              {/* Add more assignment details here */}
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  assignmentItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AssignmentPending;
