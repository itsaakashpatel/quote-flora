import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LikeButton from "./LikeButtons";

const AuthorDetails = ({ author }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quote: {author.content}</Text>
      <Text style={styles.text}>Author: {author.author}</Text>
      <LikeButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black', 
    borderWidth: 1, 
    borderRadius: 10, 
    padding: 20, 
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthorDetails;
