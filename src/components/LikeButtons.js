// LikeButton.js
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../contexts/ThemeContext';

const LikeButton = ({quote, onLikeHandler}) => {
  const {currentTheme} = useTheme();
  const {currentFont} = useTheme();
  const toggleLike = () => {
    // setIsLikedQuote(quote.isLiked ? false: true)
    onLikeHandler({
      id: quote._id,
      isLiked: !quote.isLiked,
    });
    // Add this line to log when the button is clicked
    console.log('Like button clicked. isLiked:', quote.isLiked);
  };

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.colors.background}]}>
      <TouchableOpacity onPress={toggleLike}>
        <Icon
          name={quote.isLiked ? 'heart' : 'heart-o'}
          size={22}
          color={quote.isLiked ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LikeButton;
