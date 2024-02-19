import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import styles from './styles';
import add from './addContact';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import axios from 'axios';
import { ip } from '../../utils/constant';

const CampusContact = ({ navigation }) => {
  const user = useAppSelector(state => state.profile.data);
  const [contacts, setContacts] = useState([]);

  const getData = async () => {
    const data = await axios.get("http://" + ip + ":3000/api/campusContacts");
    setContacts(data.data);
  }

  useEffect(() => {
    getData();
  }, [])

  const handleContactPress = (contactInfo) => {
    if (contactInfo.type === 'phone') {
      Linking.openURL(`tel:${contactInfo.value}`);
    } else if (contactInfo.type === 'email') {
      Linking.openURL(`mailto:${contactInfo.value}`);
    }
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactContainer}>
      <Image source={{ uri: item.photo }} style={styles.photo} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>Phone: {item.phoneNo}</Text>
      <Text style={styles.details}>Title: {item.title}</Text>
      {item.branch == null ? null : <Text style={styles.details}>Branch: {item.branch}</Text>}
      <Text style={styles.details}>Institute: {item.institute}</Text>
      <TouchableOpacity onPress={() => handleContactPress({ type: 'phone', value: item.phoneNo })}>
        <Text style={[styles.details, { color: '#2ec2ff', textDecorationLine: 'underline' }]}>
          Phone: {item.phoneNo}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleContactPress({ type: 'email', value: item.mail })}>
        <Text style={[styles.details, { color: '#2ec2ff', textDecorationLine: 'underline' }]}>
          Mail: {item.mail}
        </Text>
      </TouchableOpacity>
    </View>
  );

  function click() {
    navigation.navigate('Add Contact');
  }
  return (
    <ScrollView>
      {contacts.map((contact) => renderContactItem({ item: contact }))}
      {
        user.loginType == 'Admin' ?
          <TouchableOpacity style={styles.button1} onPress={click}>
            <Text style={styles.buttonText}>Add Contact</Text>
          </TouchableOpacity>
          :
          null
      }
    </ScrollView>
  );
};

export default CampusContact;