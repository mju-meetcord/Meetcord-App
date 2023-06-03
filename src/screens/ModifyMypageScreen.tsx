import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import BackBtn from '../../assets/back_btn.svg';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import CameraIcon from 'assets/camera_icon.svg';

type ModifyMypageScreenProps = StackScreenProps<
  RootStackParamList,
  'ModifyMypage'
>;

const MypageScreen = ({ route, navigation }: ModifyMypageScreenProps) => {
  const { top } = useSafeAreaInsets();
  const [image, setImage] = useState(route.params.imageurl);
  const [nickname, setNickname] = useState(route.params.nickName);

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

  const submitUserData = () => {
    if (route.params.imageurl == image && route.params.nickName == nickname) {
      navigation.pop();
      return;
    }

    const formData = new FormData();

    if (image) {
      const imageData = {
        uri: image,
        name: route.params.name + route.params.phoneNum + '.jpg',
        type: 'image/jpg',
      };

      formData.append(
        'image',
        imageData,
        route.params.name + route.params.phoneNum + '.jpg'
      );
    }
    formData.append('nickname', nickname);
    AsyncStorage.getItem('UserToken', (err, result) => {
      if (result) {
        formData.append('token', result);
      }
      fetch(`http://121.124.131.142:4000/user`, {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => response.json())
        .then(response => {
          Image.clearMemoryCache();
          Image.clearDiskCache();

          navigation.pop();
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
      <View style={[styles.statusBarPlaceholder, { height: top }]} />
      <View style={styles.topContainer}>
        <Text style={styles.MyPage}>마이 페이지 수정</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <BackBtn style={styles.backBtn} />
      </TouchableOpacity>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.proImg}
          onPress={() => {
            selectImage();
          }}
        >
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode='cover'
          />
          <CameraIcon style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.Container2}>
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>이름</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{route.params.name}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.modifySection}>
            <Text style={styles.modifyBox}>닉네임</Text>
          </View>
          <View style={styles.modifyUserSection}>
            <TextInput
              style={styles.modifyNickname}
              maxLength={15}
              onChangeText={setNickname}
              value={nickname}
              placeholder='닉네임을 입력해주세요'
              placeholderTextColor={'#676767'}
            />
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>전화번호</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{route.params.phoneNum}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>이메일</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{route.params.email}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.Container3}>
          <View style={styles.section}>
            <Text style={styles.box}>생년월일</Text>
          </View>
          <View style={styles.userSection}>
            <Text style={styles.userBox}>{route.params.birth}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.modifyMypage}>
        <Text style={styles.modifyMypageBox} onPress={() => submitUserData()}>
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
    marginTop: 38,
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
    width: 120,
    height: 120,
  },

  proImg: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#aaaaaa',
    borderColor: '#B3B3B3',
    borderWidth: 1,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 2,
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
    fontWeight: '600',
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
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 14 : 0,
  },
  bottomText: {
    fontSize: 95,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5496FF',
    opacity: 0.3,
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
    width: '75%',
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
    width: '100%',
    height: '100%',
    backgroundColor: '#E9F1FF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    textAlign: 'right',
    paddingRight: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
export default MypageScreen;
