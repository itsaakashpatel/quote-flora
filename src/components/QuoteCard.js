import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Share, Image} from 'react-native';
import LikeButton from './LikeButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {Rating} from 'react-native-ratings';
import {useTheme} from '../contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';

const QuoteCard = ({quote, onDelete, favouriteQuoteHandler, updateRating}) => {
  const {currentTheme} = useTheme();
  const navigation = useNavigation();

  const viewShotRef = useRef();
  const [currentLanguage, setcurrentLanguage] = useState('english');
  const {currentFont} = useTheme();
  const [currentQuote, setcurrentQuote] = useState(quote.content);

  const changeLanguage = async () => {
    if (currentLanguage === 'english') {
      setcurrentLanguage('french');
      // translate quote

      console.log(`quote == ${quote}`);
      setcurrentQuote('quote in french');
    } else if (currentLanguage === 'french') {
      setcurrentLanguage('english');
      // quote in english
      setcurrentQuote(quote.content);
    }

    console.log(currentLanguage);
    console.log('current quote :- ', currentQuote);
  };

  const handleDownload = async () => {
    try {
      const uri = await captureView();
      saveImageToCameraRoll(uri);
    } catch (error) {
      console.error('Error capturing view:', error);
      Alert.alert('Error', 'Failed to capture view. Please try again.');
    }
  };

  const captureView = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      return uri;
    } catch (error) {
      throw error;
    }
  };

  const saveImageToCameraRoll = async (uri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Image saved successfully in photos!');
    } catch (error) {
      console.error('Error saving image to camera roll:', error);
      Alert.alert('Error', 'Failed to save image. Please try again.');
    }
  };

  const handleDelete = () => {
    onDelete(quote._id);
  };

  const onLikeHandler = (value) => {
    favouriteQuoteHandler(value);
  };

  const handleRating = (value) => {
    // Update the quote object with the new rating
    const updatedQuote = {...quote, rating: value};
    // console.log(value, quote)

    updateRating(updatedQuote);
  };

  const handleShare = async () => {
    try {
      const message = `${quote.content} - by ${quote.author}`;
      const result = await Share.share({
        message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing quote:', error);
      Alert.alert('Error', 'Failed to share quote. Please try again.');
    }
  };

  const handleAuthorClick = () => {
    navigation.navigate('Author', {author: quote.author});
  };

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.colors.quotecard, fontFamily: currentFont && currentFont}]}>
      <ViewShot
        ref={viewShotRef}
        options={{
          fileName: `${quote.content.split(0, 10)}-${quote.author}`,
          format: 'png',
        }}
      >
        <Text style={[styles.text, {color: currentTheme.colors.text, fontFamily: currentFont && currentFont}]}>{currentQuote}</Text>
        <View style={styles.author}>
          {quote.author ? (
            <Image
              style={{width: 32, height: 32, marginHorizontal: 10}}
              source={{
                uri: `https://ui-avatars.com/api/?uppercase=true&name=${quote.author}&rounded=true&bold=true&background=0D8ABC&color=fff&size=32`,
              }}
            />
          ) : (
            <Image
              style={{width: 32, height: 32, marginHorizontal: 10}}
              source={require('../assets/icon.jpeg')}
            />
          )}
          <TouchableOpacity onPress={handleAuthorClick}>
            <Text style={[styles.authorText, {color: currentTheme.colors.text, fontFamily: currentFont && currentFont}]}>
              {quote.author}
            </Text>
          </TouchableOpacity>
        </View>

        <Rating
          showRating
          type="star"
          fractions={0}
          startingValue={0}
          imageSize={20}
          style={{paddingVertical: 10}}
          onFinishRating={(value) => handleRating(value)}
        />
      </ViewShot>
      <View style={styles.actionButtons}>
        <LikeButton quote={quote} onLikeHandler={(value) => onLikeHandler(value)} />
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="trash" size={22} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownload}>
          <Icon name="download" size={22} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share" size={22} color="green" />
        </TouchableOpacity>

        <TouchableOpacity onPress={changeLanguage}>
          <Icon name="exchange" size={22}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textHead: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 30,
  },
  authorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    lineHeight: 30,
  },
  quoteContent: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    lineHeight: 20,
  },
  text: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    minWidth: '50%',
  },
});

export default QuoteCard;
