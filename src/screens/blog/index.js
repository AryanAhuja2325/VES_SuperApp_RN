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
    ScrollView,
    SafeAreaView,
} from 'react-native';
import styles from './blog.styles';
import axios from 'axios';
import { useAppSelector } from '../../../store/hook';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewIcon from 'react-native-vector-icons/Feather';
import AnotherIcon from 'react-native-vector-icons/FontAwesome';
import * as COLORS from '../../utils/color';
import { ip } from '../../utils/constant';

const Blog = ({ navigation }) => {
    const user = useAppSelector((state) => state.profile.data);
    const [blogData, setBlogData] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);
    const [fetchedComments, setFetchedComments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const [textBoxVisible, setTextBoxVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleClick = () => {
        setTextBoxVisible(!textBoxVisible);
        setButtonVisible(!buttonVisible);
    };

    const handleClickSend = async () => {
        if (comment.trim() === '') {
            Alert.alert('Error', 'Please enter a comment');
            return;
        }

        try {
            const commentObject = {
                postId: selectedPost._id,
                comment: comment,
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            };

            const response = await axios.post(
                `https://${ip}/api/blog/addComment`,
                commentObject
            );

            if (response.data.message === 'Comment added successfully') {
                setComment('');
                await getData();
            } else {
                Alert.alert('Error', 'Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            Alert.alert('Error', 'Internal Server Error');
        }

        handleClick();
    };

    const handleDelete = async (postId) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this post?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await axios.delete(`https://${ip}/api/blog/deletePost/${postId}`);

                            if (response.data.message === 'Post deleted') {
                                Alert.alert('Success', 'Post deleted successfully');
                                getData();
                            } else {
                                Alert.alert('Error', 'Failed to delete post');
                            }
                        } catch (error) {
                            console.error('Error deleting post:', error);
                            Alert.alert('Error', 'Internal Server Error');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };


    const getData = async () => {
        try {
            console.log("In func")
            const response = await axios.get(`https://${ip}/api/blog`);
            console.log(response.data)
            const sortedDocuments = response.data.sort(
                (a, b) => new Date(b.postedOn) - new Date(a.postedOn)
            );

            setBlogData(sortedDocuments);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async (postId) => {
        try {
            const likeObject = {
                postId: postId,
                userEmail: user.email,
                isLiked: !isLiked,
            };

            const response = await axios.post(
                `https://${ip}/api/blog/likePost`,
                likeObject
            );

            if (response.data.message === 'Like action successful') {
                setIsLiked(!isLiked);
                getData();
            } else {
                Alert.alert('Error', 'Failed to perform like action');
            }
        } catch (error) {
            console.error('Error liking post:', error);
            Alert.alert('Error', 'Internal Server Error');
        }
    };

    const openModal = async (id) => {
        try {
            const response = await axios.get(
                `http://${ip}:3000/api/blog/postDetails/${id}`
            );

            const postData = response.data.post;
            const commentsReceived = response.data.comments || [];
            const commentsData = commentsReceived.sort(
                (a, b) => new Date(b.commentedOn) - new Date(a.commentedOn)
            );

            const updatedSelectedPost = { id, ...postData };
            setSelectedPost(updatedSelectedPost);
            setFetchedComments(commentsData);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const toggleShowFullContent = () => {
        setShowFullContent(!showFullContent);
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
                renderItem={({ item }) => (
                    <View style={styles.card1}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            {user.email === item.author.email ? (
                                <TouchableOpacity
                                    onPress={() => handleDelete(item._id)}
                                >
                                    <Icon
                                        name={'delete'}
                                        size={26}
                                        color={'black'}
                                    />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        <Text style={styles.post}>
                            {showFullContent
                                ? item.post
                                : `${item.post.slice(0, 100)}...`}
                        </Text>
                        {item.post.length > 100 && (
                            <TouchableOpacity onPress={toggleShowFullContent}>
                                <Text style={styles.readMore}>
                                    {showFullContent ? 'Read Less' : 'Read More'}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <Text style={styles.name}>@{item.author.name}</Text>
                        <Text style={styles.date}>
                            {new Date(item.postedOn).toLocaleDateString()}
                        </Text>
                        <TouchableOpacity onPress={() => openModal(item._id)}>
                            <Text style={styles.name}>View Comments</Text>
                        </TouchableOpacity>
                        <View style={styles.likeContainer}>
                            <TouchableOpacity
                                onPress={() => handleLike(item._id)}
                            >
                                <AnotherIcon
                                    name={item.likedBy.includes(user.email) ? 'heart' : 'heart-o'}
                                    size={20}
                                    color={item.likedBy.includes(user.email) ? COLORS.red : COLORS.black}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.likes}>{item.likes} Likes</Text>
                        </View>
                    </View>
                )}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={false}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <ScrollView>
                        {selectedPost ? (
                            <View style={styles.selectedPostContainer}>
                                <View style={styles.card}>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.title}>
                                            {selectedPost.title}
                                        </Text>
                                    </View>
                                    <Text style={styles.post}>
                                        {showFullContent
                                            ? selectedPost.post
                                            : `${selectedPost.post.slice(0, 100)}...`}
                                    </Text>
                                    {selectedPost.post.length > 100 && (
                                        <TouchableOpacity onPress={toggleShowFullContent}>
                                            <Text style={styles.readMore}>
                                                {showFullContent ? 'Read Less' : 'Read More'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    <Text style={styles.name}>
                                        @{selectedPost.author.name}
                                    </Text>
                                    <Text style={styles.date}>
                                        {new Date(selectedPost.potedOn).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        ) : null}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Icon name="close" size={26} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.commentHeading}>Comments</Text>
                        {fetchedComments.map((item, index) => (
                            <View style={styles.commentContainer} key={index}>
                                <View style={{ flexDirection: 'row' }}>
                                    <AnotherIcon
                                        name="user-circle"
                                        size={25}
                                        color={COLORS.black}
                                    />
                                    <Text style={styles.commentText}>{item.text}</Text>
                                </View>
                                <View style={{ marginLeft: 40 }}>
                                    <Text style={styles.commentTag}>
                                        @{item.commentedBy.name}
                                    </Text>
                                    <Text style={styles.commentDate}>
                                        {new Date(item.commentedOn).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        {textBoxVisible ? (
                            <View style={styles.rowInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Add a comment"
                                    placeholderTextColor={COLORS.gray}
                                    value={comment}
                                    onChangeText={setComment}
                                    multiline
                                    color={COLORS.black}
                                    onBlur={handleClick}
                                />
                                <TouchableOpacity onPress={handleClickSend}>
                                    <NewIcon name="send" size={35} color={COLORS.black} />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        {buttonVisible ? (
                            <TouchableOpacity style={styles.button} onPress={handleClick}>
                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>Add a comment</Text>
                                    <Icon
                                        name="add-comment"
                                        size={20}
                                        color={COLORS.white}
                                    />
                                </View>
                            </TouchableOpacity>
                        ) : null}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default Blog;