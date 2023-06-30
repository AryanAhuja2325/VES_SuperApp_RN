import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNo, setContactNo] = useState('');
    const [loginType, setLoginType] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [items, setItems] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ]);
    const [logins, setLogins] = useState([
        { label: 'Student', value: 'Student' },
        { label: 'Parent', value: 'Parent' },
        { label: 'Faculty', value: 'Faculty' }
    ]);

    const handleSignup = () => {
        // Perform signup logic here
        // Create a user document in the Firestore database with the entered details
        const user = {
            email,
            password,
            firstName,
            lastName,
            gender,
            phoneNo,
            loginType
        };

        // Save the user document to the Firestore database
        firestore()
            .collection('Users')
            .add(user)
            .then(() => {
                Alert.alert(
                    "Success",
                    "User created Successfully",
                    [
                        {
                            text: 'Ok'
                        },
                        {
                            text: "Go to Login Screen",
                            onPress: () => { navigation.navigate("Login") }
                        }
                    ],
                    [
                        {
                            cancelable: true
                        }
                    ]

                )

                // Handle successful signup, such as navigating to the login screen
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                // Handle error during signup
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SignUp</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <DropDownPicker
                style={styles.picker}
                textStyle={{ color: '#C7C7CD' }}
                placeholder='Select your gender'
                dropDownDirection="TOP"
                open={open}
                value={gender}
                items={items}
                setOpen={setOpen}
                setValue={setGender}
                setItems={setItems}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={phoneNo}
                onChangeText={setContactNo}
            />

            <DropDownPicker
                style={styles.picker}
                textStyle={{ color: '#C7C7CD' }}
                placeholder='Select your login type'
                open={open1}
                value={loginType}
                items={logins}
                setOpen={setOpen1}
                setValue={setLoginType}
                setItems={setLogins}
            />

            <View
                style={{ flexDirection: 'row' }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignup}
                >
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => { navigation.navigate("Login") }}
                >
                    <Text style={styles.buttonText}>Go back to Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#380000'
    },

    picker: {
        height: 40,
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 20,
    },

    heading: {
        color: 'white',
        fontSize: 30,
        marginBottom: 50
    },

    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#fff'
    },

    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 20
    },

    button1: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 20
    },


});

export default SignUp;
