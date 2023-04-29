import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ImageButton = ({ onPress, source }: any) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Image style={styles.image} source={source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default ImageButton;
