import { View, Text, Button, StyleSheet } from 'react-native';
import SignInInput from '../components/SignInInput';

const SignIn = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleBox}>
        <Text style={styles.mainTitle}>Meetcord</Text>
        <Text style={styles.subTitle}>만남을 기록하다.</Text>
      </View>
      <View style={styles.inputBox}>
        <SignInInput text='이메일 입력' />
        <SignInInput text='비밀번호 입력' />
      </View>
      <Button title='로그인' />
      <Button title='회원가입' />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E9F1FF',
    height: '100%',
  },
  titleBox: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    color: '#000000',
    marginTop: 138,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 94,
  },
  inputBox: {
    alignItems: 'center',
  },
});

export default SignIn;
