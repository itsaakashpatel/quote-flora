//QuoteCard.js
import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import LikeButton from './LikeButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const QuoteCard = ({quote, onDelete, favouriteQuoteHandler}) => {
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
    //Id and value
    favouriteQuoteHandler(value);
  };

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewShotRef}
        options={{
          fileName: `${quote.content.split(0, 10)}-${quote.author}`,
          format: 'png',
          quality: 1,
        }}
      >
        <Text style={styles.text}>{quote.content}</Text>
        <Text style={styles.text}>
          <Text style={styles.textHead}>by: </Text>
          {quote.author}
        </Text>
      </ViewShot>
      <View style={styles.actionButtons}>
        <LikeButton quote={quote} onLikeHandler={(value) => onLikeHandler(value)} />
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="trash" size={22} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownload}>
          <Icon name="download" size={22} color="grey" />
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
