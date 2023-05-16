import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import ImageButton from '../components/ImageButton';
import { Button, CheckBox } from '@rneui/themed';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import PersonalInfoBox from '../components/PersonalInfoBox';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export type RegisterScreenProps = StackScreenProps<
  RootStackParamList,
  'Register'
>;

const Register = ({ navigation }: RegisterScreenProps) => {
  const [check1, setCheck1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birth, setBirth] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [email, setEmail] = useState('');
  const [emailcheck, setEmailcheck] = useState(true);

  const [token, setToken] = useState('');
  const [otp, setOtp] = useState('');

  const [emailEditable, setEmailEditable] = useState(true);
  const [btnDisable, setBtnDisable] = useState(false);

  const [otpError, setOtpError] = useState(false);

  const backBtnHandle = () => {
    navigation.navigate('SignIn');
  };

  const emailAuth = () => {
    // 이메일 정규식  test 함수로 정규식 확인 가능
    const regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
    console.log(regex.test(email));
    console.log(email);

    if (regex.test(email)) {
      setEmailcheck(true);
    } else {
      setEmailcheck(false);
      return;
    }

    //setModalVisible(true);
    fetch('http://121.124.131.142:4000/emailAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        if (response.result == 200) {
          setToken(response.token);
          setModalVisible(true);
        } else {
          setEmailcheck(false);
          return;
        }
      });
  };

  const otpSubmit = () => {
    if (otp.length != 4) return;

    fetch('http://121.124.131.142:4000/emailAuth', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
        token: token,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.result == 200) {
          setEmailEditable(false);
          setBtnDisable(true);
          setModalVisible(false);
        } else {
          setOtpError(true);
        }
      })
      .catch(error => console.error(error));
  };

  const submit = () => {
    if (name == '') return;
    if (phoneNum == '') return;
    if (birth == '') return;
    if (!emailcheck || !btnDisable) return;
    if (password == '') return;
    if (!check1) return;
    if (password != password2) return;

    fetch('http://121.124.131.142:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phoneNum: phoneNum,
        birth: birth,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(response => {
        alert(response.message);
      })
      .catch(error => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.Container1}>
          <View style={styles.one}>
            <ImageButton
              onPress={backBtnHandle}
              source={require('../../assets/backBtn.png')}
              color='#FFFFFF'
            ></ImageButton>
          </View>
          <View style={styles.two}>
            <Text style={styles.mainTitle}>Meetcord</Text>
            <Text style={styles.subTitle}> 만남을 기록하다.</Text>
          </View>
          <View style={styles.three}></View>
        </View>
        <View style={styles.Container2}>
          <Text style={styles.mainTitle2}>회원정보 입력</Text>
          <Text style={styles.subTitle2}>
            회원가입을 위해 필요한 정보를 입력해주세요.
          </Text>
          <Text style={styles.subTitle2}>
            *표시 항목은 필수입력 항목입니다.
          </Text>
        </View>
        <View style={styles.Container3}>
          <View style={styles.box}>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 이름*</Text>
              <TextInput
                style={styles.input}
                placeholder='이름을 입력해주세요.'
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 전화번호*</Text>
              <TextInput
                style={styles.input}
                placeholder='전화번호를 입력해주세요.'
                onChangeText={text => setPhoneNum(text)}
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 생년월일*</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                placeholder='생년월일을 입력해주세요.'
                onChangeText={text => setBirth(text)}
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 이메일*</Text>
              <TextInput
                keyboardType='email-address'
                style={
                  emailcheck ? styles.input_email : styles.input_email_error
                }
                placeholder='이메일을 입력해주세요.'
                onChangeText={text => setEmail(text)}
                editable={emailEditable}
              />
              <TouchableOpacity
                style={styles.doubleCheck}
                onPress={emailAuth}
                disabled={btnDisable}
              >
                <Text
                  style={
                    !btnDisable
                      ? styles.doubleCheck_text
                      : styles.doubleCheck_text_end
                  }
                >
                  중복확인
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 비밀번호*</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='비밀번호를 입력해주세요.'
                onChangeText={text => setPassword(text)}
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 비밀번호 확인*</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='비밀번호를 한번 더 입력해주세요.'
                onChangeText={text => setPassword2(text)}
              />
            </View>
          </View>
        </View>
        <View style={styles.Container4}>
          <Text style={styles.text1}>
            개인정보 수집·이용 동의서 (Meetcord 운영 안내)
          </Text>
        </View>
        <View style={styles.Container5}>
          <PersonalInfoBox />
        </View>
        <View style={styles.Container6}>
          <CheckBox
            center
            title='상기내용을 확인하였고, 개인정보 수집·이용에 동의합니다.'
            checked={check1}
            onPress={() => setCheck1(!check1)}
            containerStyle={{
              backgroundColor: '(0, 0, 0, 0.5)',
            }}
          />
        </View>
        <View style={styles.Container7}>
          <Button
            title='가입하기'
            buttonStyle={{
              borderRadius: 10,
              width: 100,
              height: 40,
            }}
            onPress={submit}
          />
        </View>

        <Modal
          isVisible={modalVisible}
          animationIn='fadeIn'
          animationOut='fadeOut'
          /*onBackdropPress={() => setModalVisible(false)}*/
          style={{
            flex: 1,
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Text style={styles.Textstyle1}>
                사용할 수 있는 이메일 입니다!
              </Text>
              <Text style={styles.Textstyle1}>
                Meetcord에서 보낸 메일을 확인하고,{' '}
              </Text>
              <Text style={styles.Textstyle1}>
                보이는 숫자를 입력해 주세요.
              </Text>
            </View>
            <View style={styles.modalContainer}>
              <View style={otpError ? styles.inputBox_error : styles.inputBox}>
                <TextInput
                  style={{ flex: 0.8 }}
                  placeholderTextColor='#C6C6C6'
                  placeholder='숫자 입력'
                  onChangeText={text => setOtp(text)}
                ></TextInput>
              </View>
            </View>
            <View style={styles.modalContainer}>
              <Button
                title='완료'
                buttonStyle={{
                  borderRadius: 10,
                  width: 80,
                  height: 40,
                }}
                onPress={otpSubmit}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  Container1: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
  },
  mainTitle: {
    fontSize: 30,
    color: '#5496FF',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    color: '#5496FF',
  },
  one: {
    flex: 0.15,
    width: 100,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  two: {
    flex: 0.7,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  three: {
    flex: 0.15,
    width: 100,
  },

  Container2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    paddingTop: 20,
  },
  mainTitle2: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle2: {
    fontSize: 15,
    color: '#000',
  },

  Container3: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
  },
  box: {
    borderWidth: 1,
    borderColor: '#676767',
    borderRadius: 5,
    width: 360,
    height: 300,
    overflow: 'hidden',
  },
  itemBox: {
    height: 50,
    display: 'flex',
    borderBottomWidth: 1,
    borderColor: '#EBEBF0',
    flexDirection: 'row',
  },
  label: {
    flex: 0.3,
    backgroundColor: '#F5F5F5',
    lineHeight: 50,
    fontSize: 13,
    fontWeight: 500,
  },
  input: {
    flex: 0.7,
    padding: 12,
  },
  Container4: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    padding: 5,
  },
  text1: {
    fontWeight: '500',
    fontSize: 15,
  },
  Container5: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  Container6: {},
  Container7: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
    paddingBottom: 10,
  },
  input_email: {
    flex: 0.45,
    padding: 12,
    borderWidth: 0,
    borderColor: 'red',
  },
  input_email_error: {
    flex: 0.45,
    padding: 12,
    borderWidth: 1,
    borderColor: 'red',
  },

  doubleCheck: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleCheck_text: {
    borderWidth: 1,
    width: '70%',
    height: 30,
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 5,
  },
  doubleCheck_text_end: {
    borderWidth: 1,
    borderColor: 'green',
    width: '70%',
    height: 30,
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 5,
  },
  buttonContainer: {
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#007AFF',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 340,
    height: 300,
    borderRadius: 15,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 0.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Textstyle1: {
    fontSize: 15,
    color: '#5496FF',
    fontWeight: 'bold',
  },
  inputBox: {
    borderWidth: 1,
    width: '80%',
    height: '50%',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox_error: {
    borderWidth: 1,
    borderColor: 'red',
    width: '80%',
    height: '50%',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Register;
