import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image,TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Style from './EventUpdate.styles';

const Detail = ({ route }) => {
    const { itemTitle } = route.params;
     console.log(itemTitle)
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await firestore()
                    .collection('EventUpdate')
                    .where('Title', '==', itemTitle)
                    .get();
                const results = [];
                querySnapshot.forEach((doc) => {
                    results.push(doc.data());
                });

                setData(results);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const renderItems = ({ item }) => {
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
                        <Text style={Style.descText}> {item.Detail} </Text>
                    </View>
                </View>
            </View>

        )
    }
    return (
        <View>
            <View style={Style.view}>
            <Text style={Style.text}>Detail</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default Detail;