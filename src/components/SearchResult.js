import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import TYPES from '../utils/types';

function SearchResult({type, data}) {
  const openURL = (link) => {
    Linking.openURL(link);
  };

  if (type === TYPES.AUTHOR) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <TouchableOpacity onPress={() => openURL(data.link)}>
          <Text style={styles.link}>{data.link}</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (type === TYPES.CATEGORIES) {
    return (
      <View style={styles.container}>
        <Text style={{...styles.title, fontSize: 16}}>{data.name}</Text>
      </View>
    );
  } else if (type === TYPES.QUOTE) {
    return (
      <View style={styles.container}>
        <Text style={{...styles.title, fontSize: 14}}>{data.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    opacity: 0.8,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#222',
    opacity: 0.5,
    marginBottom: 5,
  },
  link: {
    fontSize: 12,
    color: 'blue',
    marginBottom: 5,
  },
});

export default SearchResult;
