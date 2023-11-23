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
      <Text style={styles.text}>{quote.content}</Text>
      <Text style={styles.text}>
        <Text style={styles.textHead}>by: </Text>
        {quote.author}
      </Text>
      <View style={styles.actionButtons}>
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
    marginTop: 20,
  },
});

export default QuoteCard;
