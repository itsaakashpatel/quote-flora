import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Share} from 'react-native';
import LikeButton from './LikeButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import {Rating} from 'react-native-ratings';

const QuoteCard = ({quote, onDelete, favouriteQuoteHandler, updateRating}) => {
  const viewShotRef = useRef();

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

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewShotRef}
        options={{
          fileName: `${quote.content.split(0, 10)}-${quote.author}`,
          format: 'png',
        }}
      >
        <Text style={styles.text}>{quote.content}</Text>
        <Text style={styles.text}>
          <Text style={styles.textHead}>by: </Text>
          {quote.author}
        </Text>

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
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHead: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 30,
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
