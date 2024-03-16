import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './enquiry.styles';
import { useAppSelector } from '../../../store/hook';
import axios from 'axios';

const Enquiry = ({ navigation }) => {
  const submitData = async () => {
    if (!Description) {
      Alert.alert("Error", "Write your feedback");
    } else {
      try {
        const response = await axios.post('http://' + ip + ':3000/api/feedback', {
          email: user.email,
          description: Description,
        });
        console.log(response.data); // Log the server response
        setFeedbackDescription("");
        Alert.alert("Feedback submitted");
      } catch (error) {
        console.error('Error submitting feedback:', error);
        // Handle error accordingly
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Query");
        }}
          style={styles.button}>
          <Text style={styles.buttonText}>Post a Query</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          submitData()
        }}
          style={styles.button}>
          <Text style={styles.buttonText}>Send FeedBack</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )

};

export default Enquiry;


export const Query = () => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [showQueryType, setShowQueryType] = useState(false);
  const [selectedQueryType, setSelectedQueryType] = useState('Query Type'); // Initialize with default text

  const queryTypes = ['Fee related Query', 'Admission related Query', 'Syllabus Related Query', 'Another Query Type'];
  const user = useAppSelector(state => state.profile.data);

  const toggleQueryType = () => {
    setShowQueryType(!showQueryType);
  };

  const handleQueryTypeSelection = (selectedType) => {
    setType(selectedType);
    setSelectedQueryType(selectedType); // Update selected query type
    setShowQueryType(false);
  };

  const submitData = async () => {
    if (!type || !description) {
      Alert.alert("Error", "Please provide both the query type and description.");
    } else {
      let queryTypeToSend = type;
      if (type === "Another Query Type") {
        if (!selectedQueryType) {
          Alert.alert("Error", "Please write your query type.");
          return;
        }
        queryTypeToSend = selectedQueryType;
      }

      try {
        const response = await axios.post('http://' + ip + ':3000/api/query', {
          email: user.email,
          queryTypeToSend,
          description,
        });
        console.log(response.data);
        setType('');
        setDescription('');
        setSelectedQueryType('');
        Alert.alert('Query submitted');
      } catch (error) {
        console.error('Error submitting query:', error);
      }
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={toggleQueryType}>
              <Text style={styles.heading}>
                {selectedQueryType} {/* Display selected query type */}
                {showQueryType ? <Text style={styles.arrowIcon}>▲</Text> : <Text style={styles.arrowIcon}>▼</Text>}
              </Text>
            </TouchableOpacity>
          </View>
          {showQueryType && (
            <View style={styles.queryTypeContainer}>
              {queryTypes.map((queryType) => (
                <TouchableOpacity
                  key={queryType}
                  onPress={() => handleQueryTypeSelection(queryType)}
                >
                  <Text style={[styles.queryType, selectedQueryType === queryType ? styles.selectedQueryType : null]}>{queryType}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {selectedQueryType === 'Another Query Type' && (
          <TextInput
            name="CustomQueryType"
            style={styles.QueryTypeinput}
            placeholder="Write your query type"
            value={type}
            onChangeText={value => setType(value)}
            placeholderTextColor="black"
          />
        )}
        <TextInput
          name="Description"
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={value => setDescription(value)}
          placeholderTextColor="black"
          multiline
          numberOfLines={6}
        />

        <TouchableOpacity
          onPress={submitData}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};



export const Feedback = () => {
  const [Description, setFeedbackDescription] = useState("");

  const user = useAppSelector(state => state.profile.data);

  const submitData = async () => {
    if (!Description) {
      Alert.alert("error", " write your feedback");
    } else {
      const feedbackData = {
        Email: user.email,
        Description: Description
      };
      await firestore().collection("Feedback").add(feedbackData);
      setFeedbackDescription("");
      Alert.alert("Feedback submitted");
    }
  }
  const handleFeedbackChange = (value) => {
    setFeedbackDescription(value);
  }

  return (

    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          name="Description"
          style={styles.input}
          placeholder="Description"
          value={Description}
          onChangeText={handleFeedbackChange}
          placeholderTextColor="black"
          multiline
          numberOfLines={6}
        />

        <TouchableOpacity
          onPress={submitData}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
