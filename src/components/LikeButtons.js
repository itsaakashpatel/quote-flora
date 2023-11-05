import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleLike}>
        <Icon name={isLiked ? 'heart' : 'heart-o'} size={26} color={isLiked ? 'red' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default LikeButton;
