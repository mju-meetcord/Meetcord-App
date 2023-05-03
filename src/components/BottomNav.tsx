import { View, StyleSheet } from 'react-native';
import ImageButton from './ImageButton';
import Icon from 'react-native-vector-icons/Entypo';

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
        <Icon name='home' style={{ color: '#FFF', width: 20, height: 20 }} />
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
