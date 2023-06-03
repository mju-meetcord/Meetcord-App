import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AttendanceItemProps } from '../types';
import { Image } from 'expo-image';
import { CheckBox } from '@rneui/themed';
import { useEffect, useState } from 'react';

const AttendanceItem = ({
  data,
  checked,
  isAdmin,
  event_id,
  checking,
}: AttendanceItemProps) => {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(checked);
  }, []);

  const checkAttendanceTrue = () => {
    fetch('http://121.124.131.142:4000/meetEvent', {
      method: 'patch',
      body: JSON.stringify({
        event_id: event_id,
        member_id: data.mem_id,
        option: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        checking();
      })
      .catch(error => console.error(error));
  };
  const checkAttendanceFalse = () => {
    fetch('http://121.124.131.142:4000/meetEvent', {
      method: 'patch',
      body: JSON.stringify({
        event_id: event_id,
        member_id: data.mem_id,
        option: 2,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        checking();
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.itemBox}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBox}>
            <Image
              source={{
                uri: 'http://121.124.131.142:4000/images/user/' + data.profile,
              }}
              style={styles.img}
            />
          </View>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.titleText}>
            {data.name}
            {data.nickname != ' ' ? ' - ' + data.nickname : ''}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <CheckBox
          disabled={!isAdmin}
          center
          checked={check}
          onPress={() => {
            if (check) {
              //setCheck(false);
              checkAttendanceFalse();
            } else {
              //setCheck(true);
              checkAttendanceTrue();
            }
          }}
          containerStyle={{
            backgroundColor: '(0, 0, 0, 0.5)',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    width: '85%',
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingLeft: 0,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  textBox: {
    height: 80,
    justifyContent: 'center',
    gap: 5,
    flex: 0.7,
  },
  titleText: { fontSize: 20, fontWeight: '500', paddingLeft: '6%' },
  roleText: { color: '#676767', paddingLeft: '6%' },
});

export default AttendanceItem;
