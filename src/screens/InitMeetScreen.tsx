import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MeetLogo from '../components/MeetLogo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MeetSearchInput from '../components/MeetSearchInput';
import MeetList from '../components/MeetList';

const InitMeetScreen = ({ navigation }: any) => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.statusBarPlaceholder, { height: top }]} />
      <StatusBar backgroundColor='#E9F1FF' barStyle='dark-content' />
      <View style={styles.mainContainer}>
        <MeetLogo />
        <MeetSearchInput />
        <MeetList />
        <View style={styles.btnWrapper}>
          <Text style={styles.createMeetTxt}>
            새로운 Meet을 만들고 싶은가요?
          </Text>
          <TouchableOpacity style={styles.createMeetBtn}>
            <Text
              style={styles.btnTxt}
              onPress={() => navigation.navigate('CreateMeet')}
            >
              Meet 생성
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#E9F1FF',
  },
  mainContainer: {
    backgroundColor: '#E9F1FF',
    height: '100%',
  },
  btnWrapper: {
    marginTop: 42,
    alignItems: 'center',
  },
  createMeetTxt: {
    fontWeight: '500',
    color: '#676767',
    fontSize: 12,
    lineHeight: 24,
    marginBottom: 5,
  },
  createMeetBtn: {
    width: 111,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#5496FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontWeight: '700',
    fontSize: 18,
    color: '#ffffff',
  },
});

export default InitMeetScreen;
