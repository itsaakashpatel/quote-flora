//QuoteCard.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LikeButton from './LikeButtons';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuoteCard = ({quote, onDelete, favouriteQuoteHandler}) => {
  const handleDelete = () => {
    onDelete(quote._id);
  };

  const onLikeHandler = (value) => {
    //Id and value
    favouriteQuoteHandler(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHead}> Quote: </Text>
      <Text style={styles.text}>{quote.content}</Text>
      <Text style={styles.text}>
        <Text style={styles.textHead}>Author: </Text>
        {quote.author}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <LikeButton quote={quote} onLikeHandler={(value) => onLikeHandler(value)} />
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="trash" size={22} color="red" />
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
