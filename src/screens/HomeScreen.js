import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator, TouchableOpacity, Modal, TextInput} from 'react-native';
import Header from '../components/Header';
import QuoteCard from '../components/QuoteCard';
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../contexts/ThemeContext';


const HomeScreen = () => {
  const { currentTheme } = useTheme();
  const [randomQuoteIndices, setRandomQuoteIndices] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // New states for the modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [newQuote, setNewQuote] = useState('');

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

  const getRandomQuoteIndex = () => Math.floor(Math.random() * allQuotes.length);

  const changeRandomQuotes = () => {
    const newIndices = [];
    while (newIndices.length < 5) {
      const randomIndex = getRandomQuoteIndex();
      if (!newIndices.includes(randomIndex)) {
        newIndices.push(randomIndex);
      }
    }
    setRandomQuoteIndices(newIndices);
  };

  const deleteQuote = (quoteId) => {
    const updatedQuotes = allQuotes.filter((quote) => quote._id !== quoteId);
    setAllQuotes(updatedQuotes);

    AsyncStorage.setItem('quotes', JSON.stringify(updatedQuotes))
      .then(() => {
        console.log('Quote deleted and quotes updated successfully');
      })
      .catch((error) => {
        console.error('Error deleting quote:', error);
      });
  };

  const updateRating = (updatedQuote) => {
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
  };

  const favouriteQuoteHandler = (value) => {
    const updatedLikedQuotes = allQuotes.reduce((accumulator, currentQuote) => {
      if (currentQuote._id === value.id) {
        currentQuote.isLiked = value.isLiked; // Update isLiked property
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
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveNewQuote =async () => {
    if (newQuote.trim() !== '') {
      const newQuoteObject = {
        _id: Date.now().toString(),
        content: newQuote,
        author: "me", 
        categories: ["self"], 
      };
  
      const newQuotesArray = [...allQuotes, newQuoteObject];
      setAllQuotes(newQuotesArray);
      
      try {
        await AsyncStorage.setItem('quotes', JSON.stringify(newQuotesArray));
        console.log('New quote saved successfully');
      } catch (error) {
        console.error('Error saving new quote:', error);
      }
    }
  
    setNewQuote('');
    toggleModal();
  };
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <Header text={'Quotes'} />
     
      {allQuotes.length > 0 ? (
        <>
          <ScrollView style={styles.scrollView}>
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
         
              <MainButton title="Write Your Quote" onPress={toggleModal}></MainButton>
          <MainButton title="Get New Quotes" onPress={changeRandomQuotes} />
        </>
      ) : (
        <View style={styles.noQuotesContainer}>
          <Text>No quotes available</Text>
        </View>
      )}

      {/* Modal for writing a new quote */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Write your quote here"
            style={styles.input}
            multiline
            value={newQuote}
            onChangeText={(text) => setNewQuote(text)}
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={saveNewQuote} style={[styles.modalButton, { backgroundColor: 'green' }]}>
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={[styles.modalButton, { backgroundColor: 'red' }]}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeQuoteButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  noQuotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;


