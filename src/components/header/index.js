import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './header.styles';
import LinearGradient from 'react-native-linear-gradient';
import LineIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../../store/hook';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const CustomHeader = ({ title, navigation }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [chatvisibile, setChatvisibile] = useState(false)
    const user = useAppSelector(state => state.profile.data);
    useEffect(() => {
        checkvisibility();
        checkUser();

    }, [user]);

    const checkvisibility = () => {
        if (user.loginType === 'Parent' || user.loginType === 'Teacher') {
            setChatvisibile(true);
        } else {
            setChatvisibile(false);
        }
    }

    const checkUser = () => {
        if (user.loginType !== 'Guest') {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const renderHeader = () => {
        if (title === 'Home') {
            return (
                <LinearGradient
                    colors={['#FDFBF6', '#FADA56']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.Homecontainer}
                >

                    <Image source={require('../../assets/imgs/ves_logo_name.png')} style={{ height: responsiveHeight(4), width: responsiveWidth(40) }} />
                    <TouchableOpacity onPress={() => { navigation.navigate('Chat') }} style={styles.chaticon}>
                        {/* <Icon name="chat" size={26} color='rgb(145, 41, 40)' /> */}
                        {chatvisibile ? (

                            <Icon name="chat" size={26} color='rgb(145, 41, 40)' />
                        ) :
                            (
                                null
                            )
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        navigation.navigate('Login');
                        await AsyncStorage.removeItem("userData");
                    }} style={styles.icon}>
                        {isVisible ? (

                            <LineIcons name="power" size={26} color='rgb(145, 41, 40)' />
                        ) :
                            (
                                <Text style={styles.logintext}>Login</Text>
                            )
                        }
                    </TouchableOpacity>
                </LinearGradient>
            );
        } else {
            return (
                <LinearGradient
                    colors={['#EE5353', '#800000']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.Container}
                >
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={styles.tabIcon}>
                        <Icons name="chevron-back-sharp" size={30} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.TabTitle}>{title}</Text>
                </LinearGradient>
            );
        }

    };

    return renderHeader();
};

export default CustomHeader;