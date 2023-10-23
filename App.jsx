import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { quotes } from "./src/data";

function App() {
  const firstQuote = quotes[0] || "No quotes found";
  console.log(firstQuote);
  return (
    <View style={styles.container}>
      <Text variant="displayMedium">Quote of the day</Text>
      {firstQuote && <Text>{JSON.stringify(firstQuote)}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
