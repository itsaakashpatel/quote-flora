import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { authors, quotes, categories } from "../data";
import Header from "../components/Header";
import debounce from "../utils/debounce";
import TYPES from "../utils/types";
import SearchResult from "../components/SearchResult";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(TYPES.AUTHOR); // 0 for Authors, 1 for Quotes, 2 for Categories
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (selectedCategory === TYPES.AUTHOR) {
      setSearchResults(authors.slice(0, 7));
      return;
    } else if (selectedCategory === TYPES.QUOTE) {
      setSearchResults(quotes.slice(0, 7));
      return;
    } else if (selectedCategory === TYPES.CATEGORIES) {
      setSearchResults(categories.slice(0, 7));
      return;
    }
  }, [selectedCategory]);

  const debouncedSearch = debounce((query) => {
    // Perform the search based on the selected category
    const lowerCaseQuery = query.toLowerCase();

    if (selectedCategory === TYPES.AUTHOR) {
      const results = authors.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(results);
    } else if (selectedCategory === TYPES.QUOTE) {
      const results = quotes.filter((item) =>
        item.content.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(results);
    } else if (selectedCategory === TYPES.CATEGORIES) {
      const results = categories.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(results);
    }
  }, 300);

  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const getIndex = () => {
    if (selectedCategory === TYPES.AUTHOR) return 0;
    if (selectedCategory === TYPES.QUOTE) return 1;
    if (selectedCategory === TYPES.CATEGORIES) return 2;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header text={"Search"} />
      <TextInput
        placeholder="Search for authors, quotes, or categories"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
        style={styles.searchInput}
      />
      <SegmentedControlTab
        values={["Authors", "Quotes", "Categories"]}
        selectedIndex={getIndex()}
        onTabPress={(index) => {
          if (index === 0) setSelectedCategory(TYPES.AUTHOR);
          if (index === 1) setSelectedCategory(TYPES.QUOTE);
          if (index === 2) setSelectedCategory(TYPES.CATEGORIES);
        }}
        tabsContainerStyle={styles.tabsContainerStyle}
      />
      {searchResults.length === 0 ? (
        <View style={styles.searchResultsContainer}>
          <Text>No results found</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <SearchResult key={item._id} type={selectedCategory} data={item} />
          )}
          style={styles.searchResultsContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FE",
  },
  searchInput: {
    backgroundColor: "white",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingLeft: 30,
    borderRadius: 10,
    height: 50,
  },
  tabsContainerStyle: {
    marginHorizontal: 30,
    marginVertical: 10,
    height: 40,
  },
  searchResultsContainer: {
    marginHorizontal: 10,
  },
});

export default SearchScreen;
