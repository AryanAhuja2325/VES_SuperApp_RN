import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    ImageBackground
} from 'react-native';
import styles from './blog.styles';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as COLORS from '../../utils/color'

const Blog = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data)
    const [blogData, setBlogData] = useState([]);
    const [selectedPost, setSelectedPost] = useState('');
    const [showFullContent, setShowFullContent] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const author = {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
    }
    const postedOn = firestore.Timestamp.now();
    const [inputHeight, setInputHeight] = useState(40);

    const handleContentSizeChange = (event) => {
        setInputHeight(event.nativeEvent.contentSize.height);
    };

    const getData = async () => {
        try {
            const snapshot = await firestore().collection('Blog').get();

            const fetchedDocuments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const sortedDocuments = fetchedDocuments.sort((a, b) => b.postedOn.toDate() - a.postedOn.toDate());

            setBlogData(sortedDocuments);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = () => {
        try {
            const documentRef = firestore().collection('Blog').doc(selectedPost);
            documentRef.delete();
            Alert.alert("Success", "Post deleted :(");
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    const handleDelete = (postId) => {
        setSelectedPost(postId);
        Alert.alert(
            "Warning",
            "Are you sure you want to delete this AWESOME blog",
            [
                {
                    text: "Yes, I'm sure",
                    onPress: deleteItem,
                    style: 'destructive',
                },
                {
                    text: "No, Cancel",
                    style: 'cancel',
                }
            ],
            { cancelable: false }
        );
    }

    const submit = () => {
        const postToAdd = {
            title,
            post,
            author,
            postedOn
        }

        try {
            firestore()
                .collection("Blog")
                .add(postToAdd)

            Alert.alert("Success", "Blog posted!!!!")
        } catch (error) {
            console.log(error)
        }
        setModalVisible(false)
    }

    useEffect(() => {
        getData();
    }, []);

    const renderBlog = ({ item }) => {


        const toggleShowFullContent = () => {
            setShowFullContent(!showFullContent);
        };

        return (
            <View style={styles.outercard}>
                <View style={styles.card1}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        {
                            (user.email === item.author.email) ?
                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <Icon name={'delete'} size={26} color={'black'} />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                    <Text style={styles.post}>
                        {showFullContent ? item.post : `${item.post.slice(0, 100)}...`}
                    </Text>
                    {item.post.length > 100 && (
                        <TouchableOpacity onPress={toggleShowFullContent}>
                            <Text style={styles.readMore}>
                                {showFullContent ? "Read Less" : "Read More"}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.name}>@{item.author.name}</Text>
                    <Text style={styles.date}>{item.postedOn.toDate().toLocaleDateString()}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/imgs/blog.png')}
                style={styles.image}
            />
            <Text style={styles.heading}>Our Blogs...</Text>
            <FlatList
                data={blogData}
                keyExtractor={(item) => item.id}
                renderItem={renderBlog}
            />
            {
                (user.loginType == 'Teacher') ?
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Icon name='add-comment' size={40} color='black' style={styles.icon} />
                    </TouchableOpacity>
                    :
                    null
            }

            <Modal
                visible={modalVisible}
                animationType='slide'
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
                presentationStyle='formSheet'
            >
                <ImageBackground
                    style={styles.modalContainer}
                    source={require('../../assets/imgs/bg.jpg')}
                    resizeMode='repeat'
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Say whats on your mind....</Text>
                        <TextInput
                            placeholder="Title"
                            placeholderTextColor={COLORS.gray}
                            style={styles.input}
                            color={COLORS.black}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            placeholder="Post"
                            placeholderTextColor={COLORS.gray}
                            style={[styles.inputPost, { height: inputHeight }]}
                            multiline={true}
                            onContentSizeChange={handleContentSizeChange}
                            color={COLORS.black}
                            value={post}
                            onChangeText={setPost}
                        />

                        <TouchableOpacity onPress={submit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal>
        </View>
    );
};

export default Blog;
