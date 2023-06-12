import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import SignInInput from '../components/signIn/SignInInput';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export type SignInScreenProps = StackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  useFocusEffect(
    useCallback(() => {
      setId('');
      setPw('');
    }, [])
  );

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
              navigation.navigate('InitMeet');
            });
          });
        } else if (status == 401) {
          alert(response.message);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
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
            inputValue={id}
            keyboardType={'email-address'}
            isEmail={true}
          />
          <SignInInput
            text='비밀번호 입력'
            secureTextEntry={true}
            setText={setPw}
            inputValue={pw}
            keyboardType={'default'}
            isEmail={false}
          />
          <TouchableOpacity style={styles.signInBtn} onPress={loginSubmit}>
            <Text style={styles.signInBtnTxt}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpBox}>
          <Text style={styles.welcomeTxt}>
            아직 Meetcord 회원이 아니신가요?
          </Text>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.signUpBtnTxt}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
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
    fontSize: 40,
    lineHeight: 50,
    fontWeight: '700',
    color: '#000000',
  },
  subTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 46,
  },
  formBox: {
    alignItems: 'center',
  },
  signInBtn: {
    width: 350,
    height: 50,
    backgroundColor: '#5496FF',
    borderRadius: 10,
    marginBottom: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtnTxt: {
    fontSize: 24,
    letterSpacing: 3,
    fontWeight: '700',
    color: '#ffffff',
  },
  signUpBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcomeTxt: {
    color: '#676767',
    fontSize: 13,
    lineHeight: 16,
  },
  signUpBtn: {
    width: 85,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5496FF',
    marginLeft: 10,
  },
  signUpBtnTxt: {
    fontSize: 18,
    color: '#5496FF',
  },
});

export default SignInScreen;
