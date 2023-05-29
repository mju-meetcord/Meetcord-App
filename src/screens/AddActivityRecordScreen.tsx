import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CameraIcon from 'assets/camera_icon.svg';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type AddActivityRecordScreenProps = StackScreenProps<
  RootStackParamList,
  'AddActivityRecord'
>;

const AddActivityRecordScreen = ({ route }: AddActivityRecordScreenProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hashTagText, setHashTagText] = useState(route.params.data?.hashTag);
  const [detailText, setDetailText] = useState(route.params.data?.detail);

  useEffect(() => {
    if (!route.params.data) {
      return;
    }
    if (Object.keys(route.params.data).length) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  });

  return (
    <SafeAreaView style={styles.topWrapper} edges={['top']}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.topBarText}>취소</Text>
        </TouchableOpacity>
        <Text style={[styles.topBarText, styles.topBarTitle]}>
          {isEditing ? '활동 기록 편집' : '활동 기록 추가'}
        </Text>
        <TouchableOpacity>
          <Text style={styles.topBarText}>완료</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainBox}>
        <View style={styles.activityOuterBox}>
          <View style={styles.innerBox}>
            <Text style={styles.subTitle}>활동 기록</Text>
          </View>
          <TouchableOpacity style={styles.activityPhotoBox}>
            {isEditing && route.params.data?.image ? (
              <Image
                source={route.params.data?.image}
                style={styles.activityImage}
              />
            ) : null}
            <CameraIcon style={styles.cameraIcon} />
          </TouchableOpacity>
          <View style={[styles.innerBox, styles.hashTagBox]}>
            <Text style={styles.hashTagText}>#</Text>
            <TextInput
              placeholder='활동을 한마디로 표현해 보세요'
              placeholderTextColor={'#5496FF'}
              style={[styles.hashTagText, styles.hashTagInput]}
              maxLength={20}
              value={hashTagText}
              onChangeText={text => setHashTagText(text)}
            />
          </View>
        </View>
        <View style={[styles.innerBox, styles.activityRecordBox]}>
          <TextInput
            style={styles.activityRecordText}
            placeholder='내용을 입력해주세요.'
            placeholderTextColor={'#676767'}
            multiline={true}
            maxLength={320}
            numberOfLines={10}
            value={detailText}
            onChangeText={text => setDetailText(text)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topWrapper: {
    flex: 1,
    backgroundColor: '#5496FF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 12,
    height: 88,
    paddingBottom: 20,
    backgroundColor: '#5496FF',
  },
  topBarText: {
    color: '#FFFFFF',
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
  subTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 30,
  },
  activityPhotoBox: {
    marginTop: 10,
    height: 216,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#E9F1FF',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  activityImage: {
    height: 216,
    width: '100%',
    alignSelf: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  hashTagBox: {
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  hashTagText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#5496FF',
  },
  hashTagInput: {
    lineHeight: Platform.OS === 'ios' ? 0 : 30,
    height: 30,
  },
  innerBox: {
    width: '90%',
    alignSelf: 'center',
  },
  activityOuterBox: {
    marginTop: 30,
  },
  activityRecordBox: {
    marginTop: 10,
    maxHeight: 310,
  },
  activityRecordText: {
    fontSize: 16,
    color: '#000000',
    textAlignVertical: 'top',
  },
});

export default AddActivityRecordScreen;
