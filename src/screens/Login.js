import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Alert,
    KeyboardAvoidingView,
    ImageBackground,
    Modal,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../../store/hook';
import { setUserProfile, setModules } from '../../store/slice/profileSlice';
import styles from './Login.style';
import {
    teachermodule,
    studentmodule,
    guestmodule,
    parentmodule,
    TPOmodule,
    Adminmodule,
    vendorModules,
    principalModules
} from './Modules';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { black, gray } from '../utils/color';
import auth from '@react-native-firebase/auth';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import { ip } from '../utils/constant';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState();
    const [verificationId, setVerificationId] = useState();
    const [otpVisible, setOtpVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Fields cannot be empty');
        } else {
            try {
                setIsLoading(true);

                const response = await axios.post(`http://${ip}:3000/api/login`, { email, password });

                if (response.status === 200) {
                    const user = response.data.user;
                    dispatch(setUserProfile(user));

                    let modules;
                    if (user.loginType === 'Student') {
                        modules = [
                            { id: '1', title: 'Student Components', data: [...studentmodule] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    } else if (user.loginType === 'Teacher') {
                        modules = [
                            { id: '1', title: 'Teacher Components', data: [...teachermodule] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    } else if (user.loginType === 'Parent') {
                        modules = [
                            { id: '1', title: 'Parent Components', data: [...parentmodule] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    } else if (user.loginType === 'TPO') {
                        modules = [{ id: '1', title: 'TPO Components', data: [...TPOmodule] }];
                    } else if (user.loginType === 'Admin') {
                        modules = [{ id: '1', title: 'Admin Components', data: [...Adminmodule] }];
                    }
                    else if (user.loginType === 'Vendor') {
                        modules = [
                            { id: '1', title: 'Vendor Components', data: [...vendorModules] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    }
                    else if (user.loginType === 'Principal') {
                        modules = [
                            { id: '1', title: 'Vendor Components', data: [...principalModules] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    }

                    dispatch(setModules(modules));

                    navigation.navigate('HomeScreen');
                    await AsyncStorage.setItem('userData', JSON.stringify(user));
                } else {
                    if (response.data.error === 'User Not Found') {
                        Alert.alert('Error', 'User not found. Please check your email and try again.');
                    } else if (response.data.error === 'Invalid email or password') {
                        Alert.alert('Error', 'Invalid password. Please check your password and try again.');
                    } else {
                        Alert.alert('Error', response.data.error || 'Login failed');
                    }
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const toggleOtpModal = () => {
        setShowOtpModal(!showOtpModal);
    };

    const resendOtp = () => {
        sendOtp();
        setOtp();
    };

    const sendOtp = async () => {
        try {
            const response = await axios.post(`http://${ip}:3000/api/login/getUserByEmail`, { email });

            if (response.status === 200) {
                const user = response.data.user;

                const confirmation = await auth().signInWithPhoneNumber('+91' + user.phoneNo);
                setVerificationId(confirmation);

                Alert.alert('Success', 'OTP has been sent to your registered mobile number');
                setOtpVisible(true);
            } else {
                Alert.alert('Error', 'User not found');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Cannot Send OTP right now, Please try again later');
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const confirmation = await verificationId.confirm(otp);

            if (confirmation) {
                const response = await axios.post(`http://${ip}:3000/api/login/getUserByEmail`, { email });

                if (response.status === 200) {
                    const user = response.data.user;

                    dispatch(setUserProfile(user));

                    let modules;
                    if (user.loginType === 'Student') {
                        modules = [
                            { id: '1', title: 'Student Components', data: [...studentmodule] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    } else if (user.loginType === 'Teacher') {
                        modules = [
                            { id: '1', title: 'Teacher Components', data: [...teachermodule] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    } else if (user.loginType === 'Parent') {
                        modules = [
                            { id: '1', title: 'Parent Components', data: [...parentmodule] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    } else if (user.loginType === 'TPO') {
                        modules = [{ id: '1', title: 'TPO Components', data: [...TPOmodule] }];
                    } else if (user.loginType === 'Admin') {
                        modules = [{ id: '1', title: 'Admin Components', data: [...Adminmodule] }];
                    }
                    else if (user.loginType === 'Vendor') {
                        modules = [
                            { id: '1', title: 'Vendor Components', data: [...vendorModules] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    }
                    else if (user.loginType === 'Principal') {
                        modules = [
                            { id: '1', title: 'Vendor Components', data: [...principalModules] },
                            { id: '2', title: 'Basic Components', data: [...guestmodule] },
                        ];
                    }

                    dispatch(setModules(modules));

                    navigation.navigate('HomeScreen');
                    await AsyncStorage.setItem('userData', JSON.stringify(user));
                } else {
                    Alert.alert('Error', 'User not found');
                }
            } else {
                Alert.alert('Error', 'Invalid OTP');
            }
        } catch (error) {
            console.error('Otp====>>>', otp);
            console.error('Error====>>>', error);
            Alert.alert('Error', 'Invalid OTP');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.backgroundView}>
                <ImageBackground
                    source={require('../assets/imgs/Swami_Login.png')}
                    style={styles.logo}>
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
                            navigation.navigate('SignUp');
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

                    {otpVisible ? (
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
                    ) : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={sendOtp}
                        >
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Modal>
            {isLoading && (
                <View style={styles.overlay}>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#E5E4E2" />
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

export default Login;
