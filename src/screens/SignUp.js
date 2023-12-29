import Tts from 'react-native-tts';
import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './SignUp.style';
import * as COLOR from '../utils/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button';
import bcrypt from 'react-native-bcrypt';
import WelcomeUser from "./WelcomeUser";
// import { useAppDispatch } from '../../store/hook';
import ModalDropdown from "react-native-modal-dropdown";
import Ionicon from 'react-native-vector-icons/Ionicons'

const SignUp = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = useState('VESIT');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNo, setContactNo] = useState('');
    const [loginType, setLoginType] = useState('');
    const [address, setAddress] = useState('');
    const [grNo, setGrNo] = useState('');
    const [items, setItems] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ]);
    const [logins, setLogins] = useState([
        { label: 'Student', value: 'Student' },
        { label: 'Parent', value: 'Parent' },
        { label: 'Faculty', value: 'Faculty' },
        { label: 'TPO', value: 'TPO' },
    ]);
    const [child, setChild] = useState('');

    const [emails, setEmails] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const getEmails = async () => {
        try {
            const snapshot = await firestore().collection('Users').get();

            const emailList = snapshot.docs.map((doc) => doc.data().email);
            setEmails(emailList);
        } catch (error) { }
    };

    useEffect(() => {
        getEmails();
        regenerateCaptcha();
    }, []);

    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }

    function regenerateCaptcha() {
        setCaptchaText(generateCaptcha());
        setUserInput('');
        setIsVerified(false);
    }

    const checkCaptcha = () => {
        if (userInput == captchaText) setIsVerified(true);
        else {
            Alert.alert('Error', 'Invalid Captcha');
            regenerateCaptcha();
        }
    };

    const speakText = (text) => {
        Tts.speak(text);
    };

    const handlePress = () => {
        Tts.setDefaultLanguage('en-IN');
        for (let i = 0; i < captchaText.length; i++) {
            if (captchaText[i].toUpperCase() === captchaText[i])
                speakText(`Capital ${captchaText[i]}`)

            else {
                speakText(captchaText[i])
            }
        }
    };

    const handleTitleChange = (index, value) => {
        setSelectedItem(value);
    };

    const handleSignup = async () => {
        if (
            !email ||
            !password ||
            !confirmPassword ||
            !firstName ||
            !lastName ||
            !gender ||
            !phoneNo ||
            !loginType ||
            !isVerified
        ) {
            Alert.alert('Error', 'Fields cannot be empty');
        } else {
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Password does not match');
            } else if (emails.includes(email)) {
                Alert.alert('Error', 'User already exists');
            } else {
                const saltRounds = 5;
                try {
                    const hashedPassword = await new Promise((resolve, reject) => {
                        bcrypt.hash(password, saltRounds, (error, hash) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(hash);
                            }
                        });
                    });

                    const user = {
                        email,
                        password: hashedPassword,
                        firstName,
                        lastName,
                        gender,
                        phoneNo,
                        loginType,
                        grNo,
                        address,
                        child: loginType === 'Parent' ? child : null,
                    };

                    // Save the user document to the Firestore database
                    firestore()
                        .collection('Users')
                        .add(user)
                        .then(() => {
                            Alert.alert(
                                'Success',
                                'User created Successfully',
                                [
                                    {
                                        text: 'cancel',
                                    },
                                    {
                                        text: 'Back to Login',
                                        onPress: () => {
                                            navigation.navigate('Login');
                                        },
                                    },
                                ],
                                {
                                    cancelable: true,
                                    onDismiss: () => {
                                        setEmail('');
                                        setPassword('');
                                        setFirstName('');
                                        setLastName('');
                                        setGender('');
                                        setContactNo('');
                                        setLoginType('');
                                        setAddress('');
                                        setGrNo('');
                                        setChild('');
                                    },
                                }
                            );
                        })
                        .catch((error) => {
                            console.error('Error creating user:', error);
                        });
                } catch (error) {
                    console.error('Error hashing password:', error);
                    // Handle error during password hashing
                }
            }
        }
    };



    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.flex1}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your First Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Your Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="name@sample.com"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                        keyboardType='email-address'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>GR/ID Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="12345"
                        value={grNo}
                        onChangeText={setGrNo}
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Flat No/Building Name/Area/Pincode"
                        value={address}
                        onChangeText={setAddress}
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                        multiline
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mobile No:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="1234567890"
                        value={phoneNo}
                        onChangeText={setContactNo}
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="***"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="***"
                        secureTextEntry
                        placeholderTextColor={COLOR.gray}
                        color={COLOR.black}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Select Your Gender:</Text>
                    <RadioForm formHorizontal>
                        {items.map((option, index) => (
                            <View key={index} style={styles.radioButtonContainer}>
                                <RadioButton labelHorizontal>
                                    <RadioButtonInput
                                        obj={option}
                                        index={index}
                                        isSelected={gender === option.value}
                                        onPress={() => setGender(option.value)}
                                        borderWidth={1}
                                        buttonInnerColor={COLOR.black}
                                        buttonOuterColor={COLOR.black}
                                        buttonSize={8}
                                        buttonOuterSize={15}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginLeft: 20, marginRight: 5, top: 2 }}
                                    />

                                    <RadioButtonLabel
                                        obj={option}
                                        index={index}
                                        labelHorizontal
                                        onPress={() => setGender(option.value)}
                                        labelStyle={{ color: 'black' }}
                                        labelWrapStyle={{ marginRight: 20 }}
                                    />
                                </RadioButton>
                            </View>
                        ))}
                    </RadioForm>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Select Your Login Type:</Text>
                    <RadioForm formHorizontal>
                        {logins.map((option, index) => (
                            <View key={index} style={styles.radioButtonContainer}>
                                <RadioButton labelHorizontal>
                                    <RadioButtonInput
                                        obj={option}
                                        index={index}
                                        isSelected={loginType === option.value}
                                        onPress={() => setLoginType(option.value)}
                                        borderWidth={1}
                                        buttonInnerColor={COLOR.black}
                                        buttonOuterColor={COLOR.black}
                                        buttonSize={8}
                                        buttonOuterSize={15}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginLeft: 20, marginRight: 5, top: 2 }}
                                    />

                                    <RadioButtonLabel
                                        obj={option}
                                        index={index}
                                        labelHorizontal
                                        onPress={() => setLoginType(option.value)}
                                        labelStyle={{ color: 'black' }}
                                        labelWrapStyle={{ marginRight: 20 }}
                                    />
                                </RadioButton>
                            </View>
                        ))}
                    </RadioForm>
                </View>

                {
                    loginType == 'Parent' ?
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Your Child's Email:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Child's Email"
                                value={child}
                                onChangeText={setChild}
                                placeholderTextColor={COLOR.gray}
                                color={COLOR.black}
                            />
                        </View>
                        :
                        null
                }
                {
                    loginType == 'Student' ?
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Your Institute:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <ModalDropdown
                                    options={[
                                        "VES College of Arts, Science & Commerce (Autonomous)",
                                        "VES Institute of Technology",
                                        "VES College of Architecture",
                                        "VES College of Pharmacy",
                                        "VES POLYTECHNIC",
                                        "VES College of Law",
                                    ]}
                                    defaultValue={selectedItem}
                                    onSelect={handleTitleChange}
                                    textStyle={styles.dropdownText}
                                    dropdownStyle={styles.dropdownStyle}
                                    dropdownTextStyle={styles.dropdownTextStyle}
                                // customItemContainerStyle={{ justifyContent: 'center' }}
                                // labelStyle={{ textAlign: 'center', justifyContent: 'center' }}
                                />
                                <Ionicon name={'chevron-down'} size={20} style={{ position: 'absolute', right: 1, padding: 10 }} />
                            </View>
                        </View>
                        :
                        null
                }
                {
                    loginType == 'TPO' ?
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Your Institute:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <ModalDropdown
                                    options={[
                                        "VES College of Arts, Science & Commerce (Autonomous)",
                                        "VES Institute of Technology",
                                        "VES College of Architecture",
                                        "VES College of Pharmacy",
                                        "VES POLYTECHNIC",
                                        "VES College of Law",
                                    ]}
                                    defaultValue={selectedItem}
                                    onSelect={handleTitleChange}
                                    textStyle={styles.dropdownText}
                                    dropdownStyle={styles.dropdownStyle}
                                    dropdownTextStyle={styles.dropdownTextStyle}
                                // customItemContainerStyle={{ justifyContent: 'center' }}
                                // labelStyle={{ textAlign: 'center', justifyContent: 'center' }}
                                />
                                <Ionicon name={'chevron-down'} size={20} style={{ position: 'absolute', right: 1, padding: 10 }} />
                            </View>
                        </View>
                        :
                        null
                }

                <View style={styles.captchaContainer}>
                    <TouchableOpacity
                        onPress={handlePress}
                    >
                        <MaterialIcon name={'text-to-speech'} size={26} color={COLOR.black} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={regenerateCaptcha}>
                        <Text style={styles.captchaText}>{captchaText}</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputCaptcha}
                        value={userInput}
                        onChangeText={setUserInput}
                        placeholder='Enter captcha'
                        placeholderTextColor={COLOR.gray}
                        onEndEditing={checkCaptcha}
                        color={COLOR.black}
                    />
                    {
                        isVerified ?
                            <Icon name={'verified'} size={26} color={COLOR.blue} style={styles.icon} />
                            :
                            null
                    }

                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default SignUp;
