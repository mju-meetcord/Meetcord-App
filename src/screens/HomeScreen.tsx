import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RootStackParamList } from '../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventItem from '../components/EventItem';
import { Direction } from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Home'>,
  StackScreenProps<RootStackParamList>
>;

export interface MeetEvent {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  place: string;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [schedule, setSchedule] = useState(false);

  const [eventData, setEventData] = useState<{
    [key: string]: { marked: boolean; dotColor: string };
  }>({
    '2023-05-15': { marked: true, dotColor: '#50cebb' },
    '2023-05-16': { marked: true, dotColor: '#50cebb' },
  });

  const isFoused = useIsFocused();

  const [data, setData] = useState([
    { title: '', created_at: '', notification_id: '' },
    { title: '', created_at: '', notification_id: '' },
    { title: '', created_at: '', notification_id: '' },
  ]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [groupname, setGroupname] = useState('');

  const [eventDetailData, setEventDetailData] = useState<MeetEvent[]>([]);

  useEffect(() => {
    return () => {
      getNotiData();
      getEventData();
    };
  }, [isFoused]);

  useEffect(() => {
    getNotiData();
    getEventData();
  }, []);

  const getNotiData = () => {
    AsyncStorage.getItem('group_name', (err, result) => {
      if (result) {
        setGroupname(result);
      }
      fetch(`http://121.124.131.142:4000/notification?name=${result}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.data.length > 0) {
            response.data.sort;
            setData(response.data.sort().reverse());
          } else {
            setData([]);
          }
        })
        .catch(error => console.error(error));
    });

    AsyncStorage.getItem('group_role', (err, result) => {
      if (result == 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  };

  const getEventData = () => {
    AsyncStorage.getItem('group_name', (err, result) => {
      if (result) {
        setGroupname(result);
      }
      fetch(`http://121.124.131.142:4000/meetEvent?name=${result}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          const temp: { [key: string]: { marked: boolean; dotColor: string } } =
            {};
          if (response.data.length > 0) {
            response.data.forEach((i: { start_time: string }) => {
              temp[i.start_time.split('T')[0]] = {
                marked: true,
                dotColor: '#50cebb',
              };
            });

            setEventData(temp);
          } else {
            //setData([]);
          }
        })
        .catch(error => console.error(error));
    });
  };

  const handleDateSelect = (date: DateData) => {
    setSelectedDate(date.dateString);
    setSchedule(true);

    if (eventData[date.dateString] != undefined) {
      AsyncStorage.getItem('group_name', (err, result) => {
        if (result) {
          setGroupname(result);
        }
        fetch(
          `http://121.124.131.142:4000/meetEvent?name=${result}&&date=${date.dateString}`,
          {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then(response => response.json())
          .then(response => {
            const eventData = response.data.map(
              (item: {
                title: string;
                start_time: string;
                end_time: string;
                description: string;
                event_id: number;
                place: string;
              }) => {
                return {
                  id: item.event_id,
                  title: item.title,
                  description: item.description,
                  start_time: item.start_time,
                  end_time: item.end_time,
                  place: item.place,
                };
              }
            );

            setEventDetailData(eventData);
          })
          .catch(error => console.error(error));
      });
    } else {
      setEventDetailData([]);
    }
  };

  const handleMonthChange = (month: DateData) => {
    setCurrentMonth(month.dateString);
  };

  const handleNoti = (i: number) => {
    navigation.navigate('NotiDetail', {
      id: data[i].notification_id,
      isAdmin: false,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.notiLineText}>공지 안내</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.topContainer}
      >
        {[0, 1, 2].map(i => (
          <TouchableOpacity onPress={() => handleNoti(i)} key={i}>
            <View style={styles.notiBox}>
              <Text style={styles.notiHead}>{data[i].title}</Text>
              <Text style={styles.notiText}>{data[i].created_at}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.calenderText}>일정 캘린더</Text>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            ...eventData,
            [selectedDate]: { selected: true },
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#5496FF',
            selectedDayBackgroundColor: '#5496FF',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#5496FF',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            monthTextColor: '#2d4150',
            arrowColor: '#5496FF',
            indicatorColor: '#5496FF',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textMonthFontSize: 20,
            textDayFontSize: 16,
          }}
          style={{
            borderWidth: 1,
            borderColor: '#d6d7da',
            borderRadius: 20,
            overflow: 'hidden',
            height: 350,
            width: 380,
          }}
          onMonthChange={handleMonthChange}
          monthFormat={'yyyy MM'}
          hideExtraDays={true}
          renderArrow={(direction: Direction) => (
            <Text style={styles.arrow}>{direction === 'left' ? '<' : '>'}</Text>
          )}
        />
      </View>
      {schedule && (
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleBox}>
            <View style={styles.scheduleTop}>
              <Text
                style={{ fontSize: 22, color: '#5496FF', fontWeight: 'bold' }}
              >
                {`${selectedDate.split('-')[0]}년 ${
                  selectedDate.split('-')[1]
                }월 ${selectedDate.split('-')[2]}일 ${
                  new Date(selectedDate).toDateString().split(' ')[0]
                }`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddSchedule', {
                    date: new Date(selectedDate),
                    groupname: groupname,
                  });
                }}
              >
                <Icon name={'add-circle'} style={styles.eventAdd} />
              </TouchableOpacity>
            </View>
            {eventDetailData.map(i => {
              return (
                <EventItem
                  key={i.id}
                  data={i}
                  onpress={() => {
                    console.log(12);
                  }}
                />
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F1FF',
  },
  topContainer: {
    height: 100,
    backgroundColor: '#E9F1FF',
    flexDirection: 'row',
  },
  mainContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notiBox: {
    borderWidth: 1,
    borderColor: '#C6C6C6',
    width: 320,
    height: 70,
    borderRadius: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#C6C6C6',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 20,
  },
  notiHead: {
    fontSize: 23,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  notiText: {
    marginTop: 5,
    marginLeft: 20,
  },
  arrow: {
    color: '#5496FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scheduleContainer: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scheduleBox: {
    borderWidth: 1,
    borderColor: '#C6C6C6',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    width: 380,
    minHeight: 160,
    shadowColor: '#C6C6C6',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  eventAdd: {
    width: 30,
    textAlign: 'center',
    fontSize: 30,
    marginLeft: 20,
    color: '#5496FF',
    fontWeight: 'bold',
  },
  scheduleTop: {
    width: '100%',
    height: 60,
    borderBottomWidth: 2,
    borderColor: '#5496FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calenderText: {
    width: '100%',
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
    top: -15,
  },
  notiLineText: {
    height: 120,
    lineHeight: 180,
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
