import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
const EventItem = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 100,
        flexDirection: 'row',
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: '12%',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity>
          <Icon
            name={'settings-outline'}
            style={{
              fontSize: 26,
              textAlign: 'center',
              color: '#878787',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: '100%',
          width: '76%',
          justifyContent: 'center',
          paddingLeft: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          컴퓨터 아키텍처 중간고사
        </Text>
        <Text style={{ fontSize: 16 }}>시간 : 15:00 ~ 16:00</Text>
        <Text style={{ fontSize: 16 }}>장소 : 5공학관 Y5407 강의실</Text>
      </View>
      <View
        style={{
          width: '12%',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity>
          <Icon2
            name={'navigate-next'}
            style={{
              fontSize: 45,
              textAlign: 'center',
              color: '#BBBBBB',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EventItem;
