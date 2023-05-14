import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import BackBtn from '../../assets/back_btn.svg';
import ProfileIcon from '../../assets/icon_profile.svg';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

type CreateMeetScreenProps = StackScreenProps<RootStackParamList, 'CreateMeet'>;

const CreateMeetScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.statusBarPlaceholder, { height: top }]} />
      <View style={styles.wrapper}>
        <BackBtn style={styles.backBtn} />
        <Text style={styles.title}>새로운 Meet 만들기</Text>
        <Shadow startColor='rgba(0, 0, 0, 0.25)' distance={4} offset={[0, 4]}>
          <View style={styles.meetInfoBox}>
            <ProfileIcon style={styles.meetImg} />
            <View style={styles.nameInputBox}>
              <TextInput
                style={styles.meetNameInput}
                placeholder='Meet 이름을 입력해주세요.'
                placeholderTextColor='#676767'
              />
              <Text style={styles.txtCount}>7/15</Text>
            </View>
            <View style={styles.introInputBox}>
              <TextInput
                style={styles.meetIntroInput}
                placeholder='우리만의 Meet을 소개해보세요.'
                placeholderTextColor='#676767'
              />
              <Text style={styles.txtCount}>11/80</Text>
            </View>
          </View>
        </Shadow>
        <TouchableOpacity style={styles.meetCreateBtn}>
          <Text style={styles.meetCreateBtnTxt}>Meet 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#E9F1FF',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#E9F1FF',
    height: '100%',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  title: {
    fontWeight: '700',
    color: '#5496FF',
    fontSize: 20,
    marginBottom: 10,
  },
  meetInfoBox: {
    width: 325,
    height: 310,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  meetImg: {
    marginTop: 26,
  },
  nameInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 287,
    height: 35,
    marginTop: 37,
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  meetNameInput: {
    color: '#676767',
    fontSize: 18,
    fontWeight: '700',
    width: 208,
  },
  txtCount: {
    color: '#878787',
    fontWeight: '500',
    fontSize: 14,
  },
  introInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 287,
    height: 35,
    justifyContent: 'space-between',
  },
  meetIntroInput: {
    color: '#676767',
    fontWeight: '500',
    fontSize: 14,
    width: 188,
    paddingVertical: 8.5,
  },
  meetCreateBtn: {
    marginTop: 143,
    backgroundColor: '#5496ff',
    width: 144,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetCreateBtnTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default CreateMeetScreen;
