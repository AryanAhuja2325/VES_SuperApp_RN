import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Linking, ScrollView, KeyboardAvoidingView } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import Style from './CareerPath.style';
const CareerPath = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [textselectedCourse, setTextSelectedCourse] = useState('');
  const [skill, setSkill] = useState('');
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [qvissible, setQVissible] = useState(true);
  const [fvissible, setFVissible] = useState(false);
  const [svissible, setSVissible] = useState(false)

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

  const handleChange = (text) => {
    setSkill(text);
  };

  useEffect(() => {
    if ((selectedCourse || textselectedCourse) && selectedQualification && skill) {
      const updatedQuery = selectedCourse != " " ? ` ${selectedCourse} ${selectedQualification} ${skill} ` : `${textselectedCourse} ${selectedQualification} ${skill}`;
      setQuery(updatedQuery);
    }
  }, [selectedCourse, selectedQualification, skill]);

  return (
    <View style={{ flex: 1, alignContent: 'center' }} >
      {
        qvissible &&
        <View style={Style.selectionCart}>
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
                  buttonWrapStyle={{ marginLeft: 10, margin: 10, }}
                />
                <RadioButtonLabel
                  obj={qual}
                  index={index}
                  labelHorizontal={true}
                  onPress={() => setSelectedQualification(qual.value)}
                  labelStyle={{ fontSize: 22, color: "#000" }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
          <TouchableOpacity
            onPress={() => { setQVissible(false), setFVissible(true), setSVissible(false) }}
            style={Style.next_button}>
            <Text style={Style.text}>Next</Text>
          </TouchableOpacity>
        </View>
      }
      {
        fvissible &&
        <View style={Style.selectionCart}>
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
                  buttonWrapStyle={{ marginLeft: 10, margin: 10, }}
                />
                <RadioButtonLabel
                  obj={co}
                  index={index}
                  labelHorizontal={true}
                  onPress={() => setSelectedCourse(co.value)}
                  labelStyle={{ fontSize: 22, color: "#000" }}
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
          <TouchableOpacity
            onPress={() => { setQVissible(true), setFVissible(false), setSVissible(false) }}
            style={Style.back_button}>
            <Text style={Style.text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setQVissible(false), setFVissible(false), setSVissible(true) }}
            style={Style.next_button}>
            <Text style={Style.text}>Next</Text>
          </TouchableOpacity>
        </View>
      }
      {
        svissible &&
        <View style={Style.selectionCart}>
          <Text style={Style.text1}>Enter Skill</Text>
          <TextInput
            style={Style.inputtxt}
            value={skill}
            onChangeText={handleChange}
            placeholder="Enter skill"
          />
          <TouchableOpacity
            onPress={() => { setQVissible(false), setFVissible(true), setSVissible(false) }}
            style={Style.back_button}>
            <Text style={Style.text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => query.trim() !== "" ? navigation.navigate('Jobs', { query: query }) : console.error("Fill all parameters")}
            style={Style.next_button}>
            <Text style={Style.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      }
    </View >
  );
};
export default CareerPath;