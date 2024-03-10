import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './assignmentCreate.styles';
import { firebase } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loading from '../../components/header/loading';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AssignmentCreationScreen = () => {
  const user = useAppSelector(state => state.profile.data);
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState(false);
  const [title, setTitle] = useState('');
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [submissionType, setSubmissionType] = useState(false);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const classOptions = Array.from({ length: 21 }, (_, index) => ({
    label: `P${index + 1}`,
    value: `P${index + 1}`
  }));

  const [items, setItems] = useState([
    {
      label: 'PDF',
      value: 'pdf'
    },
    {
      label: 'Link',
      value: 'link'
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  let url = null;
  const assignmentObject = {
    postedBy: user.email,
    className: className,
    title: title,
    DOS: selectedDate.toISOString(),
    link: null,
    pdf: null,
    pdflink: null,
    completed: {},
  }

  const handleCreateAssignment = async () => {

    setLoading(true);
    if (submissionType === 'link') {
      assignmentObject.link = link;
    }
    else if (submissionType === 'pdf') {
      try {
        assignmentObject.pdf = selectedFile[0].name;
        const response = await storage().ref(`/Assignments/${selectedFile[0].name}`).putFile(selectedFile[0].fileCopyUri);
        url = await storage().ref(`/Assignments/${selectedFile[0].name}`).getDownloadURL();
        assignmentObject.pdf = selectedFile[0].name;
        assignmentObject.pdflink = url;
      } catch (error) {
        Alert.alert("Assignment Posting Falied...!!");
        return;
      }
    }
    try {
      const docRef = await firebase.firestore().collection('Assignments').add(assignmentObject);
      console.log('Assignment added with ID: ', docRef.id);
      setLoading(false);
      Alert.alert("Assignment created successfully!!!");
    }
    catch (error) {
      console.log("Error==>", error);
      Alert.alert("Assignment uploading failed...!");
    }

    console.log("Output===>", assignmentObject);
  }
  const formattedDate = selectedDate.toDateString();


  console.log("Output===>", assignmentObject);


const selectFile = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
      copyTo: 'cachesDirectory',
    });
    setSelectedFile(res[0]);
    console.log("File==>", res[0])
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled the document picker.');
    } else {
      console.log('Error while picking the file:', err);
    }
  }
};

const handleClassChange = (itemValue) => {
  setClassName(itemValue);
};

return (
  <View style={styles.innerContainer}>
    {!loading && (<KeyboardAvoidingView behavior="padding">
      <Text style={styles.label}>Class Name</Text>
      <DropDownPicker
        style={styles.picker}
        textStyle={{ color: 'black' }}
        open={classDropdownOpen}
        value={className}
        items={classOptions}
        placeholder="Select Class Name"
        setOpen={setClassDropdownOpen}
        onSelectItem={(item) => handleClassChange(item.value)}
        containerStyle={styles.dropdownContainer}
        scrollable={true}
      />
      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Subject"
        value={title}
        onChangeText={setTitle}
      />
      <View>
        <Text style={styles.label}>Selected Date:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={[styles.input, styles.selectedDateText]}
            value={formattedDate}
            editable={false}
            placeholder="Select Date of Submission"
          />
          <MaterialIcons
            name="date-range"
            size={30}
            color="black"
            style={styles.calendarIcon}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        )}
      </View>
      <Text style={styles.label}>Assignment Type:</Text>
      <DropDownPicker
        style={styles.picker}
        textStyle={{ color: 'black' }}
        open={open}
        value={submissionType}
        items={items}
        setOpen={setOpen}
        placeholder="Select Type Of Assignment"
        onSelectItem={(items) => handleTitleChange(items.value)}
        containerStyle={styles.dropdownContainer}
      />

      {submissionType === 'link' && (
        <TextInput
          style={[styles.input, styles.linkInput]}
          placeholder="Link"
          value={link}
          onChangeText={setLink}
        />
      )}
      {submissionType === 'pdf' && (
        <TouchableOpacity
          onPress={selectFile}
          style={[styles.touchableOpacity, styles.button]}
        >
          <Text style={styles.buttonText}>Select PDF File</Text>
        </TouchableOpacity>
      )}
      {selectedFile && (<Text style={styles.label}>Selected Document: {selectedFile[0].name}</Text>)}
      <TouchableOpacity
        onPress={handleCreateAssignment}
        style={[styles.touchableOpacity, styles.button]}
      >
        <Text style={styles.buttonText}>Post Assignment</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>)}
    {loading && (
      <Loading />
    )}
  </View>
);

};
export default AssignmentCreationScreen;
