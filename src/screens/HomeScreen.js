import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Header from '../components/Header';
import {quotes} from '../data';
import QuoteCard from '../components/QuoteCard';
import MainButton from '../components/MainButton';
const HomeScreen = () => {
  const [randomQuoteIndices, setRandomQuoteIndices] = useState([]);

  useEffect(() => {
    const initialIndices = [];
    while (initialIndices.length < 5) {
      const randomIndex = getRandomQuoteIndex();
      if (!initialIndices.includes(randomIndex)) {
        initialIndices.push(randomIndex);
      }
    }
    setRandomQuoteIndices(initialIndices);
  }, []);

  function getRandomQuoteIndex() {
    return Math.floor(Math.random() * quotes.length);
  }

  function changeRandomQuotes() {
    const newIndices = [];
    while (newIndices.length < 5) {
      const randomIndex = getRandomQuoteIndex();
      if (!newIndices.includes(randomIndex)) {
        newIndices.push(randomIndex);
      }
    }
    setRandomQuoteIndices(newIndices);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header text={'Quotes'} />
      <ScrollView>
        {randomQuoteIndices.map((index) => (
          <QuoteCard key={index} quote={quotes[index]} />
        ))}
      </ScrollView>
      <MainButton title="Get New Quotes" onPress={changeRandomQuotes} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FE',
  },
});

export default HomeScreen;
