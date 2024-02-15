import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Linking, ScrollView } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import Style from './CareerPath.style';
const CareerPath = () => {
  const [query, setQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [textselectedCourse, setTextSelectedCourse] = useState('');
  const [skill, setSkill] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [submitPressed, setSubmitPressed] = useState(false);

  const qualifications = [
    { label: "SSC", value: "SSC" },
    { label: "HSC", value: "HSC" },
    { label: "Diploma", value: "Diploma" },
    { label: "Bachelor's Degree", value: "Bachelor's Degree" },
    { label: "Master's Degree", value: "Master's Degree" },

  ];

  const course = [
    { label: "Computer Engineering", value: "Computer Engineering" },
    { label: "Automobile Engineering", value: "Automobile Engineering" },
    { label: "Civil Engineering", value: "Civil Engineering" },
    { label: "Electrical Engineering", value: "Electrical Engineering" },
    { label: "Mechanical Engineering", value: "Mechanical Engineering" },
    { label: "Other", value: " " }
  ]

  const API_KEY = 'AIzaSyDpoPSel0zdL_RdsThP3-d1pa5VH5m_QF4';
  const SEARCH_ENGINE_ID = '418dbe66ae12042d0';

  const handleChange = (text) => {
    setSkill(text);
  };

  const handleSubmit = async () => {
    try {
      console.log(query)
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`);
      const data = await response.json();
      if (data.items) {
        setBreeds(data.items);
      }
      setSubmitPressed(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if ((selectedCourse || textselectedCourse) && selectedQualification && skill) {
      const updatedQuery =selectedCourse!=" "? ` ${selectedCourse} ${selectedQualification} ${skill} `:`${textselectedCourse} ${selectedQualification} ${skill}`;
      setQuery(updatedQuery);
      console.log(query)
    }
  }, [selectedCourse, selectedQualification, skill]);
  const renderItem = ({ item }) => (
    <View style={Style.cart}>
      <TouchableOpacity
        onPress={() => Linking.openURL(item.link)}>
        <Text>{item.snippet}</Text>
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={{ flex: 1 }} >
      <ScrollView style={{ flex: !submitPressed ? 1 : 0.7 }}>
        <Text style={Style.text1}>Select Qualification</Text>
        <RadioForm>
          {qualifications.map((qual, index) => (
            <RadioButton labelHorizontal={true} key={index}>
              <RadioButtonInput
                obj={qual}
                index={index}
                isSelected={selectedQualification === qual.value}
                onPress={() => setSelectedQualification(qual.value)}
                borderWidth={1}
                buttonInnerColor={"#2196f3"}
                buttonOuterColor={selectedQualification === qual.value ? "#2196f3" : "#000"}
                buttonSize={10}
                buttonOuterSize={20}
                buttonStyle={{}}
                buttonWrapStyle={{ marginLeft: 10 }}
              />
              <RadioButtonLabel
                obj={qual}
                index={index}
                labelHorizontal={true}
                onPress={() => setSelectedQualification(qual.value)}
                labelStyle={{ fontSize: 15, color: "#000" }}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>
        <View>
          <Text style={Style.text1}>Select Field</Text>
          <RadioForm>
            {course.map((co, index) => (
              <RadioButton labelHorizontal={true} key={index}>
                <RadioButtonInput
                  obj={co}
                  index={index}
                  isSelected={selectedCourse === co.value}
                  onPress={() => setSelectedCourse(co.value)}
                  borderWidth={1}
                  buttonInnerColor={"#2196f3"}
                  buttonOuterColor={selectedCourse === co.value ? "#2196f3" : "#000"}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={co}
                  index={index}
                  labelHorizontal={true}
                  onPress={() => setSelectedCourse(co.value)}
                  labelStyle={{ fontSize: 15, color: "#000" }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
          {selectedCourse == " " &&
            <TextInput
              style={Style.inputtxt}
              value={textselectedCourse}
              onChangeText={text => setTextSelectedCourse(text)}
              placeholder='Enter you Field'
            />
          }
        </View>
        <Text style={Style.text1}>Enter Skill</Text>
        <TextInput
          style={Style.inputtxt}
          value={skill}
          onChangeText={handleChange}
          placeholder="Enter skill"
        />
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={Style.button}>
          <Text style={Style.text}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ flex: submitPressed ? 1 : 0 }}>
        <FlatList
          data={breeds}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default CareerPath;