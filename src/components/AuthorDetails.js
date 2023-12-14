import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LikeButton from './LikeButtons';
import {useTheme} from '../contexts/ThemeContext';

const AuthorDetails = ({author}) => {
  const {currentTheme} = useTheme();
  const {currentFont} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.colors.background}]}>
      <Text style={[styles.text, {text: currentTheme.colors.text,fontFamily: currentFont && currentFont }]}>Quote: {author.content}</Text>
      <Text style={[styles.text, {text: currentTheme.colors.text, fontFamily: currentFont && currentFont}]}>Author: {author.author}</Text>
      <LikeButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthorDetails;
