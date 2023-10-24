// AuthorDetails.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AuthorDetails = ({ author }) => {
  return (
    <View style={styles.container}>
      <Text>Quote: {author.content}</Text>
      <Text>Author: {author.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthorDetails;
