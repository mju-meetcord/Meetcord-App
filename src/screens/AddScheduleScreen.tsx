import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';

const AddSchduleScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [finishTimeOpen, setFinishTimeOpen] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const notiType = [
    '없음',
    '당일날(오전 9시)',
    '1일 전(오전 9시)',
    '2일 전(오전 9시)',
  ];

  const onPressStartTime = () => {
    setStartTimeOpen(!startTimeOpen);
    if (finishTimeOpen) {
      setFinishTimeOpen(!finishTimeOpen);
    }
  };

  const onPressFinishTime = () => {
    setFinishTimeOpen(!finishTimeOpen);
    if (startTimeOpen) {
      setStartTimeOpen(!startTimeOpen);
    }
  };

  const handleStartChange = (date: Date | undefined) => {
    setStartTimeOpen(!setStartTimeOpen);
    if (!date) {
      return;
    }
    setStartTime(date);
  };

  const handleFinishChange = (date: Date | undefined) => {
    setFinishTimeOpen(!setFinishTimeOpen);
    if (!date) {
      return;
    }
    setFinishTime(date);
  };

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
          <View style={[styles.innerScheduleBox, styles.timeBox]}>
            <Text style={styles.mainScheduleInfoText}>시작 시간</Text>
            {Platform.OS === 'ios' && (
              <DateTimePicker
                value={startTime}
                mode='time'
                minuteInterval={10}
                accentColor='#FA1F11'
              />
            )}
            {Platform.OS === 'android' && (
              <>
                <TouchableOpacity
                  style={styles.androidTimePicker}
                  onPress={onPressStartTime}
                >
                  <Text style={styles.androidTimePickerText}>
                    {startTime.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </TouchableOpacity>
                {startTimeOpen && (
                  <DateTimePicker
                    value={startTime}
                    mode='time'
                    minuteInterval={10}
                    display='spinner'
                    onChange={(event, date) => handleStartChange(date)}
                  />
                )}
              </>
            )}
          </View>
          <View
            style={[styles.innerScheduleBox, styles.noneBorder, styles.timeBox]}
          >
            <Text style={styles.mainScheduleInfoText}>종료 시간</Text>
            {Platform.OS === 'ios' && (
              <DateTimePicker
                value={finishTime}
                mode='time'
                minuteInterval={10}
                accentColor='#FA1F11'
              />
            )}
            {Platform.OS === 'android' && (
              <>
                <TouchableOpacity
                  style={styles.androidTimePicker}
                  onPress={onPressFinishTime}
                >
                  <Text style={styles.androidTimePickerText}>
                    {finishTime.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </TouchableOpacity>
                {finishTimeOpen && (
                  <DateTimePicker
                    value={finishTime}
                    mode='time'
                    minuteInterval={10}
                    display='spinner'
                    onChange={(event, date) => handleFinishChange(date)}
                  />
                )}
              </>
            )}
          </View>
        </View>
        <View style={[styles.notiSettingBox, styles.innerMaginTop]}>
          <Text style={styles.notiSettingText}>알림</Text>
          <SelectDropdown
            data={notiType}
            onSelect={setSelected}
            defaultButtonText={notiType[0]}
            defaultValueByIndex={0}
            statusBarTranslucent={true}
            buttonStyle={styles.notiSelectBox}
            buttonTextStyle={styles.notiSelectText}
            dropdownStyle={styles.notiDropDownBox}
            rowStyle={styles.notiDropDownItemBox}
            rowTextStyle={styles.notiDropDownItemText}
            selectedRowTextStyle={styles.notiSelectedText}
          />
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
    color: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '85%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  innerScheduleBox: {
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
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
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  androidTimePicker: {
    width: 90,
    height: 30,
    backgroundColor: '#EBEBF0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidTimePickerText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 19,
  },
  notiSettingBox: {
    width: '85%',
    height: 40,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
  notiSettingText: { fontSize: 16 },
  notiSelectBox: {
    backgroundColor: '#FFFFFF',
    height: 30,
  },
  notiDropDownBox: {
    borderRadius: 10,
    width: 220,
  },
  notiSelectText: {
    fontSize: 16,
    color: '#878787',
    textAlign: 'right',
  },
  notiSelectedText: {
    color: '#5496FF',
  },
  notiDropDownItemBox: {
    height: 45,
  },
  notiDropDownItemText: {
    textAlign: 'left',
    marginLeft: 35,
  },
  descriptionBox: {
    backgroundColor: '#FFFFFF',
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
