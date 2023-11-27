import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';


const SplashScreen = ({navigation}) => {
  const { currentTheme } = useTheme();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
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
