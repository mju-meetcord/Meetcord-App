import { useState, useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../assets/back_btn_white.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export type ScheduleDetailProps = StackScreenProps<
  RootStackParamList,
  'ScheduleDetail'
>;

export interface EventRecord {
  id: number;
  tag_message: string;
  main_img: string;
  detail: string;
  event_id: number;
}

const ScheduleDetailScreen = ({ route }: ScheduleDetailProps) => {
  const [dateString, setDateString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [hasPlace, setHasPlace] = useState(false);
  const [hasDescription, setHasDescription] = useState(true);
  const [recordData, setRecordData] = useState<EventRecord>({
    id: -1,
    tag_message: '',
    main_img: '',
    detail: '',
    event_id: route.params.data.id,
  });
  const [joinList, setJoinList] = useState(route.params.data.joinlist);

  const isFoused = useIsFocused();

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    return () => {
      getActivityData();
      getEventData();
    };
  }, [isFoused]);

  useEffect(() => {
    getActivityData();
    getEventData();
  }, []);

  useEffect(() => {
    const temp = new Date(route.params.data.start_time);
    setDateString(
      temp.getFullYear() + '년' + temp.getMonth() + '월' + temp.getDate() + '일'
    );

    const temp2 = new Date(route.params.data.start_time);

    const sh =
      temp2.getHours().toString().length == 1
        ? '0' + temp2.getHours().toString()
        : temp2.getHours();
    const sm =
      temp2.getMinutes().toString().length == 1
        ? '0' + temp2.getMinutes().toString()
        : temp2.getMinutes();

    const temp3 = new Date(route.params.data.end_time);
    const eh =
      temp3.getHours().toString().length == 1
        ? '0' + temp3.getHours().toString()
        : temp3.getHours();
    const em =
      temp3.getMinutes().toString().length == 1
        ? '0' + temp3.getMinutes().toString()
        : temp3.getMinutes();

    setTimeString(sh + ':' + sm + '~' + eh + ':' + em);
  }, []);

  const getActivityData = () => {
    fetch(`http://121.124.131.142:4000/record?id=${route.params.data.id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.data.length > 0) {
          const temp = response.data.map(
            (item: {
              record_id: number;
              detail: string;
              main_img: string;
              tag_message: string;
            }) => {
              return {
                id: item.record_id,
                tag_message: item.tag_message,
                main_img: item.main_img
                  ? 'http://121.124.131.142:4000/images/record/' + item.main_img
                  : item.main_img,
                detail: item.detail,
                event_id: route.params.data.id,
              };
            }
          );
          setRecordData(temp[0]);
        } else {
          //setData([]);
        }
      })
      .catch(error => console.error(error));
  };

  const getEventData = () => {
    AsyncStorage.getItem('group_name', (err, result) => {
      fetch(`http://121.124.131.142:4000/meetEvent?name=${result}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          const target_data = response.data.filter(
            (i: { event_id: number }) => i.event_id == route.params.data.id
          );
          setJoinList(target_data[0].joinlist);
        })
        .catch(error => console.error(error));
    });
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.topWrapper} edges={['top']}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButtonBox}
            onPress={() => navigation.pop()}
          >
            <BackButton style={styles.backButton} />
            <Text style={styles.topBarText}>뒤로</Text>
          </TouchableOpacity>
          <Text style={[styles.topBarText, styles.topBarTitle]}>일정 세부</Text>
          <TouchableOpacity
            style={styles.topBarRightBox}
            onPress={() =>
              navigation.navigate('AddActivityRecord', { data: recordData })
            }
          >
            <Text style={styles.topBarText}>편집</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.mainBox}>
          <View style={styles.scheduleOuterBox}>
            <View style={styles.innerBox}>
              <Text style={styles.subTitle}>일정 설명</Text>
            </View>
            <View style={[styles.scheduleInnerBox]}>
              <Text style={styles.scheduleTitle}>
                {route.params.data.title}
              </Text>
              <Text style={styles.scheduleInfo}>
                {dateString + '\n' + timeString}
              </Text>
              <Text style={styles.scheduleInfo}>{route.params.data.place}</Text>
              {hasDescription && (
                <Text style={styles.scheduleDescriptionText}>
                  {route.params.data.description}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.scheduleOuterBox}>
            <View style={styles.innerBox}>
              <Text style={styles.subTitle}>참여 인원</Text>
            </View>
            <View style={styles.joinBox}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {joinList.split(',').filter(i => parseInt(i)).length}명
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Attendance', {
                    eventData: route.params.data,
                  })
                }
              >
                <Icon
                  name={'navigate-next'}
                  style={{ fontSize: 30, color: '#676767' }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.activityOuterBox}>
            <View style={styles.innerBox}>
              <Text style={styles.subTitle}>활동 기록</Text>
            </View>
            {recordData?.main_img ? (
              <Image
                source={{ uri: recordData.main_img }}
                style={styles.activityImage}
              />
            ) : (
              <View style={styles.activityPhotoBox}>
                <Text style={styles.activityBlueText}>
                  활동 사진이 없습니다 :)
                </Text>
              </View>
            )}
            <View style={[styles.innerBox, styles.hashTagBox]}>
              <Text style={styles.activityBlueText}>#</Text>
              <Text style={styles.activityBlueText}>
                {recordData?.tag_message ? recordData.tag_message : ''}
              </Text>
            </View>
          </View>
          <View style={[styles.innerBox, styles.activityRecordBox]}>
            {recordData?.detail ? (
              <Text style={styles.activityRecordText}>{recordData.detail}</Text>
            ) : (
              <Text style={styles.initAcitivityRecordText}>
                아직 활동 기록이 없습니다.
              </Text>
            )}
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
    minHeight: 90,
    backgroundColor: '#E9F1FF',
    marginTop: 10,
    paddingTop: '2%',
    paddingLeft: '3%',
    paddingBottom: '2%',
    borderRadius: 10,
  },
  joinBox: {
    marginTop: 10,
    width: '90%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E9F1FF',
    marginLeft: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 10,
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
  activityImage: {
    marginTop: 10,
    height: 216,
    width: '90%',
    alignSelf: 'center',
  },
  activityBlueText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#5496FF',
  },
  hashTagBox: {
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  activityRecordBox: {
    marginTop: 10,
    maxHeight: 310,
  },
  initAcitivityRecordText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#878787',
  },
  activityRecordText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#000000',
  },
});

export default ScheduleDetailScreen;
