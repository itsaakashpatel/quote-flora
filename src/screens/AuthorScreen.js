// AuthorScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Authors from '../data/authors.json';

const AuthorScreen = ({route}) => {
  const navigation = useNavigation();
  const {author} = route.params;
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    //finding the author
    const getAuthor = Authors.find((person) => person.name === author);
    if (getAuthor) setAuthorInfo(getAuthor);
  }, [author]);

  const openExternalLink = (link) => {
    Linking.openURL(link)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + link);
        } else {
          return Linking.openURL(link);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  if (authorInfo === null) return <Text>Loading...</Text>;
  else
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.name}>{authorInfo.name}</Text>
        <Text style={styles.jobTitle}>{authorInfo.description}</Text>
        <Text style={styles.bio}>{authorInfo.bio}</Text>
        <TouchableOpacity onPress={() => openExternalLink(authorInfo.link)}>
          <Text style={styles.wikiLink}>Read more on Wikipedia</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 30,
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
    color: 'grey',
    lineHeight: 30,
    marginVertical: 10,
    padding: 20,
    textAlign: 'center',
  },
  wikiLink: {
    fontSize: 16,
    color: 'blue',
    lineHeight: 30,
    marginVertical: 10,
  },
  jobTitle: {
    fontSize: 20,
    color: 'grey',
    lineHeight: 30,
    marginVertical: 10,
  },
});

export default AuthorScreen;
