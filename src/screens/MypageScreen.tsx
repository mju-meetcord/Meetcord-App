import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BottomTabParamList, RootStackParamList } from '../types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ProfileIcon from '../../assets/icon_profile.svg';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

type MypageScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Mypage'>,
  StackScreenProps<RootStackParamList>
>;

const MypageScreen = ({ navigation }: MypageScreenProps) => {
  const { top } = useSafeAreaInsets();

  const logout = () => {
    Alert.alert('Alert', '로그아웃 하겠습니까?', [
      {
        text: 'YES',
        onPress: () => console.log(),
        style: 'default',
      },
      {
        text: 'NO',
        onPress: () => console.log(),
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
        <ProfileIcon />
      </View>
      <View style={styles.Container2}>
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>이름</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>전소영</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>닉네임</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>몽키매직</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>전화번호</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>010-4864-8648</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>이메일</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>mokey@naver.com</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>생년월일</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>2001년 2월 31일</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.fixProfile}
        onPress={() => navigation.navigate('ModifyMypage')}
      >
        <Text style={styles.fixBox}>프로필 수정하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logOut} onPress={logout}>
        <Text>로그아웃</Text>
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
    marginTop: 70,
    marginBottom: 20,
  },

  topContainer: {
    backgroundColor: '#5496FF',
  },

  container1: {
    backgroundColor: '#FFFFFF',
    marginTop: 55,
    marginBottom: 45,
    alignItems: 'center',
  },

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
    fontWeight: 'bold',
    color: '#5496FF',
  },

  logOut: {
    marginTop: 40,
    alignItems: 'center',
  },

  logoutBox: {
    fontSize: 18,
    fontWeight: '700',
    color: '#676767',
  },

  bottomBox: {
    height: 100,
    marginTop: 58,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#5496FF',
    opacity: 0.3,
  },
});
export default MypageScreen;
