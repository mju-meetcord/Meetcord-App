import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../assets/back_btn_white.svg';
import { useState } from 'react';

const ScheduleDetailScreen = () => {
  const [hasPlace, setHasPlace] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.topWrapper} edges={['top']}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButtonBox}>
            <BackButton style={styles.backButton} />
            <Text style={styles.topBarText}>뒤로</Text>
          </TouchableOpacity>
          <Text style={[styles.topBarText, styles.topBarTitle]}>일정 세부</Text>
          <TouchableOpacity style={styles.topBarRightBox}>
            <Text style={styles.topBarText}>편집</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.mainBox}>
          <View style={styles.scheduleOuterBox}>
            <View style={styles.innerBox}>
              <Text style={styles.subTitle}>일정 설명</Text>
            </View>
            <View
              style={[
                styles.scheduleInnerBox,
                hasDescription && styles.scheduleDescriptionBox,
              ]}
            >
              <Text style={styles.scheduleTitle}>일정 이름</Text>
              <Text style={styles.scheduleInfo}>일정 일자</Text>
              <Text style={styles.scheduleInfo}>
                {hasPlace ? '일정 장소' : '장소 미정'}
              </Text>
              {hasDescription && (
                <Text style={styles.scheduleDescriptionText}>일정 설명</Text>
              )}
            </View>
          </View>
          <View style={styles.activityOuterBox}>
            <View style={styles.innerBox}>
              <Text style={styles.subTitle}>활동 기록</Text>
            </View>
            <View style={styles.activityPhotoBox}>
              <Text style={styles.activityTopText}>
                활동 사진이 없습니다 :)
              </Text>
            </View>
            <View style={[styles.innerBox, styles.hashTagBox]}>
              <Text style={styles.activityTopText}>#</Text>
            </View>
          </View>
          <View style={[styles.innerBox, styles.activityRecordBox]}>
            <Text style={styles.initAcitivityRecordText}>
              아직 활동 기록이 없습니다.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
  },
  backButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
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
  topBarRightBox: {
    width: 62,
    alignItems: 'flex-end',
  },
  mainBox: {
    backgroundColor: '#ffffff',
  },
  innerBox: {
    width: '90%',
    alignSelf: 'center',
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 30,
  },
  scheduleOuterBox: {
    marginTop: 20,
  },
  scheduleInnerBox: {
    width: '90%',
    alignSelf: 'center',
    height: 86,
    backgroundColor: '#E9F1FF',
    marginTop: 10,
    paddingTop: '2%',
    paddingLeft: '2%',
  },
  scheduleTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 25,
  },
  scheduleInfo: {
    fontSize: 16,
    lineHeight: 20,
    color: '#676767',
  },
  scheduleDescriptionBox: {
    height: 216,
  },
  scheduleDescriptionText: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
  },
  activityOuterBox: {
    marginTop: 30,
  },
  activityPhotoBox: {
    marginTop: 10,
    height: 216,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#E9F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTopText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#5496FF',
  },
  hashTagBox: {
    height: 30,
    justifyContent: 'center',
  },
  activityRecordBox: {
    marginTop: 10,
  },
  initAcitivityRecordText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#878787',
  },
});

export default ScheduleDetailScreen;
