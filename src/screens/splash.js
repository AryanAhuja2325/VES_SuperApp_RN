import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../store/hook';
import { setModules, setUserProfile } from '../../store/slice/profileSlice';
import styles from './splash.style';
import modules from './Modules';


const Splash = () => {

    const dispatch = useAppDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        checkFirstTime();
    }, []);

    const checkFirstTime = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const user = JSON.parse(userData);
            dispatch(setUserProfile(user));

            if (userData == null) {
                setTimeout(() => {
                    navigation.navigate("Login", { modules: modules });
                }, 2000)
            } else {
                const filtered = modules.filter((module) =>
                    module.login.includes(user.loginType));

                dispatch(setModules(filtered));

                setTimeout(() => {
                    navigation.navigate("HomeScreen");
                }, 1000);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.splashview}>
                <Image source={require('../assets/imgs/logo.png')}
                    style={styles.logo} />
            </View>
            <View style={styles.loadingview}>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        </SafeAreaView >
    );
};

export default Splash;

