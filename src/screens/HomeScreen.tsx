import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import ImageButton from '../components/ImageButton';
import { Button, CheckBox, Icon } from '@rneui/themed';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import BottomNav from '../components/BottomNav';

const HomeScreen = ({ navigation }: any) => {
  const listBtnHandle = () => {
    //navigation.navigate('login');
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'black', height: '100%' }}>
      <ScrollView style={styles.container}>
        <View style={styles.topContainer}></View>
        <View style={styles.mainContainer}></View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.875,
    backgroundColor: '#E9F1FF',
  },
  topContainer: {
    height: 120,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {},
});

export default HomeScreen;
