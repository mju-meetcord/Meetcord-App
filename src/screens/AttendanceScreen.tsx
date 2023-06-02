import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackBtn from '../../assets/back_btn.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Member } from './MemberScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AttendanceItem from '../components/AttendanceItem';

type AttendanceScreenProps = StackScreenProps<RootStackParamList, 'Attendance'>;

const AttendanceScreen = ({ navigation, route }: AttendanceScreenProps) => {
  const [userData, setUserData] = useState<Member[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [groupname, setGroupname] = useState('');
  const [joinList, setJoinList] = useState(route.params.eventData.joinlist);

  useEffect(() => {
    getMemberData();
    getEventData();
    AsyncStorage.getItem('group_role', (err, result) => {
      if (result == 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  useEffect(() => {
    console.log(joinList);
  }, [joinList]);

  const getMemberData = () => {
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
            const memData = response.data.map(
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
            setUserData(memData);
          } else {
            setUserData([]);
          }
        })
        .catch(error => console.error(error));
    });
  };

  const getEventData = () => {
    AsyncStorage.getItem('group_name', (err, result) => {
      if (result) {
        setGroupname(result);
      }
      fetch(`http://121.124.131.142:4000/meetEvent?name=${result}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          const target_data = response.data.filter(
            (i: { event_id: number }) => i.event_id == route.params.eventData.id
          );
          setJoinList(target_data[0].joinlist);
        })
        .catch(error => console.error(error));
    });
  };

  return (
    <SafeAreaView style={styles.topWrapper} edges={['top']}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ height: 30, justifyContent: 'center' }}
        >
          <BackBtn />
        </TouchableOpacity>
        <Text style={[styles.topBarText, styles.topBarTitle]}>참여인원</Text>
        <TouchableOpacity
          style={{ height: 30, justifyContent: 'center' }}
          disabled={!isAdmin}
          onPress={() => getEventData()}
        >
          <Icon
            name='refresh'
            style={
              isAdmin
                ? { fontSize: 25, color: '#000000' }
                : { color: '#8AB4F8' }
            }
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainBox}>
        <Text style={styles.mainText1}>
          출석회원 -{' '}
          {
            userData.filter(i =>
              joinList.split(',').includes(i.mem_id.toString())
            ).length
          }
        </Text>
        {userData
          .filter(i => joinList.split(',').includes(i.mem_id.toString()))
          .map((data, i) => {
            return (
              <AttendanceItem
                data={data}
                key={i}
                checked={true}
                isAdmin={isAdmin}
                event_id={route.params.eventData.id}
                checking={() => getEventData()}
              />
            );
          })}
        <Text style={styles.mainText2}>
          미출석회원 -{' '}
          {userData.length -
            userData.filter(i =>
              joinList.split(',').includes(i.mem_id.toString())
            ).length}
        </Text>
        {userData
          .filter(i => !joinList.split(',').includes(i.mem_id.toString()))
          .map((data, i) => {
            return (
              <AttendanceItem
                data={data}
                key={i}
                checked={false}
                isAdmin={isAdmin}
                event_id={route.params.eventData.id}
                checking={() => getEventData()}
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topWrapper: {
    flex: 1,
    backgroundColor: '#8AB4F8',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    height: 88,
    paddingBottom: 20,
    backgroundColor: '#8AB4F8',
  },
  topBarText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },
  topBarTitle: {
    fontWeight: '600',
  },
  mainBox: {
    backgroundColor: '#ffffff',
  },
  mainText1: {
    height: 44,
    backgroundColor: '#EBEBF0',
    color: '#5496FF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 44,
    paddingLeft: 20,
  },
  mainText2: {
    height: 44,
    backgroundColor: '#EBEBF0',
    color: '#676767',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 44,
    paddingLeft: 20,
  },
});

export default AttendanceScreen;
