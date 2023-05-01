import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ImageButton = ({ onPress, source, color, State }: any) => {
  const [state, setState] = useState(false);

  styles.btn.backgroundColor = color;

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Image style={styles.image} source={source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 25,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default ImageButton;
