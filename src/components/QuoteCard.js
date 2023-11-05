import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LikeButton from './LikeButtons';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuoteCard = ({quote}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHead}> Quote: </Text>
      <Text style={styles.text}>{quote.content}</Text>
      <Text style={styles.text}>
        {' '}
        <Text style={styles.textHead}>Author: </Text>
        {quote.author}
      </Text>
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
    alignItems: 'center',
  },
  textHead: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 3,
  },
  text: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default QuoteCard;
