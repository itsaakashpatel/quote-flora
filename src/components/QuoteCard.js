
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LikeButton from './LikeButtons';

const QuoteCard = ({ quote }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quote: {quote.content}</Text>
      <Text style={styles.text}>Author: {quote.author}</Text>
     <LikeButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
});

export default QuoteCard;
