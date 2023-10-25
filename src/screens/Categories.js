import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Categories = ({ navigation }) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Function to fetch data from categories.json
    const fetchData = async () => {
      try {
        const response = await fetch('categories.json'); // Adjust the path to your JSON file
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToCategory = (category) => {
    // Your navigation logic here
    // For example, use React Navigation to navigate to a category-specific screen
    // navigation.navigate('CategoryScreen', { category });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToCategory(item.name)}>
            <View style={styles.categoryItem}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
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
  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Categories;
