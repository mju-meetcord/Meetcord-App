import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Platform,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { text } from 'stream/consumers';

export type AddScheduleProps = StackScreenProps<
  RootStackParamList,
  'AddSchedule'
>;

const AddSchduleScreen = ({ route }: AddScheduleProps) => {
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const [palce, setPlace] = useState('');
  const [description, setDescription] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);

  const [startTime, setStartTime] = useState<Date>(new Date(route.params.date));
  const [finishTime, setFinishTime] = useState<Date>(
    new Date(route.params.date)
  );

  // 안드로이드 커스텀용
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [finishTimeOpen, setFinishTimeOpen] = useState(false);
  const [isStartTimeTouched, setIsStartTimeTouched] = useState(false);
  const [isFinishTimeTouched, setIsFinishTimeTouched] = useState(false);

  const [selected, setSelected] = useState(undefined);

  const [isEditing, setIsEditing] = useState(route.params.eventData);

  useEffect(() => {
    if (route.params.eventData) {
      setTitle(route.params.eventData.title);
      setDescription(route.params.eventData.description);
      setPlace(route.params.eventData.place);
      setStartTime(new Date(route.params.eventData.start_time));
      setFinishTime(new Date(route.params.eventData.end_time));
    }
  }, []);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);

    if (!isEnabled) {
      const temp = new Date(startTime);
      temp.setHours(0);
      temp.setMinutes(0);
      setStartTime(temp);

      const temp2 = new Date(finishTime);
      temp2.setHours(23);
      temp2.setMinutes(59);
      setFinishTime(temp2);
    }
  };
  const navigation = useNavigation<NavigationProp>();

  const notiType = [
    '없음',
    '당일날(오전 9시)',
    '1일 전(오전 9시)',
    '2일 전(오전 9시)',
  ];

  const onPressStartTime = () => {
    Platform.OS === 'android' && setIsStartTimeTouched(!isStartTimeTouched);
    setStartTimeOpen(!startTimeOpen);
    if (finishTimeOpen) {
      setFinishTimeOpen(!finishTimeOpen);
    }
  };

  const onPressFinishTime = () => {
    Platform.OS === 'android' && setIsFinishTimeTouched(!isFinishTimeTouched);
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
    Platform.OS === 'android' && setIsStartTimeTouched(!isStartTimeTouched);
  };

  const handleFinishChange = (date: Date | undefined) => {
    setFinishTimeOpen(!setFinishTimeOpen);
    if (!date) {
      return;
    }
    setFinishTime(date);
    Platform.OS === 'android' && setIsFinishTimeTouched(!isFinishTimeTouched);
  };

  const deleteButtonPress = () => {
    Alert.alert('', title + '일정을 삭제하겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
      },
    ]);
  };

  const submitEvent = () => {
    if (route.params.eventData) {
      fetch('http://121.124.131.142:4000/meetEvent', {
        method: 'POST',
        body: JSON.stringify({
          id: route.params.eventData.id,
          title: title,
          start_time: startTime,
          end_time: finishTime,
          place: palce,
          description: description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response);
          navigation.pop();
        })
        .catch(error => console.error(error));
    } else {
      fetch('http://121.124.131.142:4000/meetEvent', {
        method: 'PUT',
        body: JSON.stringify({
          group_id: route.params.groupname,
          title: title,
          start_time: startTime,
          end_time: finishTime,
          place: palce,
          description: description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          navigation.pop();
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['bottom']}>
      {Platform.OS === 'android' && (
        <StatusBar backgroundColor='black' barStyle={'default'} />
      )}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.topBarText}>취소</Text>
        </TouchableOpacity>
        <Text style={[styles.topBarText, styles.topBarTitle]}>
          {isEditing ? '일정 편집' : '새로운 일정'}
        </Text>
        <TouchableOpacity onPress={() => submitEvent()}>
          <Text
            style={[styles.topBarText, !title ? styles.disabledAddText : null]}
          >
            {isEditing ? '완료' : '추가'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainView}>
        <View style={styles.mainScheduleInfoBox}>
          <View style={styles.innerScheduleBox}>
            <TextInput
              style={styles.mainScheduleInfoText}
              placeholder='제목'
              value={title}
              onChangeText={text => {
                text ? setIsDisabled(false) : setIsDisabled(true);
                setTitle(text);
              }}
              placeholderTextColor={'#878787'}
              autoFocus // 제목 value가 null일 때만
            />
          </View>
          <View style={styles.innerScheduleBox}>
            {/* 날짜 부분은 추후 Text 컴포넌트로 변경 및 props로 받아올 것 */}
            <TextInput
              style={styles.mainScheduleInfoText}
              placeholder='날짜'
              placeholderTextColor={'#878787'}
              value={new Date(route.params.date).toDateString()}
              editable={false}
            />
          </View>
          <View style={[styles.innerScheduleBox, styles.noneBorder]}>
            <TextInput
              style={styles.mainScheduleInfoText}
              placeholder='장소'
              value={palce}
              placeholderTextColor={'#878787'}
              onChangeText={text => {
                setPlace(text);
              }}
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
              <>
                {isEnabled ? (
                  <View style={styles.iOSTimeBlock} />
                ) : (
                  <DateTimePicker
                    value={startTime}
                    mode='time'
                    minuteInterval={10}
                    accentColor='#FA1F11'
                    onChange={(event, date) => {
                      if (date) {
                        const temp = new Date(date);
                        temp.setMonth(new Date(route.params.date).getMonth());
                        temp.setDate(new Date(route.params.date).getDate());
                        temp.setUTCFullYear(
                          new Date(route.params.date).getFullYear()
                        );

                        setStartTime(temp);
                      }
                    }}
                  />
                )}
              </>
            )}
            {Platform.OS === 'android' && (
              <>
                {isEnabled ? (
                  <View style={styles.androidTimeBlock} />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.androidTimePicker}
                      onPress={onPressStartTime}
                    >
                      <Text
                        style={[
                          styles.androidTimePickerText,
                          isStartTimeTouched && styles.androidAccentColor,
                        ]}
                      >
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
                        onChange={(event, date) => {
                          handleStartChange(date);
                        }}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </View>
          <View
            style={[styles.innerScheduleBox, styles.noneBorder, styles.timeBox]}
          >
            <Text style={styles.mainScheduleInfoText}>종료 시간</Text>
            {Platform.OS === 'ios' && (
              <>
                {isEnabled ? (
                  <View style={styles.iOSTimeBlock} />
                ) : (
                  <DateTimePicker
                    value={finishTime}
                    mode='time'
                    minuteInterval={10}
                    accentColor='#FA1F11'
                    onChange={(event, date) => {
                      if (date) {
                        const temp = new Date(date);
                        temp.setMonth(new Date(route.params.date).getMonth());
                        temp.setDate(new Date(route.params.date).getDate());
                        temp.setUTCFullYear(
                          new Date(route.params.date).getFullYear()
                        );

                        setFinishTime(temp);
                      }
                    }}
                  />
                )}
              </>
            )}
            {Platform.OS === 'android' && (
              <>
                {isEnabled ? (
                  <View style={styles.androidTimeBlock} />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.androidTimePicker}
                      onPress={onPressFinishTime}
                    >
                      <Text
                        style={[
                          styles.androidTimePickerText,
                          isFinishTimeTouched && styles.androidAccentColor,
                        ]}
                      >
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
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding' })}
          keyboardVerticalOffset={Platform.select({ ios: 100 })}
          style={{ flex: 1 }}
        >
          <View style={[styles.descriptionBox, styles.innerMaginTop]}>
            <TextInput
              style={styles.descriptionInput}
              placeholder='설명'
              placeholderTextColor={'#878787'}
              maxLength={150}
              multiline={true}
              numberOfLines={6}
              value={description}
              onChangeText={text => {
                setDescription(text);
              }}
            />
          </View>
        </KeyboardAvoidingView>
        {isEditing && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteButtonPress}
          >
            <Text style={styles.deleteButtonText}>일정 삭제</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: Platform.OS === 'android' ? 'black' : '#F5F5F5',
  },
  topBar: {
    backgroundColor: '#5496FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
  disabledAddText: {
    color: 'rgba(255, 255, 255, 0.5)',
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
  innerMaginTop: { marginTop: 30 },
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
  iOSTimeBlock: {
    width: 70,
    height: 35,
    borderRadius: 5,
    backgroundColor: '#EBEBF0',
  },
  androidTimeBlock: {
    width: 90,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#EBEBF0',
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
  androidAccentColor: {
    color: '#FA1F11',
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
    textAlignVertical: 'top',
  },
  deleteButton: {
    width: '90%',
    alignSelf: 'center',
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 124,
  },
  deleteButtonText: {
    color: '#FA1F11',
    fontSize: 17,
    lineHeight: 22,
  },
});

export default AddSchduleScreen;
