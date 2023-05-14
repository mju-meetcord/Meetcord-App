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
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export type RegisterScreenProps = StackScreenProps<
  RootStackParamList,
  'Register'
>;

const Register = ({ navigation }: RegisterScreenProps) => {
  const [check1, setCheck1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const backBtnHandle = () => {
    navigation.navigate('SignIn');
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
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 전화번호*</Text>
              <TextInput
                style={styles.input}
                placeholder='전화번호를 입력해주세요.'
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 생년월일*</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                placeholder='생년월일을 입력해주세요.'
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 이메일*</Text>
              <TextInput
                keyboardType='email-address'
                style={styles.input_email}
                placeholder='이메일을 입력해주세요.'
              />
              <TouchableOpacity
                style={styles.doubleCheck}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.doubleCheck_text}>중복확인</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 비밀번호*</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='비밀번호를 입력해주세요.'
              />
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.label as any}> 비밀번호 확인*</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='비밀번호를 한번 더 입력해주세요.'
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
          <View style={styles.box}></View>
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
              <View style={styles.inputBox}>
                <TextInput
                  style={{ flex: 0.8 }}
                  placeholderTextColor='#C6C6C6'
                  placeholder='숫자 입력'
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
                onPress={() => setModalVisible(false)}
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
    borderWidth: 2,
    borderColor: '#676767',
    borderRadius: 10,
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
    height: 300,
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
});

export default Register;
