import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Alert,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { useAppSelector } from '../../store/hook';


const Card = ({ title }) => {
    return (
        <View style={styles.card1}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const Home = ({ navigation }) => {
    
    const user = useAppSelector(state => state.profile.data);
    const [apiData, setData] = useState([]);
    //     Alumni and Mentorship
    //     Attendance
    // Events Update
    // Enquiry Management / FAQs / Feedback
    //     Fees
    //     PhotoGallery
   
    const modules = [
        {
            id: 1,
            title: 'Alumni and Mentorship',
        },
        {
            id: 2,
            title: 'Attendance'
        },
        {
            id: 3,
            title: 'Events Update'
        },
        {
            id: 4,
            title: 'Enquiry Management'
        },
        {
            id: 5,
            title: 'Fees'
        },
        {
            id: 6,
            title: 'Photo Gallery'
        },
        {
            id: 7,
           
             title:"About Us"
             
        },
    ]
    
    

   
    useEffect(() => {
        console.log(user)
    }, []);

    // const getData = () => {
    //     fetch('https://myjsons.com/v/39e41248')
    //         .then(data => data.json())
    //         .then(response => {
    //             setData(response)
    //         })
    //         .catch(error => {
    //             Alert.alert("Warning")
    //         })
    // }
   
    
    const renderCard = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={() => {
                    if (item.title == 'Attendance') {
                        if (user.loginType == 'Teacher') {
                            navigation.navigate("Attendance")
                        }

                        else {
                            Alert.alert("Warning", "You are not allowed to access this feature")
                        }
                    }
                    else if(item.title =='About Us')
                    navigation.navigate("AboutUs")
                }}
            >

                <Card title={item.title} />
            </TouchableOpacity >
        )
    };
    return (
        <View style={styles.body}>
            <ImageBackground
                source={require("../assets/imgs/campus.png")}
                style={styles.image}
            >
                <Text style={styles.heading}>
                    Welcome {user.firstName}
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                >
                    <Text style={styles.smallText}>Logout</Text>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.body}>
                <View style={styles.main}>
                    <FlatList
                        data={modules}
                        renderItem={renderCard}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.flatlistContent}
                    />
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#dad7cd',
    },

    main: {
        margin: 20
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },

    description: {
        fontSize: 18,
        color: '#e9d8a6',
    },

    card: {
        backgroundColor: '#344e41',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        width: '80%'
    },

    container: {
        flexDirection: 'column',
        flex: 1
    },

    smallText: {
        color: 'white',
        fontSize: 10,
    },

    image: {
        width: 400,
        height: 200,
        resizeMode: 'stretch',
        flexDirection: 'row'
    },

    inner: {
        borderColor: 'black',
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderRadius: 10
    },

    logo: {
        width: 100,
        height: 100,
        margin: 20
    },

    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        borderColor: 'black',
    },

    heading: {
        color: '#700000',
        fontSize: 33
    },

    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: "#ffffff",
        marginTop: 130,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        color: 'black'
    },

    input1: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: "#ffffff",
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        color: 'black'
    },

    button: {
        backgroundColor: 'red',
        width: 55,
        height: 30,
        borderRadius: 5,
        marginLeft: 27,
        marginRight: 10,
        marginTop: 10,
        paddingTop: 7,
        paddingHorizontal: 12
    },

    buttonText: {
        color: '#F0F0F0',
        textAlign: 'center'
    },
    flatlistContent: {
        paddingVertical: 20,
    },
    card1: {
        backgroundColor: '#3a5a40',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#edf2f4'
    },
});



export default Home;



  
  
