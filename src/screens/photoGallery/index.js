import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './PhotoGallery.styles';
import { useAppSelector } from '../../../store/hook';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ip } from '../../utils/constant';

const ImageGrid = () => {
    const [imageArrays, setImageArrays] = useState([]);
    const [likes, setLikes] = useState({});
    const [selectedItem, setSelectedItem] = useState('Architecture College');
    const user = useAppSelector((state) => state.profile.data);

    const fetchImageArrays = async (selectedItem) => {
        try {
            const response = await axios.get(`https://${ip}/api/photos?selectedItem=${selectedItem}`);
            setImageArrays(response.data.images);
            setLikes(response.data.likesData);
        } catch (error) {
            console.log('Error fetching image arrays:', error);
        }
    };

    useEffect(() => {
        fetchImageArrays(selectedItem);
    }, [selectedItem]);

    const shareImage = async (imagePath) => {
        try {
            const shareOptions = {
                title: 'Share Image',
                url: imagePath,
                type: 'image/png',
                social: Share.Social.WHATSAPP,
            };

            await Share.open(shareOptions);

            console.log('Image shared successfully');
        } catch (error) {
            console.log('Share error:', error.message);
        }
    };

    const handleTitleChange = (index, value) => {
        setSelectedItem(value);
        fetchImageArrays(value);
    };

    const renderItem = ({ item }) => {
        const maintitle = item.mainTitle;
        const like = likes[item._id] || 0;
        const likedByUser = item.likedBy && item.likedBy.includes(user.email);

        const handleLike = async () => {
            try {
                await axios.post(`https://${ip}/api/photos/likePost`, { docId: item._id, user });
                fetchImageArrays(selectedItem);
            } catch (error) {
                console.error('Error liking post:', error);
            }
        };

        const renderLikeIcon = () => {
            return likedByUser ? (
                <Icon name="heart" size={24} color={'red'} />
            ) : (
                <Icon name="heart-outline" size={24} color={'black'} />
            );
        };

        return (
            <View style={styles.imageContainer}>
                <View style={{ borderBottomWidth: 1 }}>
                    <Text style={styles.title}>Vivekanand Education</Text>
                    <Text style={styles.location}>{maintitle}</Text>
                </View>
                <Image source={{ uri: item.imageURL }} style={styles.image} resizeMode="stretch" />
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={handleLike}>
                        {renderLikeIcon()}
                        <Text>{like} likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shareImage(item.imageURL)} style={styles.share}>
                        <Icon name="share-social-sharp" size={24} color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.main}>
            <View style={{ flexDirection: 'row', marginVertical: responsiveHeight(1) }}>
                <ModalDropdown
                    options={[
                        "VESIT", "VESP", "Architecture College",
                        "Convocation Ceremony",
                        "Womens Day",
                        "Cricket Camp",
                        "Music Room",
                        "Guru Purnima",
                        "Play Group",
                        "Pharmacy College",
                        "Law College"
                    ]}
                    defaultValue={selectedItem}
                    onSelect={handleTitleChange}
                    textStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdownStyle}
                    customItemContainerStyle={{ justifyContent: 'center' }}
                    labelStyle={{ textAlign: 'center', justifyContent: 'center' }}
                    dropdownTextStyle={styles.dropdownTextStyle}
                />
                <Ionicon name={'chevron-down'} size={20} color={'black'} style={{ position: 'absolute', marginVertical: responsiveWidth(2.5), right: 1 }} />
            </View>
            <FlatList
                data={imageArrays}
                renderItem={renderItem}
                keyExtractor={(item) => item.docId}
            />
        </View>
    );
};

export default ImageGrid;
