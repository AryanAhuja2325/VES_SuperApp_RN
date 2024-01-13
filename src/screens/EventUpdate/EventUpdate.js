import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Style from "./EventUpdate.styles";
import { useAppSelector } from "../../../store/hook";
import axios from "axios";

const EventUpdate = ({ navigation }) => {
    const [mydata, setmydata] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const user = useAppSelector(state => state.profile.data);

    useEffect(() => {
        getEventData();
        checkUser();
    }, []);

    const getEventData = async () => {
        try {
            const response = await axios.get('http://192.168.56.1:3000/api/eventUpdate');
            setmydata(response.data);
        } catch (error) {
            console.log('Error getting data:', error);
        }
    };

    const checkUser = () => {
        if (user.loginType === 'Teacher') {
            setIsVisible(true);
        }
    };

    const renderItems = ({ item }) => {
        const eventDate = new Date(item.Eventdate);
        const currentDate = new Date();

        if (eventDate && eventDate > currentDate) {
            return (
                <View>
                    <View style={Style.renderView}>
                        <Text style={Style.titleText}> {item.Title} </Text>
                        <Image source={{ uri: item.Image }} style={Style.image} />
                        <View style={Style.descView}>
                            <Text style={Style.descText}> {item.Desc} </Text>
                            <Text style={Style.date}>{eventDate.toLocaleDateString()}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemTitle: item.Title })}>
                                <Text>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }

        return null;
    };


    return (
        <View style={Style.mainView}>
            <FlatList
                data={mydata}
                renderItem={renderItems}
                keyExtractor={(item) => item._id}
            />
            {isVisible && (
                <TouchableOpacity
                    style={Style.button}
                    onPress={() => navigation.navigate('AddEvent')}>
                    <Text style={Style.text}>Add Event</Text>
                </TouchableOpacity>
            )
            }
            <Text></Text>
            <TouchableOpacity
                style={Style.button}
                onPress={() => navigation.navigate('CompletedEvent')}>
                <Text style={Style.text}>Completed Events</Text>
            </TouchableOpacity>

        </View>

    )
}
export default EventUpdate
