import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { EventItemProps } from '../types';
import { CheckBox } from '@rneui/themed';
import { useEffect, useState } from 'react';

const EventItem = ({
  data,
  onpress,
  isAdmin,
  onpress2,
  memId,
  checking,
}: EventItemProps) => {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (memId) {
      setCheck(data.joinlist.split(',').includes(memId.toString()));
    }
  }, []);

  const checkAttendanceTrue = () => {
    fetch('http://121.124.131.142:4000/meetEvent', {
      method: 'patch',
      body: JSON.stringify({
        event_id: data.id,
        member_id: memId,
        option: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error(error));
  };
  const checkAttendanceFalse = () => {
    fetch('http://121.124.131.142:4000/meetEvent', {
      method: 'patch',
      body: JSON.stringify({
        event_id: data.id,
        member_id: memId,
        option: 2,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        {isAdmin ? (
          <TouchableOpacity onPress={() => onpress()}>
            <Icon name={'settings-outline'} style={styles.setIcon} />
          </TouchableOpacity>
        ) : (
          <CheckBox
            center
            title='상기내용을 확인하였고, 개인정보 수집·이용에 동의합니다.'
            checked={check}
            onPress={() => {
              if (check) {
                checkAttendanceFalse();
                setCheck(false);
                checking();
              } else {
                return Alert.alert(
                  '출석 체크',
                  `${data.title}일정에 출석 체크 합니다.`,
                  [
                    {
                      text: 'ok',
                      onPress: () => {
                        setCheck(true);
                        checkAttendanceTrue();
                        checking();
                      },
                    },
                  ]
                );
              }
            }}
            containerStyle={{
              backgroundColor: '(0, 0, 0, 0.5)',
              left: 10,
            }}
          />
        )}
      </View>
      <View style={styles.mainBox}>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={{ fontSize: 16 }}>
          시간 : {new Date(data.start_time).getHours()}:
          {data.start_time.split('T')[1].split(':')[1]} ~{' '}
          {new Date(data.end_time).getHours()}:
          {data.end_time.split('T')[1].split(':')[1]}
        </Text>
        <Text style={{ fontSize: 16 }}>장소 : {data.place}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onpress2}>
          <Icon2 name={'navigate-next'} style={styles.nextIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  leftBox: {
    width: '12%',
    justifyContent: 'center',
  },
  setIcon: {
    fontSize: 26,
    textAlign: 'center',
    color: '#878787',
  },
  mainBox: {
    height: '100%',
    width: '76%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  titleText: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  right: {
    width: '12%',
    justifyContent: 'center',
  },
  nextIcon: {
    fontSize: 45,
    textAlign: 'center',
    color: '#BBBBBB',
  },
});

export default EventItem;
