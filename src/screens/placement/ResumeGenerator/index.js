import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal, Image } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import styles from './ResumeGenerator.styles';
import ModalDropdown from "react-native-modal-dropdown";
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';


const ResumeGenerator = ({ navigation }) => {
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        fatherName: '',
        phoneNumber: '',
        email: '',
        linkedinProfile: '',
        summary: '',
    });
    const [imageUri, setImageUri] = useState('');
    const [skills, setSkills] = useState(['']);
    const [projects, setProjects] = useState(['']);
    const [certifications, setCertifications] = useState(['']);
    const [languages, setLanguages] = useState(['']);
    const [hobbies, setHobbies] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [newEducation, setNewEducation] = useState({
        type: '',
        name: '',
        course: '',
        completionYear: "Select completion year",
    });

    const [education, setEducation] = useState([]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const addEducation = () => {
        if (
            newEducation.type === '' ||
            newEducation.completionYear === '' ||
            newEducation.name === ''
        ) {
            return;
        }

        setEducation([...education, { ...newEducation }]);

        setNewEducation({
            type: '',
            name: '',
            course: '',
            completionYear: '',
        });

        setModalVisible(false);
    };

    const generateYears = () => {
        const startYear = 1980;
        const endYear = 2050;
        const years = [];

        for (let year = startYear; year <= endYear; year++) {
            years.push(year.toString());
        }

        return years;
    };

    const selectImage = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                cropperCircleOverlay: true,
            });

            // Upload the image to Firebase Storage
            await uploadImageToFirebase(image.path);
        } catch (error) {
            console.log('ImagePicker Error: ', error);
        }
    };


    const yearOptions = generateYears();

    const uploadImageToFirebase = async (imagePath) => {
        const reference = storage().ref(`/images/${new Date().getTime()}.jpg`);
        const task = reference.putFile(imagePath);

        try {
            await task;
            const downloadURL = await reference.getDownloadURL();
            setImageUri(downloadURL); // Update the state with the download URL
            console.log('Image uploaded and URL:', downloadURL);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const generateResumePDF = async () => {
        console.log(imageUri);
        const additionalFieldsToHTML = (fields) => {
            return `
        <ul>
            ${fields.map((field, index) => `<li>${field}</li>`).join('')}
        </ul>`;
        };

        const htmlContent = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume Generator</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            color: #333;
            background-color: #fff;
            padding: 20px;
        }

        h1, h2 {
            color: #3F84B3;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 20px;
        }

        p {
            margin-bottom: 5px;
            margin-top: 0; /* Reduce margin-top */
        }

        .headdiv {
            display: flex;
            flex-direction: row;
            justify-items: baseline;
            padding: 10px;
            background-color: #3F84B3;
            color: white;
            border-radius: 4px;
            margin-bottom: 20px;
        }

        .headdiv img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-right: 20px;
        }

        .headdiv h1 {
            font-size: 28px;
            margin-left: 50px;
            color: white;
            align-self: center;
        }

        .column {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .column > div {
            width: 48%;
            margin-bottom: 20px; /* Add margin-bottom for gap between columns */
        }

        .field {
            background-color: #fff;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 10px;
        }

        .field p {
            margin: 0;
            margin-top: 0; /* Reduce margin-top */
        }

        .field h2 {
            margin-bottom: 10px;
            font-size: 18px; /* Adjust font size */
        }

        .field p strong {
            font-weight: bold;
        }

        .summary {
            background-color: #fff;
            border-radius: 4px;
            margin-bottom: 20px;
            margin-left=0px;
            padding-top:15px;
        }

        hr {
            border: 1px solid #ccc;
            margin: 20px 0;
        }
        .contact{
            margin-top: 10px;
            margin-bottom: 30px;
            margin-left: 5px;
        }
        .name {
            display: flex;
            flex-direction: row;
            justify-items: baseline;
        }

        .name i {
            margin-right: 10px;
        }
        .mail i {
            margin-right: 7px;
        }

        a{
            color:black;
            text-decoration:none;
        }
    </style>
</head>
<body>
    <div class="headdiv">
    ${imageUri && `<img src="${imageUri}" alt="Your Image" />`}
    <h1>${personalInfo.name}</h1>
</div>

<div class="summary">
    <h2>Professional Summary</h2>
    <p>
        ${personalInfo.summary}
    </p>
</div>
<div class="contact">
        <h2>Contact</h2>
        <div class="name">
            <i class="fa fa-user"></i>
            <p>${personalInfo.name}, </p>
        </div>
        <div class="name">
            <i class="fa fa-phone"></i>
            <p>${personalInfo.phoneNumber}</p>
        </div>
        <div class="name mail">
            <i class="fa fa-envelope"></i>
            <p><a href="mailto:personalInfo.email">${personalInfo.email}</a></p>
        </div>
        <div class="name">
            <i class="fa fa-linkedin"></i>
            <p><a href="${personalInfo.linkedinProfile}" target="_blank">${personalInfo.linkedinProfile}</a></p>
        </div>
    </div>
<div class="column">
    <div>
        <div class="field">
            <h2>Education</h2>
            <!-- Render existing education information -->
            ${education.length > 0 ?
                '<ul>' + education.map((edu, index) => `
                    <li key=${index}>
                        ${edu.course ? `<p><strong>${edu.course}</strong></p>` : ''}
                        <p>${edu.name}</p>
                        <p>${edu.completionYear}</p>
                    </li>
                `).join('') + '</ul>'
                : '<p>No education information available</p>'
            }
        </div>
        <div class="field">
            <h2>Certifications</h2>
            ${certifications.length > 0 ?
                '<ul>' + certifications.map((cert, index) => `
                    <li key=${index}>
                        <p><strong>${cert}</strong></p>
                    </li>
                `).join('') + '</ul>'
                : '<p>No certifications available</p>'
            }
        </div>
    </div>
    <div>
        <div class="field">
            <h2>Skills</h2>
            ${skills.length > 0 ?
                '<ul>' + skills.map((skill, index) => `<li key=${index}><strong>${skill}</strong></li>`).join('') + '</ul>'
                : '<p>No skills available</p>'
            }
        </div>
    </div>
    <div>
        <div class="field">
            <h2>Projects</h2>
            ${projects.length > 0 ?
                '<ul>' + projects.map((project, index) => `<li key=${index}><strong>${project}</strong></li>`).join('') + '</ul>'
                : '<p>No projects available</p>'
            }
        </div>
    </div>
    <div>
            <div class="field">
                <h2>Languages</h2>
                ${projects.length > 0 ?
                '<ul>' + languages.map((project, index) => `<li key=${index}><strong>${project}</strong></li>`).join('') + '</ul>'
                : '<p>No projects available</p>'
            }
            </div>
    </div>
</div>
<footer style="position: fixed; bottom: 20px; right: 20px; color: #666; font-size: 12px;">
        Created by VES App
    </footer>
</body>
</html>


    `;

        const outputPath = `${RNFS.DownloadDirectoryPath}/resume.pdf`;

        try {
            const { filePath } = await RNHTMLtoPDF.convert({
                html: htmlContent,
                fileName: 'resume',
                directory: '',
                outputPath,
            });

            console.log('PDF generated:', outputPath);

            await RNFS.moveFile(filePath, outputPath);
            Alert.alert('Success', 'Resume generated successfully. Check your phone storage!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Error', 'Can\'t generate Resume');
        }
    };

    const renderAdditionalFields = (state, setState, placeholder, title) => {
        return state.map((value, index) => (
            <View key={index} style={styles.additionalFieldContainer}>
                <TextInput
                    style={styles.additionalField}
                    placeholder={`${placeholder} ${index + 1}`}
                    value={value}
                    onChangeText={(text) => {
                        const updatedState = [...state];
                        updatedState[index] = text;
                        setState(updatedState);
                    }}
                />
                {index > 0 && (
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => {
                            const updatedState = [...state];
                            updatedState.splice(index, 1);
                            setState(updatedState);
                        }}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                )}
            </View>
        ));
    };

    const addAdditionalField = (setState) => {
        setState((prevState) => [...prevState, '']);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Personal Information Section */}
            <View>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    value={personalInfo.name}
                    onChangeText={(text) => setPersonalInfo({ ...personalInfo, name: text })}
                />

                <View>
                    <Text style={styles.label}>Profile Image</Text>
                    {imageUri ? (
                        <View>
                            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                            <TouchableOpacity onPress={selectImage} style={styles.button}>
                                <Text style={styles.buttonText}>Reselect Image</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={selectImage} style={styles.button}>
                            <Text style={styles.buttonText}>Select Image</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.label}>Father Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="John Doe Sr."
                    value={personalInfo.fatherName}
                    onChangeText={(text) => setPersonalInfo({ ...personalInfo, fatherName: text })}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="123-456-7890"
                    value={personalInfo.phoneNumber}
                    onChangeText={(text) => setPersonalInfo({ ...personalInfo, phoneNumber: text })}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="john.doe@example.com"
                    value={personalInfo.email}
                    onChangeText={(text) => setPersonalInfo({ ...personalInfo, email: text })}
                />

                <Text style={styles.label}>Linkedin Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="linkedin.com/in/johndoe"
                    value={personalInfo.linkedinProfile}
                    onChangeText={(text) => setPersonalInfo({ ...personalInfo, linkedinProfile: text })}
                />

                <Text style={styles.label}>Summary</Text>
                <TextInput
                    style={styles.input}
                    placeholder="A brief summary about yourself..."
                    multiline
                    value={personalInfo.summary}
                    onChangeText={(text) => setPersonalInfo({ ...personalInfo, summary: text })}
                />
            </View>

            {/* Academic Information Section */}
            <View>
                <Text style={styles.label}>Education</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleModal}
                >
                    <Text style={styles.buttonText}>Add Education</Text>
                </TouchableOpacity>
                {/* Render existing education information */}
                {education.map((edu, index) => (
                    <View style={styles.eduContainer} key={index}>
                        <Text>{edu.type}</Text>
                        <Text>{edu.name}</Text>
                        {edu.course && <Text>{edu.course}</Text>}
                        <Text>{edu.completionYear}</Text>
                    </View>
                ))}
            </View>

            {/* Extras Section */}
            <View>
                <Text style={styles.label}>Skills</Text>
                {renderAdditionalFields(skills, setSkills, 'Skill', 'Skills')}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addAdditionalField(setSkills)}
                >
                    <Text style={styles.buttonText}>Add Skill</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Projects</Text>
                {renderAdditionalFields(projects, setProjects, 'Project', 'Projects')}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addAdditionalField(setProjects)}
                >
                    <Text style={styles.buttonText}>Add Project</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Certification</Text>
                {renderAdditionalFields(certifications, setCertifications, 'Certification', 'Certifications')}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addAdditionalField(setCertifications)}
                >
                    <Text style={styles.buttonText}>Add Certification</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Languages</Text>
                {renderAdditionalFields(languages, setLanguages, 'Language', 'Languages')}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addAdditionalField(setLanguages)}
                >
                    <Text style={styles.buttonText}>Add Language</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button2}
                onPress={generateResumePDF}
            >
                <Text style={styles.buttonText}>Generate PDF</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Add Education</Text>

                        <Text style={styles.label}>Type</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., School, College"
                            value={newEducation.type}
                            onChangeText={(text) => setNewEducation({ ...newEducation, type: text })}
                        />
                        <Text style={styles.label}>Institute Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="eg Vivekanad Education Society's Polytechnic"
                            value={newEducation.name}
                            onChangeText={(text) => setNewEducation({ ...newEducation, name: text })}
                        />
                        <Text style={styles.label}>Course</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="eg BE in Computer Engineering"
                            value={newEducation.course}
                            onChangeText={(text) => setNewEducation({ ...newEducation, course: text })}
                        />
                        <Text style={styles.label}>Completion Year</Text>
                        <ModalDropdown
                            options={yearOptions}
                            defaultValue="Select completion year"
                            defaultIndex={0}
                            onSelect={(index) => {
                                const selectedYear = yearOptions[index];
                                setNewEducation({ ...newEducation, completionYear: selectedYear });
                            }}
                            textStyle={styles.dropdownText}
                            dropdownStyle={styles.dropdownStyle}
                            dropdownTextStyle={styles.dropdownTextStyle}
                            customItemContainerStyle={{ justifyContent: 'center' }}
                            labelStyle={{ textAlign: 'center', justifyContent: 'center' }}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={addEducation}
                        >
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={toggleModal}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};


export default ResumeGenerator;