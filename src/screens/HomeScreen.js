import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import QuoteCard from '../components/QuoteCard';
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
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
  }, [allQuotes]);

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

  function favouriteQuoteHandler(value) {
    const updatedLikedQuotes = allQuotes.map((currentQuote) =>
      currentQuote._id === value.id ? { ...currentQuote, isLiked: value.isLiked } : currentQuote
    );

    setAllQuotes(updatedLikedQuotes);

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
    <SafeAreaView style={styles.container}>
      <Header text={'Quotes'} />
      {allQuotes.length > 0 ? (
        <>
          <ScrollView>
            {randomQuoteIndices.map((index) => (
              <QuoteCard
                key={index}
                quote={allQuotes[index]}
                onDelete={deleteQuote}
                favouriteQuoteHandler={favouriteQuoteHandler}
              />
            ))}
          </ScrollView>
          <MainButton title="Get New Quotes" onPress={changeRandomQuotes} />
        </>
      ) : (
        <View style={styles.container}>
          <Text>No quotes available</Text>
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
