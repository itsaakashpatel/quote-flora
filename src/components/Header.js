import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../contexts/ThemeContext';

const Header = ({text = ''}) => {
  const {currentTheme} = useTheme();
  return (
    <View>
      <Text style={[styles.txt, {color: currentTheme.colors.text}]}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  txt: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    paddingLeft: 30,
    marginTop: 10,
  },
});
