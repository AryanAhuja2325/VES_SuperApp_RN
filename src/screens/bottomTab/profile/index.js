import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    StyleSheet,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import styles from "./Profile.styles";
import { useAppSelector, useAppDispatch } from "../../../../store/hook";
import * as COLORS from '../../../utils/color'
import axios from "axios";
import { setUserProfile } from '../../../../store/slice/profileSlice';
import { ip } from "../../../utils/constant";

const HorizontalLine = () => {
    return <View style={styles.line} />;
};

const Profile = () => {
    const user = useAppSelector(state => state.profile.data);
    const dispatch = useAppDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [curPass, setCurPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleModalVisible = () => {
        setModalVisible(!modalVisible);
    };

    const resetDataAndCloseModal = () => {
        setCurPass('');
        setNewPass('');
        setConfirmPass('');
        setModalVisible(false);
    };

    const changePass = async () => {
        try {
            setLoading(true);

            const response = await axios.post('https://' + ip + '/api/login/change-password', {
                email: user.email,
                curPass: curPass,
                newPass: newPass,
                confirmPass: confirmPass,
            });

            if (response.status === 200) {
                Alert.alert("Success", "Password changed");
                resetDataAndCloseModal();
            } else {
                Alert.alert("Error", response.data.error || "Failed to change password");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.oneFourth}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://wallpapers.com/images/hd/profile-picture-background-xyyvpmbyouhknwrk.jpg' }}
                        resizeMode="cover"
                        style={styles.image}
                    />
                </View>
            </View>
            <View
                style={styles.threeFourth}>
                <View style={styles.container}>
                    <View style={styles.anotherCard}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../../../assets/imgs/user.png')}
                                style={styles.icon}
                            />
                        </View>
                        <Text style={styles.heading}>{user.firstName} {user.lastName}</Text>
                        <Text style={styles.bottomText}>{user.email}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.heading}>Information</Text>
                        <HorizontalLine />
                        <Text style={styles.bottomText}>Phone No: {user.phoneNo}</Text>
                        {
                            user.loginType == 'Student' ? <Text style={styles.bottomText}>Gr No: {user.grNo}</Text> : null
                        }
                        {
                            user.loginType == 'Parent' ? <Text style={styles.bottomText}>Child Email: {user.child}</Text> : null
                        }
                        <Text style={styles.bottomText}>Gender: {user.gender}</Text>
                        <Text style={styles.bottomText}>Logged in as: {user.loginType}</Text>
                        <TouchableOpacity style={styles.button} onPress={toggleModalVisible}>
                            <Text style={styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    toggleModalVisible();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter your current password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Current Password"
                            value={curPass}
                            onChangeText={setCurPass}
                            placeholderTextColor={COLORS.gray}
                            color={COLORS.black}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter your new password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            value={newPass}
                            onChangeText={setNewPass}
                            placeholderTextColor={COLORS.gray}
                            color={COLORS.black}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Re-Enter your new password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Re-Enter New Password"
                            value={confirmPass}
                            onChangeText={setConfirmPass}
                            placeholderTextColor={COLORS.gray}
                            color={COLORS.black}
                            secureTextEntry
                        />
                    </View>

                    {loading ? (
                        <View style={styles.overlay}>
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#E5E4E2" />
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={changePass}>
                            <Text style={styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Modal>
        </View>
    )
}

export default Profile;

