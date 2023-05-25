import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddSchduleScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.topBarText}>취소</Text>
        </TouchableOpacity>
        <Text style={[styles.topBarText, styles.topBarTitle]}>새로운 일정</Text>
        <TouchableOpacity>
          <Text style={styles.topBarText}>추가</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainView}>
        <View style={styles.mainScheduleInfoBox}>
          <View style={styles.innerScheduleBox}>
            <TextInput
              style={styles.mainScheduleInfoText}
              placeholder='제목'
              placeholderTextColor={'#878787'}
            />
          </View>
          <View style={styles.innerScheduleBox}>
            {/* 날짜 부분은 추후 Text 컴포넌트로 변경 및 props로 받아올 것 */}
            <TextInput
              style={styles.mainScheduleInfoText}
              placeholder='날짜'
              placeholderTextColor={'#878787'}
            />
          </View>
          <View style={[styles.innerScheduleBox, styles.noneBorder]}>
            <TextInput
              style={styles.mainScheduleInfoText}
              placeholder='장소'
              placeholderTextColor={'#878787'}
            />
          </View>
        </View>
        <View style={[styles.mainScheduleInfoBox, styles.innerMaginTop]}>
          <View style={[styles.innerScheduleBox, styles.switchBox]}>
            <Text style={styles.mainScheduleInfoText}>하루 종일</Text>
            <Switch
              trackColor={{ false: '#D1D1D6', true: '##D1D1D6' }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.innerScheduleBox}>
            <Text style={styles.mainScheduleInfoText}>시작 시간</Text>
          </View>
          <View style={[styles.innerScheduleBox, styles.noneBorder]}>
            <Text style={styles.mainScheduleInfoText}>종료 시간</Text>
          </View>
        </View>
        <View style={[styles.notiSettingBox, styles.innerMaginTop]}>
          <Text style={styles.notiSettingText}>알림</Text>
        </View>
        <View style={[styles.descriptionBox, styles.innerMaginTop]}>
          <TextInput
            style={styles.descriptionInput}
            placeholder='설명'
            placeholderTextColor={'#878787'}
            maxLength={150}
            multiline={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#5496FF',
  },
  topBar: {
    backgroundColor: '#5496FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  topBarText: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '500',
    marginHorizontal: 15,
  },
  topBarTitle: {
    fontWeight: '600',
  },
  mainView: {
    backgroundColor: '#F5F5F5',
  },
  mainScheduleInfoBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '85%',
    height: 120,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  innerScheduleBox: {
    borderBottomWidth: 1,
    borderColor: '#c6c6c6',
    height: 40,
    justifyContent: 'center',
  },
  noneBorder: {
    borderBottomWidth: 0,
  },
  innerMaginTop: {
    marginTop: 20,
  },
  mainScheduleInfoText: {
    color: '#000000',
    fontSize: 16,
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notiSettingBox: {
    width: '85%',
    height: 40,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  notiSettingText: { fontSize: 16 },
  descriptionBox: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '85%',
    height: 160,
    borderRadius: 10,
    alignSelf: 'center',
  },
  descriptionInput: {
    fontSize: 16,
    lineHeight: 20,
  },
});

export default AddSchduleScreen;
