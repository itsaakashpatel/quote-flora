import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app z!</Text>
      <StatusBar style="auto" />
      <Button primary onPress={() => console.log("Pressed")} mode="contained">
        Demo Button
      </Button>
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
