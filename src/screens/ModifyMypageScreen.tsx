import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import ProfileIcon from '../../assets/icon_profile.svg';
import { StackScreenProps } from '@react-navigation/stack';
import BackBtn from '../../assets/back_btn.svg';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

type ModifyMypageScreenProps = StackScreenProps<
  RootStackParamList,
  'ModifyMypage'
>;

const MypageScreen = ({ navigation }: ModifyMypageScreenProps) => {
  const { top } = useSafeAreaInsets();
  const [image, setImage] = useState('');
  const [nickname, setNickname] = useState('');

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission denied!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitMeetData = async () => {
    const formData = new FormData();

    if (image != '') {
      const imageData = {
        uri: image,
        nickname: nickname + '.jpg',
        type: 'image/jpg',
      };

      formData.append('image', imageData, nickname + '.jpg');
    }
    formData.append('nickname', nickname);
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
        <Text style={styles.MyPage}>마이 페이지 수정</Text>
      </View>
      <TouchableOpacity>
        <BackBtn style={styles.backBtn} onPress={() => navigation.pop()} />
      </TouchableOpacity>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.proImg}
          onPress={() => {
            selectImage();
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode='cover'
            />
          ) : (
            <ProfileIcon />
          )}
        </TouchableOpacity>
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
          <View style={styles.modifySection}>
            <Text style={styles.modifyBox}>닉네임</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.modifyUserSection}>
              <TextInput
                style={styles.modifyNickname}
                maxLength={15}
                onChangeText={setNickname}
                value={nickname}
              >
                <Text style={styles.modifyUserBox}>몽키매직</Text>
              </TextInput>
            </View>
          </TouchableOpacity>
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
      <TouchableOpacity style={styles.modifyMypage}>
        <Text
          style={styles.modifyMypageBox}
          onPress={() => {
            submitMeetData();
            navigation.pop();
          }}
        >
          프로필 저장하기
        </Text>
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
    marginTop: 19,
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

  backBtn: {
    marginLeft: 20,
    marginTop: 20,
  },

  image: {
    width: 104,
    height: 104,
  },

  proImg: {
    marginTop: 26,
    width: 104,
    height: 104,
    borderRadius: 52,
    overflow: 'hidden',
    alignItems: 'center',
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
    color: '#676767',
  },

  userSection: {
    width: '70%',
    height: '100%',
    backgroundColor: '#E9F1FF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
  },

  userBox: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#676767',
  },

  border: {
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
    marginHorizontal: 10,
  },

  modifyMypage: {
    marginTop: 30,
    alignItems: 'center',
  },

  modifyMypageBox: {
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
    marginTop: 126,
    height: 100,
  },
  bottomText: {
    fontSize: 96,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5496FF33',
  },
  modifySection: {
    width: '25%',
    height: '100%',
    backgroundColor: '#E9F1FF',
    alignItems: 'center',
    marginRight: 20,
    flexDirection: 'row',
    borderRadius: 10,
  },
  modifyBox: {
    color: '#000000',
    fontSize: 16,
  },
  modifyUserSection: {
    width: '84%',
    height: '100%',
    backgroundColor: '#E9F1FF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
  },
  modifyUserBox: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  modifyNickname: {
    // width: '84%',
    height: '100%',
    backgroundColor: '#E9F1FF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
  },
});
export default MypageScreen;
