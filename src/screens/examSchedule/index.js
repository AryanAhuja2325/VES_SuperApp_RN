import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    Alert,
    TextInput,
    TouchableOpacity,
    FlatList,
    Linking
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './examSchedule.styles';
import { useAppSelector } from '../../../store/hook';
import DocumentPicker from 'react-native-document-picker';
import * as COLORS from '../../utils/color'
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewIcon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const Exam = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [institute, setInstitute] = useState('')
    const [visibleModal, setVisibleModal] = useState(false);
    const [fileUri, setFileUri] = useState('');
    const [fileName, setFileName] = useState('');
    const [addBtnVisible, setAddBtnVisible] = useState(false)
    const [exams, setExams] = useState([]);

    const user = useAppSelector(state => state.profile.data)

    const HorizontalLine = () => {
        return <View style={styles.line} />;
    };

    const handleUploadPDF = async () => {
        try {
            const documentPickerResponse = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
            });

            const fileName = documentPickerResponse.name;
            setFileName(fileName);
            const fileUri = documentPickerResponse.uri;

            setFileUri(fileUri);
            setAddBtnVisible(true);
        } catch (error) {
            console.log('Error uploading PDF:', error);
        }
    };

    const handleAddPdf = async () => {
        try {
            const formData = new FormData();
            formData.append('uploadedBy', user.email);
            formData.append('title', title);
            formData.append('institute', institute);
            formData.append('file', {
                uri: fileUri,
                name: fileName,
                type: 'application/pdf',
            });

            await axios.post('http://192.168.56.1:3000/api/examSchedule/upload-pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Success', 'File uploaded successfully');
            setVisibleModal(false);
        } catch (error) {
            console.log('Error uploading PDF:', error);
        }
    };




    const getData = async () => {
        try {
            const userType = user.loginType;
            const institute = user.institute;

            const response = await axios.get(`http://192.168.56.1:3000/api/examSchedule/getData?loginType=${userType}&institute=${institute}`);
            console.log(response.data)
            setExams(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const deleteDoc = async (id) => {
        Alert.alert(
            "Warning",
            "Are you sure you want to delete this Document",
            [
                {
                    text: "Yes, I'm sure",
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.56.1:3000/api/examSchedule/deleteDoc/${id}`);
                            Alert.alert("Success", "Document deleted successfully");
                            getData(); // Refresh the data after deletion
                        } catch (error) {
                            console.log('Error deleting document:', error);
                        }
                    },
                    style: 'destructive',
                },
                {
                    text: "No, Cancel",
                    style: 'cancel',
                }
            ],
            { cancelable: false }
        );
    }



    const displayCards = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.cardTitle}>{item.title} - {item.institute}</Text>
                    {user.loginType === 'Teacher' ? (
                        <TouchableOpacity onPress={() => deleteDoc(item._id)}>
                            <Icon name='delete' size={26} color={COLORS.black} />
                        </TouchableOpacity>
                    ) : null}
                </View>
                <HorizontalLine />
                <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => {
                        Linking.openURL(item.url);
                    }}
                >
                    <NewIcon name='pdffile1' color={COLORS.black} size={40} />
                    <Text style={styles.downloadButtonText}>Click here to download</Text>
                </TouchableOpacity>
                <Text style={styles.cardInfo}>Uploaded by: {item.uploadedBy}</Text>
                <Text style={styles.cardInfo}>
                    Uploaded on: {formatDate(item.uploadedOn)}
                </Text>
                {user.loginType === 'Teacher' ? <Text style={styles.cardInfo}>Institute: {item.institute}</Text> : null}
            </View>
        );
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };



    return (
        <View style={styles.main}>
            <FlatList
                data={exams}
                keyExtractor={(item, index) => index}
                renderItem={displayCards}
            />

            {
                user.loginType == 'Teacher' ?
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => setVisibleModal(true)} style={styles.addButtonMain}>
                            <Text style={styles.addButtonLabel}>Add Document</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }

            <Modal
                visible={visibleModal}
                animationType="slide"
                transparent
                onRequestClose={() => setVisibleModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Document</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor={COLORS.gray}
                            color={COLORS.black}
                            value={title}
                            onChangeText={setTitle}
                        />

                        <ModalDropdown
                            options={[
                                "VESP", "VESIT"
                            ]}
                            style={styles.dropdown}
                            value={institute}
                            textStyle={styles.dropdownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(index, value) => setInstitute(value)}
                            initialScrollIndex={0}
                        />

                        <TouchableOpacity style={styles.addButton} onPress={handleUploadPDF}>
                            <Text style={styles.addButtonLabel}>Select Document</Text>
                        </TouchableOpacity>
                        {
                            addBtnVisible ?
                                <View>
                                    <Text style={styles.text}>{`Selected ${fileName}`}</Text>
                                    <TouchableOpacity style={styles.addButton} onPress={handleAddPdf}>
                                        <Text style={styles.addButtonLabel}>Upload Document</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Exam;
