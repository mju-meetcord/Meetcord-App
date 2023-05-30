import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { EventItemProps } from '../types';

const EventItem = ({ data, onpress, isAdmin }: EventItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        {isAdmin && (
          <TouchableOpacity>
            <Icon name={'settings-outline'} style={styles.setIcon} />
          </TouchableOpacity>
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
        <TouchableOpacity onPress={() => onpress()}>
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
