import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/QuoteIcon.png')} style={styles.image} />
      <Text style={styles.text}>Quote Flora</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FE',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    color: 'white',
  },
});

export default SplashScreen;
