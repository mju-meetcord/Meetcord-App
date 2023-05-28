import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types';

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [schedule, setSchedule] = useState(false);
  const tempNav = useNavigation<NavigationProp>();

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    setSchedule(true);
  };

  const handleMonthChange = (month: any) => {
    setCurrentMonth(month.dateString);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
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
      </View>
      <View style={styles.mainContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{ [selectedDate]: { selected: true } }}
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
            borderRadius: 5,
            overflow: 'hidden',
            height: 400,
            width: 360,
          }}
          onMonthChange={handleMonthChange}
          monthFormat={'yyyy MM'}
          hideExtraDays={true}
          renderArrow={(direction: any) => (
            <Text style={styles.arrow}>{direction === 'left' ? '<' : '>'}</Text>
          )}
        />
      </View>
      <Button
        title='바로가기'
        onPress={() => tempNav.navigate('AddSchedule')}
      />
      {schedule && (
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleBox}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 40 }}>
              컴퓨터 아키텍처 중간고사
            </Text>
            <Text style={{ fontSize: 15, lineHeight: 22 }}>
              2023년 5월 3일 수요일
            </Text>
            <Text style={{ fontSize: 15, lineHeight: 22 }}>
              시간: 15:00 ~ 16:00
            </Text>
            <Text style={{ fontSize: 15, lineHeight: 22 }}>
              장소: 5공학관 Y5407 강의실
            </Text>
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
    height: 160,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 15,
  },
  mainContainer: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notiBox: {
    borderWidth: 1,
    borderColor: '#C6C6C6',
    width: '80%',
    height: '50%',
    borderRadius: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#C6C6C6',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  notiHead: {
    fontSize: 25,
    marginLeft: 20,
  },
  notiText: {
    marginTop: 10,
    marginLeft: 20,
  },
  arrow: {
    color: '#00adf5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scheduleContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scheduleBox: {
    borderWidth: 1,
    borderColor: '#C6C6C6',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 360,
    height: 160,
    shadowColor: '#C6C6C6',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
  },
});

export default HomeScreen;
