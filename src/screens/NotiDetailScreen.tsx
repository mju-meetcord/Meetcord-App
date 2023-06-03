import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BackBtn from '../../assets/back_btn.svg';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

type NotiDetailScreenProps = StackScreenProps<RootStackParamList, 'NotiDetail'>;

const NotiDetailScreen = ({ route, navigation }: NotiDetailScreenProps) => {
  const isFoused = useIsFocused();
  const { top } = useSafeAreaInsets();

  const [data, setData] = useState({ title: '', created_at: '', message: '' });
  const [isAdmin, setIsAdmin] = useState(route.params.isAdmin);

  useEffect(() => {
    return () => {
      getData();
    };
  }, [isFoused]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
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
        setData(response.data);
      })
      .catch(error => console.error(error));
  };

  const submitDelreq = () => {
    fetch(`http://121.124.131.142:4000/notificationDtail`, {
      // 검색어를 URL에 추가하여 GET 요청
      method: 'delete',
      body: JSON.stringify({ notification_id: route.params.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        navigation.pop();
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
      <View style={[styles.statusBarPlaceholder, { height: top }]}></View>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <View style={styles.leftBox}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.pop()}
            >
              <BackBtn />
            </TouchableOpacity>
            <Text style={styles.NotiDetail}>공지사항</Text>
          </View>
          <View style={styles.rightBox}>
            <TouchableOpacity
              disabled={!isAdmin}
              onPress={() => {
                Alert.alert(
                  '이 글을 삭제하시겠습니까?',
                  '',
                  [
                    { text: '아니요', style: 'cancel' },
                    { text: '네', onPress: submitDelreq }, //버튼 제목
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Text style={isAdmin ? styles.deleteBtn : styles.btn}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!isAdmin}
              onPress={() => {
                navigation.navigate('ModifyNoti', { id: route.params.id });
              }}
            >
              <Text style={isAdmin ? styles.modifyBtn : styles.btn}>편집</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>
          {new Date(data.created_at).getFullYear() +
            '년 ' +
            (new Date(data.created_at).getMonth() + 1) +
            '월 ' +
            new Date(data.created_at).getDate() +
            '일 ' +
            new Date(data.created_at).getHours() +
            '시 ' +
            new Date(data.created_at).getMinutes() +
            '분 '}
        </Text>
        <View style={styles.border} />
      </View>
      <ScrollView style={{ minHeight: 530 }}>
        <Text style={styles.message}>{data.message}</Text>
      </ScrollView>
      <View style={styles.bottomBox}>
        <Text style={styles.bottomText}>Meetcord</Text>
      </View>
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

  border: {
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
    marginHorizontal: 6,
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 30,
  },
  leftBox: {
    flexDirection: 'row',
  },
  rightBox: {
    flexDirection: 'row',
    gap: 22,
  },
  backBtn: {
    marginLeft: 12,
  },
  btn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E9F1FF',
  },
  modifyBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5496FF',
  },
  deleteBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FA1F11',
  },
  NotiDetail: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 10,
    marginLeft: 25,
  },

  date: {
    fontSize: 16,
    color: '#676767',
    marginLeft: 25,
    marginBottom: 14,
  },
  message: {
    fontSize: 16,
    width: '85%',
    marginTop: 14,
    marginHorizontal: 25,
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
  },
});

export default NotiDetailScreen;
