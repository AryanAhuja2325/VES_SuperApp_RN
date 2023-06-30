import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Style from "./EventUpdate.styles";

const EventUpdate = () => {
    const [mydata, setmydata] = useState([])

    useEffect(() => {
        getDatabase()
    }, [])

    const getDatabase = async () => {
        try {
            const querySnapshot = await firestore().collection('EventUpdate').get();
            const data = querySnapshot.docs.map(doc => doc.data());
            setmydata(data);
        } catch (error) {
            console.log('Error getting data:', error);
        }
    }

    const renderItems = ({ item }) => {
        return (
            <View style={Style.renderView}>
                <View style={Style.titleView}>
                    <Text style={Style.titleText}> {item.Title} </Text>
                </View>
                <View style={Style.descView}>
                    <Text style={Style.descText}> {item.Desc} </Text>
                </View>
            </View>

        )
    }

    return (
        <View style={Style.mainView}>
            <View>
            <Image source={{ uri: 'https://t4.ftcdn.net/jpg/02/16/94/65/360_F_216946587_rmug8FCNgpDCPQlstiCJ0CAXJ2sqPRU7.jpg' }}
                style={Style.image} />
            </View>
                <FlatList
                    data={mydata}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id}
                />
                
        </View>

    )
}
export default EventUpdate
