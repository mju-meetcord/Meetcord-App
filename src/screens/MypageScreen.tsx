import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BottomTabParamList, RootStackParamList } from '../types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

type MypageScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Mypage'>,
  StackScreenProps<RootStackParamList>
>;

const MypageScreen = ({ navigation }: MypageScreenProps) => {
  const { top } = useSafeAreaInsets();
  const [imageurl, setImageurl] = useState<ImageSourcePropType>({
    uri: 'http://121.124.131.142:4000/images/default.jpg',
  });
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  const [imageStr, setImageStr] = useState(
    'http://121.124.131.142:4000/images/default.jpg'
  );

  const isFoused = useIsFocused();

  useEffect(() => {
    return () => {
      getNotiData();
    };
  }, [isFoused]);

  useEffect(() => {
    getNotiData();
  }, []);

  const getNotiData = () => {
    AsyncStorage.getItem('UserToken', (err, result) => {
      fetch(`http://121.124.131.142:4000/user?token=${result}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          const temp = new Date(response.data.birth);
          setBirth(
            temp.getFullYear() +
              '년' +
              temp.getMonth() +
              '월' +
              temp.getDate() +
              '일'
          );
          setEmail(response.data.email);
          setImageurl({
            uri:
              'http://121.124.131.142:4000/images/user/' + response.data.prolie,
          });
          setName(response.data.name);
          setPhoneNum(response.data.phone);
          setNickName(response.data.nickName);
          setImageStr(
            'http://121.124.131.142:4000/images/user/' + response.data.prolie
          );
        })
        .catch(error => console.error(error));
    });
  };

  const logout = () => {
    Alert.alert('로그아웃 하겠습니까?', '', [
      {
        text: '예',
        onPress: () => {
          navigation.navigate('SignIn');
        },
        style: 'default',
      },
      {
        text: '아니오',
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
      edges={['bottom']}
    >
      <View style={[styles.statusBarPlaceholder, { height: top }]} />
      <View style={styles.topContainer}>
        <Text style={styles.MyPage}>마이 페이지</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.imageBox}>
          <Image source={imageurl} style={styles.img} />
        </View>
      </View>
      <View style={styles.Container2}>
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>이름</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{name}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>닉네임</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{nickName}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>전화번호</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{phoneNum}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>이메일</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{email}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>생년월일</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{birth}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.fixProfile}
        onPress={() =>
          navigation.navigate('ModifyMypage', {
            name: name,
            nickName: nickName,
            phoneNum: phoneNum,
            email: email,
            birth: birth,
            imageurl: imageStr,
          })
        }
      >
        <Text style={styles.fixBox}>프로필 수정하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logOut} onPress={logout}>
        <Text style={styles.logoutBox}>로그아웃</Text>
      </TouchableOpacity>
      <View style={styles.bottomBox}>
        <Text style={styles.bottomText}>Meetcord</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#5496FF',
  },

  MyPage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 25,
    marginTop: 38,
    marginBottom: 20,
  },

  topContainer: {
    backgroundColor: '#5496FF',
  },

  container1: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
    marginBottom: 45,
  },
  imageBox: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#aaaaaa',
    overflow: 'hidden',
    borderColor: '#B3B3B3',
  },
  img: { width: '100%', height: '100%', borderRadius: 30 },
  Container2: {
    height: '25%',
    backgroundColor: '#E9F1FF',
    borderRadius: 10,
    marginHorizontal: 25,
    overflow: 'hidden',
  },

  Container3: {
    height: '19%',
    backgroundColor: '#E9F1FF',
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 25,
  },

  section: {
    width: '25%',
    height: '100%',
    backgroundColor: '#E9F1FF',
    alignItems: 'center',
    marginRight: 20,
    flexDirection: 'row',
    borderRadius: 10,
  },

  box: {
    fontSize: 16,
  },

  userSection: {
    width: '70%',
    height: '100%',
    backgroundColor: '#E9F1FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
  },

  userBox: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  border: {
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
    marginHorizontal: 10,
  },

  fixProfile: {
    marginTop: 30,
    alignItems: 'center',
  },

  fixBox: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5496FF',
  },

  logOut: {
    marginTop: 40,
    alignItems: 'center',
  },

  logoutBox: {
    fontSize: 16,
    fontWeight: '700',
    color: '#676767',
  },

  bottomBox: {
    height: 100,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomText: {
    fontSize: 95,
    fontWeight: 'bold',
    color: '#5496FF',
    opacity: 0.3,
  },
});
export default MypageScreen;
