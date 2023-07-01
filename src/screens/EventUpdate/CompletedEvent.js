import React, { useEffect,useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Style from "./EventUpdate.styles";
const CompletedEvent = () => {
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
        const firestoreTimestamp = item.Eventdate;
        const firestoreDate = firestoreTimestamp && firestoreTimestamp.toDate ? firestoreTimestamp.toDate() : null;
        const currentDate = new Date();
        if (firestoreDate && firestoreDate.getTime() < currentDate.getTime() || item.Eventdate > currentDate.getTime()) {
            console.log('Rendering item:', item);
            return (
                <View>
                    <View>
                        <Image source={{ uri: item.Image }}
                            style={Style.image} />
                    </View>
                    <View style={Style.renderView}>
                        <View style={Style.titleView}>
                            <Text style={Style.titleText}> {item.Title} </Text>
                        </View>
                        <View style={Style.descView}>
                            <Text style={Style.descText}> {item.Desc} </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Detail', { itemTitle: item.Title })}>
                                <Text>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            )
        }
        return null;
    }
    return (
        <View style={Style.mainView}>
            <View style={Style.view}>
                <Text style={Style.text}>Completed Events!!</Text>
            </View>

            <FlatList
                data={mydata}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
export default CompletedEvent