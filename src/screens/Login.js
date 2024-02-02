import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, KeyboardAvoidingView, ImageBackground, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../../store/hook';
import { setUserProfile, setModules } from '../../store/slice/profileSlice';
import styles from './Login.style';
import modules from './Modules';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { black, gray } from '../utils/color';
import { teachermodule, studentmodule, guestmodule, parentmodule, TPOmodule, Adminmodule } from './Modules';
import { compare } from 'react-native-bcrypt';
import auth from '@react-native-firebase/auth'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState();
    const [verificationId, setVerificationId] = useState();
    const [otpVisible, setOtpVisible] = useState(false);

    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Fields cannot be empty");
        } else {
            const users = firestore().collection('Users');

            const querySnapshot = await users
                .where('email', '==', email)
                .limit(1)
                .get();

            if (querySnapshot.empty) {
                Alert.alert("Error", "User not found");
                return;
            }

            const user = querySnapshot.docs[0].data();
            const hashedPassword = user.password;

            compare(password, hashedPassword, async (error, isMatch) => {
                if (isMatch) {
                    dispatch(setUserProfile(user));
                    if (user.loginType == 'Student') {
                        dispatch(setModules([
                            {
                                id: '1',
                                title: 'Student Components',
                                data: [...studentmodule]
                            },
                            {
                                id: '2',
                                title: 'Basic Components',
                                data: [...guestmodule]
                            }
                        ]));
                    }
                    else if (user.loginType == 'Teacher') {
                        dispatch(setModules([
                            {
                                id: '1',
                                title: 'Teacher Components',
                                data: [...teachermodule]
                            },
                            {
                                id: '2',
                                title: 'Basic Components',
                                data: [...guestmodule]
                            }
                        ]));
                    }
                    else if (user.loginType == 'Parent') {
                        dispatch(setModules([
                            {
                                id: '1',
                                title: 'Parent Components',
                                data: [...parentmodule]
                            },
                            {
                                id: '2',
                                title: 'Basic Components',
                                data: [...guestmodule]
                            }
                        ]));
                    }
                    else if (user.loginType == 'TPO') {
                        dispatch(setModules([
                            {
                                id: '1',
                                title: 'TPO Components',
                                data: [...TPOmodule]
                            },
                        ]));    
                    }
                    else if (user.loginType == 'Admin') {
                        dispatch(setModules([
                            {
                                id: '1',
                                title: 'Admin Components',
                                data: [...Adminmodule]
                            }]))
                    }

                    navigation.navigate('HomeScreen');
                    await AsyncStorage.setItem("userData", JSON.stringify(user));
                } else {
                    Alert.alert("Error", "Invalid email or password");
                }
            });
        }
    };

    const toggleOtpModal = () => {
        setShowOtpModal(!showOtpModal);
    };

    const resendOtp = () => {
        sendOtp()
        setOtp()
    }
    const sendOtp = async () => {
        try {
            const users = firestore().collection('Users');

            const querySnapshot = await users
                .where('email', '==', email)
                .limit(1)
                .get();

            if (querySnapshot.empty) {
                Alert.alert("Error", "User not found");
                return;
            }

            const user = querySnapshot.docs[0].data();

            const confirmation = await auth().signInWithPhoneNumber('+91' + user.phoneNo);
            setVerificationId(confirmation);

            Alert.alert("Success", "OTP has been sent to your registered mobile number");
            setOtpVisible(true);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Cannot Send OTP right Now, Please try again later")
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const confirmation = await verificationId.confirm(otp)

            if (confirmation) {
                const users = firestore().collection('Users');

                const querySnapshot = await users
                    .where('email', '==', email)
                    .limit(1)
                    .get();

                const user = querySnapshot.docs[0].data();

                dispatch(setUserProfile(user));
                if (user.loginType == 'Student') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'Student Components',
                            data: [...studentmodule]
                        },
                        {
                            id: '2',
                            title: 'Basic Components',
                            data: [...guestmodule]
                        }
                    ]));
                }
                else if (user.loginType == 'Teacher') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'Teacher Components',
                            data: [...teachermodule]
                        },
                        {
                            id: '2',
                            title: 'Basic Components',
                            data: [...guestmodule]
                        }
                    ]));
                }
                else if (user.loginType == 'Parent') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'Parent Components',
                            data: [...parentmodule]
                        },
                        {
                            id: '2',
                            title: 'Basic Components',
                            data: [...guestmodule]
                        }
                    ]));
                }
                else if (user.loginType == 'TPO') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'TPO Components',
                            data: [...TPOmodule]
                        },
                    ]));
                }
                else if (user.loginType == 'Admin') {
                    dispatch(setModules([
                        {
                            id: '1',
                            title: 'Admin Components',
                            data: [...Adminmodule]
                        },
                    ]));
                }

                navigation.navigate('HomeScreen');
                await AsyncStorage.setItem("userData", JSON.stringify(user));
            } else {
                Alert.alert('Error', 'Invalid OTP');
            }
        } catch (error) {
            console.log('Otp====>>>', otp);
            console.log('Error====>>>', error);
            Alert.alert('Error', 'Invalid OTP');
        }
    };



    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.backgroundView}>
                <ImageBackground
                    source={require('../assets/imgs/Swami_Login.png')}
                    style={styles.logo}
                >
                    <View style={styles.logoView}>
                        <Image
                            source={require('../assets/imgs/ves_logo_name.png')}
                            style={styles.logoImg}
                        />
                    </View>


                </ImageBackground>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>WELCOME TO VES APP</Text>
            </View>
            <View style={styles.inputView}>
                <View style={styles.inputiconView}>
                    <FontAwesome name={'user-circle-o'} size={20} color={black} style={styles.usericon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={'grey'}
                        keyboardType='email-address'

                    />
                </View>

                <View style={styles.inputiconView}>
                    <Fontisto name={'locked'} size={20} color={black} style={styles.lockicon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={!visible}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={'grey'}
                    />

                    <TouchableOpacity style={styles.eyeicon} onPress={() => {
                        setVisible(!visible);
                    }}>
                        <MaterialIcons name={visible ? 'visibility' : 'visibility-off'} size={25} color={black} />
                    </TouchableOpacity>
                </View>
                <Text></Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleOtpModal}
                >
                    <Text style={styles.buttonText}>Login using OTP</Text>
                </TouchableOpacity>
                <View style={styles.inputiconView}>
                    <Text style={styles.nullaccount}>Don't have an account? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SignUp");
                        }}
                    >
                        <Text style={styles.lower}>Signup!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                visible={showOtpModal}
                onRequestClose={() => {
                    toggleOtpModal();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Your Email:</Text>
                        <TextInput
                            style={styles.otpInput}
                            placeholder="name@sample.com"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor={gray}
                            color={black}
                        />
                    </View>

                    {
                        otpVisible ?
                            <View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Enter OTP:</Text>
                                    <TextInput
                                        style={styles.otpInput}
                                        placeholder="Enter OTP Sent to your verified number"
                                        value={otp}
                                        onChangeText={setOtp}
                                        placeholderTextColor={gray}
                                        color={black}
                                        keyboardType='phone-pad'
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleVerifyOTP}
                                >
                                    <Text style={styles.buttonText}>Verify and Login</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={sendOtp}
                                >
                                    <Text style={styles.buttonText}>Resend OTP</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity
                                style={styles.button}
                                onPress={sendOtp}
                            >
                                <Text style={styles.buttonText}>Send OTP</Text>
                            </TouchableOpacity>
                    }
                </View>
            </Modal>

        </KeyboardAvoidingView>
    );
};

export default Login;
