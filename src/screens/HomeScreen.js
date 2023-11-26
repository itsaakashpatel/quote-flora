import React, { useState, useEffect, useRef } from 'react';
import * as Permissions from 'expo-permissions';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../components/Header';
import QuoteCard from '../components/QuoteCard';
import MainButton from '../components/MainButton';
import quotes from '../data/quotes.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const HomeScreen = () => {
  const [randomQuoteIndices, setRandomQuoteIndices] = useState([]);
  const [allQuotes, setAllQuotes] = useState([...quotes]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('quotes')
      .then((jsonQuotes) => {
        if (jsonQuotes) {
          const parsedQuotes = JSON.parse(jsonQuotes);
          setAllQuotes(parsedQuotes);
        }
      })
      .catch((error) => console.error('Error loading quotes:', error));

    const initialIndices = getRandomIndices();
    setRandomQuoteIndices(initialIndices);
  }, []);

  function getRandomIndices() {
    const indices = [];
    while (indices.length < 5) {
      const randomIndex = getRandomQuoteIndex();
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }

  useEffect(() => {
    const initialIndices = getRandomIndices();
    setRandomQuoteIndices(initialIndices);
  }, []);

  function getRandomQuoteIndex() {
    return Math.floor(Math.random() * allQuotes.length);
  }

  
  async function saveQuotesAsImage() {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    
    if (status !== 'granted') {
      console.error('Permission to access media library denied');
      return;
    }

    try {
      const result = await viewShotRef.current.capture();
      const asset = await MediaLibrary.createAssetAsync(result, 'quote_image');
      await MediaLibrary.createAlbumAsync('Quotes', asset, false);
      console.log('Quote image saved to gallery successfully');
    } catch (error) {
      console.error('Error saving quote image:', error);
    }
  }

  function changeRandomQuotes() {
    const newIndices = getRandomIndices();
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

  function favouriteQuoteHandler(value) {
    const updatedLikedQuotes = allQuotes.map((currentQuote) => {
      if (currentQuote._id === value.id) {
        return { ...currentQuote, isLiked: value.isLiked }; 
      }
      return currentQuote;
    });

    setAllQuotes(updatedLikedQuotes);
    AsyncStorage.setItem('quotes', JSON.stringify(updatedLikedQuotes))
      .then(() => {
        console.log('Quote updated and quotes updated successfully');
      })
      .catch((error) => console.error('Error in updating quote:', error));
  }

  const viewShotRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <Header text={'Quotes'} />
      <ScrollView ref={scrollViewRef}>
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          {randomQuoteIndices.map((index) => (
            <QuoteCard
              key={index}
              quote={allQuotes[index]}
              onDelete={deleteQuote}
              favouriteQuoteHandler={favouriteQuoteHandler}
            />
          ))}
        </ViewShot>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveQuotesAsImage}>
          <Text style={styles.saveButtonText}>Save to Gallery</Text>
        </TouchableOpacity>
        <MainButton style={styles.mainButton} title="Get New Quotes" onPress={changeRandomQuotes} />
      </View>
    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FE',
    position: 'relative',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 50,
    marginRight: 8, 
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 50,
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});



export default HomeScreen;
