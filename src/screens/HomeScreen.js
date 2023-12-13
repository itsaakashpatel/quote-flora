import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator} from 'react-native';
import Header from '../components/Header';
import QuoteCard from '../components/QuoteCard';
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

import 'i18next'
const HomeScreen = () => {
  const { t } = useTranslation();
  const {currentTheme} = useTheme();
  const [randomQuoteIndices, setRandomQuoteIndices] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonQuotes = await AsyncStorage.getItem('quotes');
        if (jsonQuotes !== null) {
          const parsedQuotes = JSON.parse(jsonQuotes);
          setAllQuotes(parsedQuotes);
        }
      } catch (error) {
        console.error('Error loading quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allQuotes.length > 0) {
      const newIndices = [];
      while (newIndices.length < 5) {
        const randomIndex = getRandomQuoteIndex();
        if (!newIndices.includes(randomIndex)) {
          newIndices.push(randomIndex);
        }
      }
      setRandomQuoteIndices(newIndices);
    }
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
      .catch((error) => {
        console.error('Error deleting quote:', error);
      });
  }

  function updateRating(updatedQuote) {
    const quoteIndex = allQuotes.findIndex((quote) => quote._id === updatedQuote._id);

    // If the quote is found, update the rating
    if (quoteIndex !== -1) {
      // Update the quote in the array
      allQuotes[quoteIndex] = updatedQuote;

      // Save the updated quotes to AsyncStorage
      AsyncStorage.setItem('quotes', JSON.stringify(allQuotes))
        .then(() => {
          console.log('Rating updated and quotes saved successfully');
        })
        .catch((error) => console.error('Error updating rating:', error));
    } else {
      console.error('Quote not found for updating rating');
    }
  }

  function favouriteQuoteHandler(value) {
    const updatedLikedQuotes = allQuotes.reduce((accumulator, currentQuote) => {
      if (currentQuote._id === value.id) {
        currentQuote.isLiked = value.isLiked; 
      }
      return [...accumulator, currentQuote];
    }, []);
    setAllQuotes([...updatedLikedQuotes]);

    AsyncStorage.setItem('quotes', JSON.stringify(updatedLikedQuotes))
      .then(() => {
        console.log('Quote updated and quotes updated successfully');
      })
      .catch((error) => {
        console.error('Error in updating quote:', error);
      });
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <Header text={t('quotes')} />
      {allQuotes.length > 0 ? (
        <>
          <ScrollView>
            {randomQuoteIndices.map((index) => (
              <QuoteCard
                key={index}
                quote={allQuotes[index]}
                onDelete={deleteQuote}
                favouriteQuoteHandler={favouriteQuoteHandler}
                updateRating={updateRating}
              />
            ))}
          </ScrollView>
          <MainButton title={t('getNewQuotes')} onPress={changeRandomQuotes} />
        </>
      ) : (
        <View style={styles.container}>
          <Text>{t('noQuotesAvailable')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
