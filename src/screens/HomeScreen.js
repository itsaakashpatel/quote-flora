import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import AuthorDetails from '../components/AuthorDetails';
import { quotes } from '../data';

const HomeScreen = () => {
  const [randomQuoteIndex, setRandomQuoteIndex] = useState(getRandomQuoteIndex());

  function getRandomQuoteIndex() {
    return Math.floor(Math.random() * quotes.length);
  }

  function changeRandomQuote() {
    setRandomQuoteIndex(getRandomQuoteIndex());
  }

  return (
    <SafeAreaView style={styles.container}>
      {quotes[randomQuoteIndex] && <AuthorDetails author={quotes[randomQuoteIndex]} />}
      <Button title="Get Random Quote" onPress={changeRandomQuote} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FE',
  },
});

export default HomeScreen;
