import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BackBtn from '../../assets/back_btn.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export type CreateNotiScreenProps = StackScreenProps<
  RootStackParamList,
  'CreateNoti'
>;

const CreateNotiScreen = ({ route, navigation }: CreateNotiScreenProps) => {
  const { top } = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const submitNoti = () => {
    if (title == '') {
      alert('공지 제목이 입력되지 않았습니다.');
      return;
    }

    if (message == '') {
      alert('공지 내용이 입력되지 않았습니다.');
      return;
    }

    // 유효성 체크
    let status = 0;

    AsyncStorage.getItem('UserToken', (err, result) => {
      fetch('http://121.124.131.142:4000/notification', {
        method: 'PUT',
        body: JSON.stringify({
          token: result,
          title: title,
          message: message,
          group: route.params.meetname,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          status = response.status;
          return response.json();
        })
        .then(response => {
          if (status == 200) {
            alert(response.message);
            navigation.pop();
          } else if (status == 401) {
            alert(response.message);
          }
        })
        .catch(error => console.error(error));
    });
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
      edges={['bottom']}
    >
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={[styles.statusBarPlaceholder, { height: top }]}></View>
        <View style={styles.topContainer}>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.backBtn}>
                <BackBtn />
              </TouchableOpacity>
              <Text style={styles.NotiDetail}>공지 추가</Text>
            </View>
            <TouchableOpacity onPress={submitNoti}>
              <Text style={styles.addBtn}>완료</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='제목을 입력해주세요.'
            style={styles.titleInput}
            placeholderTextColor={'#878787'}
            onChangeText={text => {
              setTitle(text);
            }}
          />
          <Text style={styles.date}>{new Date().toISOString()}</Text>
          <View style={styles.border} />
        </View>
        <ScrollView
          style={{
            minHeight: 530,
            ...Platform.select({
              android: {
                // minheight: '63%',
              },
            }),
          }}
        >
          <TextInput
            placeholder='내용을 입력해주세요.'
            style={styles.messageInput}
            placeholderTextColor={'#676767'}
            multiline={true}
            onChangeText={text => {
              setMessage(text);
            }}
          />
        </ScrollView>
        <View style={styles.bottomBox}>
          <Text style={styles.bottomText}>Meetcord</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#E9F1FF',
  },

  statusBarPlaceholder: {
    backgroundColor: '#E9F1FF',
  },
  addBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5496FF',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
    marginHorizontal: 6,
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  titleInput: {
    height: 36,
    marginTop: 45,
    marginBottom: 10,
    marginLeft: 25,
    width: '85%',
    fontWeight: 'bold',
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#5496FF',
  },

  backBtn: {
    ...Platform.select({
      android: {
        paddingTop: 7,
      },
    }),
  },

  NotiDetail: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  date: {
    fontSize: 16,
    color: '#676767',
    marginLeft: 25,
    marginBottom: 14,
  },

  messageInput: {
    fontSize: 16,
    width: '85%',
    marginTop: 14,
    marginHorizontal: 25,
    borderWidth: 2,
    height: 530,
    borderColor: '#5496FF',
    ...Platform.select({
      android: {
        textAlignVertical: 'top',
        height: 450,
      },
    }),
  },
  bottomBox: {
    height: 100,
  },
  bottomText: {
    fontSize: 96,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5496FF33',
    marginTop: -14,
    ...Platform.select({
      android: {
        marginTop: -86,
        fontSize: 90,
      },
    }),
  },
});

export default CreateNotiScreen;
