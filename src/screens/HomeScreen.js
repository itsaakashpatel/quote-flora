import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Header from '../components/Header';
import QuoteCard from '../components/QuoteCard';
import MainButton from '../components/MainButton';
import quotes from '../data/quotes.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [randomQuoteIndices, setRandomQuoteIndices] = useState([]);
  const [allQuotes, setAllQuotes] = useState([...quotes]);

  useEffect(() => {
    AsyncStorage.getItem('quotes')
      .then((jsonQuotes) => {
        if (jsonQuotes) {
          const parsedQuotes = JSON.parse(jsonQuotes);
          setAllQuotes(parsedQuotes);
        }
      })
      .catch((error) => console.error('Error loading quotes:', error));

    const initialIndices = [];
    while (initialIndices.length < 5) {
      const randomIndex = getRandomQuoteIndex();
      if (!initialIndices.includes(randomIndex)) {
        initialIndices.push(randomIndex);
      }
    }
    setRandomQuoteIndices(initialIndices);
  }, []);

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
    return Math.floor(Math.random() * allQuotes.length);
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

  function deleteQuote(quoteId) {
    const updatedQuotes = allQuotes.filter((quote) => quote._id !== quoteId);
    setAllQuotes(updatedQuotes);
    AsyncStorage.setItem('quotes', JSON.stringify(updatedQuotes))
      .then(() => {
        console.log('Quote deleted and quotes updated successfully');
      })
      .catch((error) => console.error('Error deleting quote:', error));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header text={'Quotes'} />
      <ScrollView>
        {randomQuoteIndices.map((index) => (
          <QuoteCard key={index} quote={allQuotes[index]} onDelete={deleteQuote} />
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
