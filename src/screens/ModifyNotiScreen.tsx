import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export type ModifyNotiScreenProps = StackScreenProps<
  RootStackParamList,
  'ModifyNoti'
>;

const ModifyNotiScreen = ({ route, navigation }: ModifyNotiScreenProps) => {
  const { top } = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [id, setId] = useState('');

  useEffect(() => {
    fetch(
      `http://121.124.131.142:4000/notificationDtail?id=${route.params.id}`,
      {
        // 검색어를 URL에 추가하여 GET 요청
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(response => {
        setTitle(response.data.title);
        setMessage(response.data.message);
        setId(response.data.notification_id);
      })
      .catch(error => console.error(error));
  }, []);

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

    fetch('http://121.124.131.142:4000/notificationDtail', {
      method: 'post',
      body: JSON.stringify({
        notification_id: id,
        title: title,
        message: message,
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
          navigation.pop();
        } else if (status == 401) {
          alert(response.message);
        }
      })
      .catch(error => console.error(error));
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
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
            >
              <Text style={styles.cancleBtn}>취소</Text>
            </TouchableOpacity>
            <Text style={styles.NotiDetail}>공지 사항 편집</Text>
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
            value={title}
          />
          <Text style={styles.date}>{new Date().toISOString()}</Text>
          <View style={styles.border} />
        </View>
        <ScrollView style={{ minHeight: 530 }}>
          <TextInput
            placeholder='내용을 입력해주세요.'
            style={styles.messageInput}
            placeholderTextColor={'#676767'}
            multiline={true}
            onChangeText={text => {
              setMessage(text);
            }}
            value={message}
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
  cancleBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
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
    height: 530,
    textAlignVertical: 'top',
  },
  bottomBox: {
    height: 100,
  },
  bottomText: {
    fontSize: 95,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5496FF33',
  },
});

export default ModifyNotiScreen;
