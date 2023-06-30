import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, KeyboardAvoidingView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAppDispatch } from '../../store/hook';
import { setUserProfile } from '../../store/slice/profileSlice';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();



    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Fields cannot be empty")
        }

        else {
            const users = firestore().collection('Users');

            const querySnanpshot = await users
                .where('email', '==', email)
                .where('password', '==', password)
                .get();

            if (querySnanpshot.size == 1) {
                console.log("Logged In")
                const user = querySnanpshot.docs[0].data();
                dispatch(setUserProfile(user));
                navigation.navigate('Home')
            }

            else {
                Alert.alert("Error", "User not found");
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image
                source={require('../assets/imgs/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>VES Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'grey'}
            />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!visible}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={'grey'}
                />
                <TouchableOpacity
                    onPress={() => {
                        setVisible(!visible);
                    }}
                >
                    <Image
                        source={require('../assets/imgs/eye.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                <Text style={styles.lower}>Don't have an account. Create a new Account here!</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#380000'
    },

    lower: {
        fontSize: 15,
        color: 'grey'
    },

    logo: {
        width: 100,
        height: 150,
        resizeMode: 'stretch'
    },

    icon: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 10
    },

    text: {
        color: '#D3D3D3',
        fontSize: 40,
        marginBottom: 80
    },

    bottomText: {
        color: '#606060',
        fontSize: 15,
        marginTop: 20
    },

    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF'
    },

    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
