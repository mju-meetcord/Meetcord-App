import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditMeberItem from '../components/EditMeberItem';
import { Member } from './MemberScreen';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types';

const EditMemberScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [btnCheck, setBtnCheck] = useState(true);

  const isFoused = useIsFocused();

  const [userData, setUserData] = useState<Member[]>([]);

  const [reload, setReload] = useState<string>('');

  useEffect(() => {
    return () => {
      getNotiData();
    };
  }, [isFoused]);

  useEffect(() => {
    getNotiData();
  }, [reload]);

  useEffect(() => {
    return;
  }, [userData]);

  useEffect(() => {
    getNotiData();
  }, []);

  const getNotiData = () => {
    AsyncStorage.getItem('group_name', (err, result) => {
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
                member_id: number;
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
                  mem_id: item.member_id,
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
          <Text style={styles.title}>구성원 편집</Text>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={styles.editBtn}>완료</Text>
          </TouchableOpacity>
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
              <Text
                style={{
                  height: 20,
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginLeft: 20,
                  marginTop: 20,
                }}
              >
                승인 대기 예비 회원
              </Text>
              {userData
                .filter(data => data.role == 'waiting')
                .map((data, i) => {
                  return (
                    <EditMeberItem
                      data={data}
                      key={i}
                      option={true}
                      setReload={setReload}
                    />
                  );
                })}
              <Text
                style={{
                  height: 20,
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginLeft: 20,
                  marginTop: 20,
                }}
              >
                회원
              </Text>
              {userData
                .filter(data => data.role == 'member')
                .map((data, i) => {
                  return (
                    <EditMeberItem
                      data={data}
                      key={i}
                      option={false}
                      setReload={setReload}
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
                    <EditMeberItem
                      data={data}
                      key={i}
                      option={false}
                      setReload={setReload}
                    />
                  );
                })}
            </View>
          )}
        </ScrollView>
      </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#E9F1FF',
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5496FF',
    left: 25,
  },
  editBtn: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    right: 25,
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
export default EditMemberScreen;
