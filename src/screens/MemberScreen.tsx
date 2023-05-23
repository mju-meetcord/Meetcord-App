import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeberItem from '../components/MeberItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { BottomTabParamList } from '../types';
import { useEffect, useState } from 'react';
import MemberModal from '../components/MemberModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MemberScreenProps = BottomTabScreenProps<BottomTabParamList, 'Member'>;

export interface Member {
  id: number;
  profile: ImageSourcePropType;
  name: string;
  introduction: string;
  role: string;
  nickname: string;
  birthday: string;
  email: string;
  phone: string;
}

const MemberScreen = () => {
  const [btnCheck, setBtnCheck] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const isFoused = useIsFocused();

  const [userData, setUserData] = useState<Member[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [groupname, setGroupname] = useState('');
  const [modalData, setModalData] = useState<Member>({
    id: -1,
    profile: { uri: 'http://121.124.131.142:4000/images/user/default.jpg' },
    name: 'xxx',
    introduction: '',
    role: 'temp',
    nickname: '',
    birthday: '',
    email: 'xxx@xxxx.com',
    phone: '010xxxxxxxx',
  });

  useEffect(() => {
    return () => {
      getNotiData();
    };
  }, [isFoused]);

  useEffect(() => {
    getNotiData();
  }, []);

  const getNotiData = () => {
    AsyncStorage.getItem('group_name', (err, result) => {
      if (result) {
        setGroupname(result);
      }
      fetch(`http://121.124.131.142:4000/member?name=${result}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.data.length > 0) {
            const meetData = response.data.map(
              (item: {
                user_id: number;
                profile_photo: ImageSourcePropType;
                name: string;
                introduction: string;
                role: string;
                email: string;
                nickname: string;
                birthday: string;
                phone: string;
              }) => {
                return {
                  id: item.user_id,
                  profile: item.profile_photo,
                  name: item.name,
                  introduction: item.introduction,
                  role: item.role,
                  nickname: item.nickname,
                  birthday: item.birthday,
                  email: item.email,
                  phone: item.phone,
                };
              }
            );
            setUserData(meetData);
          } else {
            setUserData([]);
          }
        })
        .catch(error => console.error(error));
    });

    AsyncStorage.getItem('group_role', (err, result) => {
      if (result == 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#E9F1FF',
      }}
      edges={['right', 'left', 'top']}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>{groupname}의 구성원</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setBtnCheck(true)}
          >
            <Text style={btnCheck ? styles.btnTextActive : styles.btnText}>
              회원
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setBtnCheck(false)}
          >
            <Text style={btnCheck ? styles.btnText : styles.btnTextActive}>
              운영자
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {btnCheck ? (
            <View style={{ minHeight: 200 }}>
              {userData
                .filter(data => data.role != 'admin')
                .map((data, i) => {
                  return (
                    <MeberItem
                      data={data}
                      key={i}
                      onpress={() => {
                        setModalData(data);
                        setModalVisible(true);
                      }}
                    />
                  );
                })}
            </View>
          ) : (
            <View style={styles.listBox}>
              {userData
                .filter(data => data.role == 'admin')
                .map((data, i) => {
                  return (
                    <MeberItem
                      data={data}
                      key={i}
                      onpress={() => {
                        setModalData(data);
                        setModalVisible(true);
                      }}
                    />
                  );
                })}
            </View>
          )}
        </ScrollView>
      </View>
      <MemberModal
        data={modalData}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 120,
    justifyContent: 'flex-end',
    backgroundColor: '#E9F1FF',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
  },

  btnContainer: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    height: '80%',
    width: '50%',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#C6C6C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#878787',
  },
  btnTextActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },

  listBox: {
    minHeight: 100,
    maxHeight: 200,
    marginBottom: 60,
  },
  title2: {
    fontSize: 23,
    fontWeight: 'bold',
    left: 20,
  },
  main: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  bottomDommy: {
    height: 30,
  },
});
export default MemberScreen;
