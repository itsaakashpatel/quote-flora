import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuoteCard from '../components/QuoteCard';
import Header from '../components/Header';
import {useTheme} from '../contexts/ThemeContext';

const Favourite = () => {
  const {currentTheme} = useTheme();
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  function fetchQuotes() {
    AsyncStorage.getItem('quotes')
      .then((jsonQuotes) => {
        if (jsonQuotes) {
          const parsedQuotes = JSON.parse(jsonQuotes);
          setAllQuotes(parsedQuotes);
          const filterLikedQuotes = parsedQuotes.filter((quote) => quote.isLiked);
          setLikedQuotes([...filterLikedQuotes]);
          console.log('Fetched quotes!');
        }
      })
      .catch((error) => console.error('Error loading quotes:', error));
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

  function favouriteQuoteHandler(value) {
    const updatedLikedQuotes = allQuotes.reduce((accumulator, currentQuote) => {
      if (currentQuote._id === value.id) {
        currentQuote.isLiked = value.isLiked; // Update isLiked property
      }
      return [...accumulator, currentQuote];
    }, []);

    setAllQuotes(updatedLikedQuotes);
    AsyncStorage.setItem('quotes', JSON.stringify(updatedLikedQuotes))
      .then(() => {
        console.log('Quote updated and quotes updated successfully');
      })
      .catch((error) => console.error('Error in updating quote:', error));

    fetchQuotes();
  }

  const handleRefresh = () => {
    setRefreshing(true);
    fetchQuotes(); // Fetch the liked quotes
    setRefreshing(false);
  };

  function updateRating(updatedQuote) {
    const quoteIndex = allQuotes.findIndex((quote) => quote._id === updatedQuote._id);

    if (quoteIndex !== -1) {
      allQuotes[quoteIndex] = updatedQuote;

      AsyncStorage.setItem('quotes', JSON.stringify(allQuotes))
        .then(() => {
          console.log('Rating updated and quotes saved successfully');
        })
        .catch((error) => console.error('Error updating rating:', error));
    } else {
      console.error('Quote not found for updating rating');
    }
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentTheme.colors.background}]}>
      <Header text={'Your favourite Quotes'} />
      <FlatList
        style={styles.container}
        data={likedQuotes}
        keyExtractor={(item, index) => item._id.toString()}
        renderItem={({item, index}) => (
          <QuoteCard
            key={index}
            quote={item}
            onDelete={deleteQuote}
            updateRating={updateRating}
            favouriteQuoteHandler={favouriteQuoteHandler}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F0F4FE',
  },
});

export default Favourite;
