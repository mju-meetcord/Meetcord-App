import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import ImageButton from './ImageButton';
import { Button, CheckBox, Icon } from '@rneui/themed';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

const BottomNav = ({ navigation }: any) => {
  const listBtnHandle = () => {
    //navigation.navigate('login');
  };

  return (
    <View style={styles.bottomBar}>
      <View style={styles.tapButton}>
        <ImageButton
          onPress={listBtnHandle}
          source={require('../../assets/ListBtn.png')}
        />
      </View>
      <View style={styles.tapButton}>
        <ImageButton
          onPress={listBtnHandle}
          source={require('../../assets/memberBtn.png')}
        />
      </View>
      <View style={styles.tapButton}>
        <ImageButton
          onPress={listBtnHandle}
          source={require('../../assets/homeBtn.png')}
          color='#FFF'
        />
      </View>
      <View style={styles.tapButton}>
        <ImageButton
          onPress={listBtnHandle}
          source={require('../../assets/notiBtn.png')}
        />
      </View>
      <View style={styles.tapButton}>
        <ImageButton
          onPress={listBtnHandle}
          source={require('../../assets/mypageBtn.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flex: 0.125,
    backgroundColor: '#5496FF',
    flexDirection: 'row',
  },
  tapButton: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNav;
