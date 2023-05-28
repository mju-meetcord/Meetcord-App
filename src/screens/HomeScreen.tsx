import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EventItem from '../components/EventItem';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [schedule, setSchedule] = useState(false);

  const handleDateSelect = (date: DateData) => {
    setSelectedDate(date.dateString);
    setSchedule(true);
  };

  const handleMonthChange = (month: DateData) => {
    setCurrentMonth(month.dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          height: 120,
          lineHeight: 180,
          left: 30,
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        공지 안내
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.topContainer}
      >
        <View style={styles.notiBox}>
          <Text style={styles.notiHead}>Map 종강 파티 안내</Text>
          <Text style={styles.notiText}>시간: 6월16일 금요일 오후 7시</Text>
        </View>
        <View style={styles.notiBox}>
          <Text style={styles.notiHead}>Map 종강 파티 안내</Text>
          <Text style={styles.notiText}>시간: 6월16일 금요일 오후 7시</Text>
        </View>
        <View style={styles.notiBox}>
          <Text style={styles.notiHead}>Map 종강 파티 안내</Text>
          <Text style={styles.notiText}>시간: 6월16일 금요일 오후 7시</Text>
        </View>
      </ScrollView>
      <View style={styles.mainContainer}>
        <Text
          style={{
            width: '100%',
            left: 30,
            fontSize: 20,
            fontWeight: 'bold',
            top: -15,
          }}
        >
          일정 캘린더
        </Text>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true },
            '2023-05-15': { marked: true, dotColor: '#50cebb' },
          }}
          theme={{
            calendarBackground: '#fff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            monthTextColor: '#2d4150',
            arrowColor: '#00adf5',
            indicatorColor: '#00adf5',
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
          renderArrow={(direction: any) => (
            <Text style={styles.arrow}>{direction === 'left' ? '<' : '>'}</Text>
          )}
        />
      </View>
      {schedule && (
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleBox}>
            <View
              style={{
                width: '100%',
                height: 60,
                borderBottomWidth: 2,
                borderColor: '#5496FF',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ fontSize: 22, color: '#5496FF', fontWeight: 'bold' }}
              >
                {`${selectedDate.split('-')[0]}년 ${
                  selectedDate.split('-')[1]
                }월 ${selectedDate.split('-')[2]}일 ${
                  new Date(selectedDate).toDateString().split(' ')[0]
                }`}
              </Text>
              <TouchableOpacity>
                <Icon
                  name={'add-circle'}
                  style={{
                    width: 30,
                    textAlign: 'center',
                    fontSize: 30,
                    marginLeft: 20,
                    color: '#5496FF',
                    fontWeight: 'bold',
                  }}
                />
              </TouchableOpacity>
            </View>
            {[1, 2].map(i => {
              return <EventItem key={i} />;
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
    color: '#00adf5',
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
});

export default HomeScreen;
