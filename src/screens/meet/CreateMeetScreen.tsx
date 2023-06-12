import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Pressable,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import BackBtn from 'assets/back_btn.svg';
import ProfileIcon from 'assets/icon_profile.svg';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types';

const CreateMeetScreen = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

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
    // 유효성 체크
    if (name == '') {
      alert('Meet 이름이 입력되지 않았습니다.');
      return;
    }
    if (description == '') {
      alert('Meet의 소개글이 입력되지 않았습니다.');
      return;
    }

    let status = 0;

    const formData = new FormData();

    if (image != '') {
      const imageData = {
        uri: image,
        name: name + '.jpg',
        type: 'image/jpg',
      };

      formData.append('image', imageData, name + '.jpg');
    }

    //formData.append('token');
    formData.append('name', name);
    formData.append('description', description);

    AsyncStorage.getItem('UserToken', (err, result) => {
      formData.append('token', result ? result.toString() : '');

      fetch('http://121.124.131.142:4000/meet', {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
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
    <SafeAreaView style={styles.topWrapper} edges={['bottom']}>
      <View style={[styles.statusBarPlaceholder, { height: top }]} />
      <Pressable
        style={styles.wrapper}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.pop()}
        >
          <BackBtn />
        </TouchableOpacity>
        <Text style={styles.title}>새로운 Meet 만들기</Text>
        <Shadow startColor='rgba(0, 0, 0, 0.25)' distance={4} offset={[0, 4]}>
          <View style={styles.meetInfoBox}>
            <TouchableOpacity
              style={styles.meetImg}
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
            <View style={styles.nameInputBox}>
              <TextInput
                style={styles.meetNameInput}
                placeholder='Meet 이름을 입력해주세요.'
                placeholderTextColor='#676767'
                maxLength={15}
                onChangeText={text => {
                  setName(text);
                }}
              />
              <Text style={styles.txtCount}>{name.length}/15</Text>
            </View>
            <View style={styles.introInputBox}>
              <TextInput
                style={styles.meetIntroInput}
                placeholder='우리만의 Meet을 소개해보세요.'
                placeholderTextColor='#676767'
                multiline={true}
                maxLength={80}
                onChangeText={text => {
                  setDescription(text);
                }}
              />
              <Text style={styles.txtCount}>{description.length}/80</Text>
            </View>
          </View>
        </Shadow>
        <TouchableOpacity
          style={styles.meetCreateBtn}
          onPress={() => {
            submitMeetData();
          }}
        >
          <Text style={styles.meetCreateBtnTxt}>Meet 시작하기</Text>
        </TouchableOpacity>
        <View style={styles.bottomLogoBox}>
          <Text style={styles.bottomLogoText}>Meetcord</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topWrapper: {
    flex: 1,
    backgroundColor: '#E9F1FF',
  },
  statusBarPlaceholder: {
    backgroundColor: '#E9F1FF',
  },
  wrapper: {
    alignItems: 'center',
    height: '100%',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 74,
  },
  title: {
    fontWeight: '700',
    color: '#5496FF',
    fontSize: 25,
    marginBottom: 20,
  },
  meetInfoBox: {
    width: 340,
    height: 340,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  meetImg: {
    marginTop: 26,
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#B3B3B3',
  },
  nameInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 287,
    height: 35,
    marginTop: 37,
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  meetNameInput: {
    color: '#676767',
    fontSize: 18,
    fontWeight: '700',
    width: 208,
  },
  txtCount: {
    color: '#878787',
    fontWeight: '500',
    fontSize: 14,
  },
  introInputBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 287,
    height: 80,
    justifyContent: 'space-between',
  },
  meetIntroInput: {
    color: '#676767',
    fontWeight: '500',
    fontSize: 14,
    width: '80%',
    paddingVertical: 8.5,
  },
  meetCreateBtn: {
    marginTop: 30,
    backgroundColor: '#5496ff',
    width: 144,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetCreateBtnTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  bottomLogoBox: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 50,
    height: 100,
  },
  bottomLogoText: {
    fontSize: 95,
    fontWeight: 'bold',
    color: ' rgba(84, 150, 255, 0.3)',
  },
});

export default CreateMeetScreen;
