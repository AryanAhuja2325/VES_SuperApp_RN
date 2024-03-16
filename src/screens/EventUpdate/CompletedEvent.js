import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Style from "./EventUpdate.styles";
import axios from "axios";
import { ip } from "../../utils/constant";
const CompletedEvent = ({ navigation }) => {
    const [mydata, setmydata] = useState([])
    useEffect(() => {
        getDatabase()
    }, [])

    const getDatabase = async () => {
        try {
            const response = await axios.get('https://' + ip + '/api/eventUpdate/completed');
            setmydata(response.data);
        } catch (error) {
            console.log('Error getting data:', error);
        }
    };

    const renderItems = ({ item }) => {
        return (
            <View>
                <View style={Style.renderView}>
                    <Text style={Style.titleText}> {item.Title} </Text>
                    <Image source={{ uri: item.Image }} style={Style.image} />
                    <View style={Style.descView}>
                        <Text style={Style.descText}> {item.Desc} </Text>
                        <Text style={Style.date}>{item.EventDate}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detail', { itemTitle: item.Title })}
                        >
                            <Text>Detail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={Style.mainView}>
            <FlatList
                data={mydata}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
export default CompletedEvent