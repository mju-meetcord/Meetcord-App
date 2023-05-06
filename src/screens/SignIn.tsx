import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SignInInput from '../components/SignInInput';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }: any) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const loginSubmit = () => {
    let status = 0;

    fetch('http://121.124.131.142:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: id,
        password: pw,
      }),
    })
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(response => {
        if (status == 200) {
          AsyncStorage.setItem('UserToken', response.token, () => {
            AsyncStorage.getItem('UserToken', (err, result) => {
              console.log(result);
              navigation.navigate('initMeet');
            });
          });
        } else if (status == 401) {
          alert(response.message);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleBox}>
        <Text style={styles.mainTitle}>Meetcord</Text>
        <Text style={styles.subTitle}>만남을 기록하다.</Text>
      </View>
      <View style={styles.formBox}>
        <SignInInput
          text='이메일 입력'
          secureTextEntry={false}
          setText={setId}
          keyboardType={'email-address'}
        />
        <SignInInput
          text='비밀번호 입력'
          secureTextEntry={true}
          setText={setPw}
          keyboardType={'default'}
        />
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={loginSubmit} // 테스트용 home 화면으로 바로 넘기기
        >
          <Text style={styles.signInBtnTxt}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpBox}>
        <Text style={styles.welcomeTxt}>Meetcord가 처음이신가요?</Text>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => navigation.navigate('register')}
        >
          <Text style={styles.signUpBtnTxt}>회원가입</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeTxt}>을 마치고 Meet에 참여하세요.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E9F1FF',
    height: '100%',
    justifyContent: 'center',
  },
  titleBox: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    color: '#000000',
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 94,
  },
  formBox: {
    alignItems: 'center',
  },
  signInBtn: {
    width: 324,
    height: 50,
    backgroundColor: '#5496FF',
    borderRadius: 10,
    marginBottom: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtnTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  signUpBox: {
    alignItems: 'center',
  },
  welcomeTxt: {
    color: '#676767',
    fontSize: 13,
    lineHeight: 16,
  },
  signUpBtn: {
    width: 95,
    height: 40,
    backgroundColor: '#5496FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  signUpBtnTxt: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default SignIn;
