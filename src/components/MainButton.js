import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../contexts/ThemeContext';

const MainButton = ({title, onPress}) => {
  const {currentTheme} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: currentTheme.colors.background}]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, {color: currentTheme.buttonText.color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderColor: '#365CD7',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    padding: 15,
    margin: 3,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainButton;
