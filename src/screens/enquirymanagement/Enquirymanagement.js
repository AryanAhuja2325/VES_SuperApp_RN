import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, SafeAreaView, FlatList, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './enquiry.styles';
import { useAppSelector } from '../../../store/hook';
import axios from 'axios';
import { ip } from '../../utils/constant';

const Enquiry = ({ navigation }) => {
  const user = useAppSelector(state => state.profile.data);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Query");
        }}
          style={styles.button}>
          <Text style={styles.buttonText}>{user.loginType == "Admin" ? "View Queries" : "Post a query"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Feedback")
        }}
          style={styles.button}>
          <Text style={styles.buttonText}>{user.loginType == "Admin" ? "View Feedbacks" : "Send Feedback"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

export default Enquiry;


export const Query = () => {
  const user = useAppSelector(state => state.profile.data);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [showQueryType, setShowQueryType] = useState(false);
  const [selectedQueryType, setSelectedQueryType] = useState('Title');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.loginType === "Admin") {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://' + ip + '/api/enquiry/fetchQuery');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const toggleQueryType = () => {
    setShowQueryType(!showQueryType);
  };

  const handleQueryTypeSelection = (selectedType) => {
    setType(selectedType === "Another Query" ? "" : selectedType);
    setSelectedQueryType(selectedType);
    setShowQueryType(false);
  };

  const submitData = async () => {
    if (!type || !description) {
      Alert.alert("Error", "Please provide both the query type and description.");
    } else {
      try {
        const queryTypeToSend = type === "Another Query Type" ? selectedQueryType : type;
        if (user.loginType !== "Guest") {
          setName(`${user.firstName} ${user.lastName}`);
          setEmail(user.email);
        }
        const response = await axios.post('https://' + ip + '/api/enquiry/query', {
          name,
          email,
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

  const handleReply = (mail) => {
    Linking.openURL(`mailto:${mail}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.queryItem}>
      <Text style={styles.queryText}>Name: {item.Name == null ? "Unknown" : item.name}</Text>
      <Text style={styles.queryText}>Email: {item.Email}</Text>
      <Text style={styles.queryText}>Type: {item.Title}</Text>
      <Text style={styles.queryText}>Description: {item.Description}</Text>
      <TouchableOpacity style={styles.button1} onPress={() => handleReply(item.Email)}>
        <Text style={styles.buttonText1}>Reply to User</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      {user.loginType !== "Admin" && (
        <View>
          {user.loginType === "Guest" && (
            <View>
              <TextInput
                style={styles.QueryTypeinput}
                placeholder="Enter your name"
                value={name}
                onChangeText={value => setName(value)}
                placeholderTextColor="black"
              />
              <TextInput
                style={styles.QueryTypeinput}
                placeholder="Enter your email"
                value={email}
                onChangeText={value => setEmail(value)}
                placeholderTextColor="black"
              />
            </View>
          )}
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={toggleQueryType}>
              <Text style={styles.heading}>
                {selectedQueryType}
                {showQueryType ? <Text style={styles.arrowIcon}>▲</Text> : <Text style={styles.arrowIcon}>▼</Text>}
              </Text>
            </TouchableOpacity>
          </View>
          {showQueryType && (
            <View style={styles.queryTypeContainer}>
              {queryTypes.map((queryType) => (
                <TouchableOpacity key={queryType} onPress={() => handleQueryTypeSelection(queryType)}>
                  <Text style={[styles.queryType, selectedQueryType === queryType ? styles.selectedQueryType : null]}>{queryType}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {selectedQueryType === 'Another Query' && (
            <TextInput
              name="CustomQueryType"
              style={styles.QueryTypeinput}
              placeholder="Write your query"
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
          <TouchableOpacity onPress={submitData} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {user.loginType === "Admin" && (
        <View style={styles.container}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item._id.toString()}
            />
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};


export const Feedback = () => {
  const user = useAppSelector(state => state.profile.data);
  if (user.loginType != "Admin") {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Description, setFeedbackDescription] = useState("");

    const submitData = async () => {
      if (!Description) {
        Alert.alert("Error", "Write your feedback");
      } else {
        try {
          if (user.loginType != "Guest") {
            setName(`${user.firstName} ${user.lastName}`)
            setEmail(user.email)
          }
          const response = await axios.post('https://' + ip + '/api/enquiry/feedback', {
            name,
            email,
            description: Description,
          });
          console.log(response.data);
          setFeedbackDescription("");
          Alert.alert("Feedback submitted");
        } catch (error) {
          console.error('Error submitting feedback:', error);
        }
      }
    };
    const handleFeedbackChange = (value) => {
      setFeedbackDescription(value);
    }

    return (

      <KeyboardAvoidingView style={styles.container}>
        {user.loginType == "Guest" && (
          <View>
            <TextInput
              style={styles.QueryTypeinput}
              placeholder="Enter your name"
              value={name}
              onChangeText={value => setName(value)}
              placeholderTextColor="black"
            />
            <TextInput
              style={styles.QueryTypeinput}
              placeholder="Enter your email"
              value={email}
              onChangeText={value => setEmail(value)}
              placeholderTextColor="black"
            />
          </View>
        )}
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
  else {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://' + ip + '/api/enquiry/fetchFeedback');
          console.log(response.data)
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching queries:', error);
        }
      };

      fetchData();
    }, []);

    const handleReply = (mail) => {
      Linking.openURL(`mailto:${mail}`)
    }
    const renderItem = ({ item }) => (
      <View style={styles.queryItem}>
        <Text style={styles.queryText}>Name: {item.Name == null ? "Unknown" : item.Name}</Text>
        <Text style={styles.queryText}>Email: {item.Email == null ? "Unknown" : item.Email}</Text>
        <Text style={styles.queryText}>Description: {item.Description == null ? "Unknown" : item.Description}</Text>
        <TouchableOpacity style={styles.button1} onPress={() => {
          handleReply(item.Email)
        }}>
          <Text style={styles.buttonText1}>Reply to User</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
          />
        )}
      </View>
    );
  };
}

