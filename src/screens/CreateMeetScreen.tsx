import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import BackBtn from '../../assets/back_btn.svg';

const CreateMeetScreen = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <BackBtn style={styles.backBtn} />
        <Text style={styles.title}>새로운 Meet 만들기</Text>
        <Shadow startColor='rgba(0, 0, 0, 0.25)' distance={4} offset={[0, 4]}>
          <View style={styles.meetInfoBox}>
            <View style={styles.meetImg}></View>
            <TextInput
              style={styles.meetNameInput}
              placeholder='Meet 이름을 입력해주세요.'
              placeholderTextColor='#676767'
            ></TextInput>
            <TextInput
              style={styles.meetIntroInput}
              placeholder='우리만의 Meet을 소개해보세요.'
              placeholderTextColor='#676767'
            ></TextInput>
          </View>
        </Shadow>
        <TouchableOpacity style={styles.meetCreateBtn}>
          <Text style={styles.meetCreateBtnTxt}>Meet 시작하기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#E9F1FF',
    height: '100%',
  },
  backBtn: {
    marginTop: 56,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5470ff',
    marginTop: 26,
  },
  meetNameInput: {
    color: '#676767',
    marginTop: 37,
    width: 287,
    paddingVertical: 8.5,
    fontSize: 18,
    fontWeight: '700',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  meetIntroInput: {
    color: '#676767',
    fontWeight: '500',
    fontSize: 14,
    width: 287,
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
