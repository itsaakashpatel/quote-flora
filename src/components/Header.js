import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({text = ''}) => {
  return (
    <View>
      <Text style={styles.txt}>{text}</Text>
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
