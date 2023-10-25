import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import QuoteCard from '../components/QuoteCard';
import { quotes } from '../data';

const CategoryScreen = ({ route }) => {

  const { categoryName } = route.params; 


  const quotesForCategory = quotes.filter((quote) =>
    quote.categories.includes(categoryName)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Category: {categoryName}</Text>
      <FlatList
        data={quotesForCategory}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <QuoteCard quote={item} /> 
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quoteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CategoryScreen;
