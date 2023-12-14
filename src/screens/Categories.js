import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import categories from '../data/categories.json';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';

const Categories = () => {
  const {currentTheme} = useTheme();
  const navigation = useNavigation();
  const {currentFont} = useTheme();

  const navigateToCategory = (categoryName) => {
    navigation.navigate('CategoryScreen', {categoryName});
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentTheme.colors.background}]}>
      <Text style={[styles.header, {color: currentTheme.colors.text, fontFamily: currentFont && currentFont}]}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToCategory(item.name)}>
            <View style={[styles.categoryItem, {color: currentTheme.colors.text, fontFamily: currentFont && currentFont}]}>
              <Text style={[styles.text, {color: currentTheme.colors.text, fontFamily: currentFont && currentFont}]}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Categories;
