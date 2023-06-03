import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotiItem = ({ title, date, onpress }: any) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <View style={styles.itemBox}>
        <View style={styles.textBox}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.dateText}>
            {new Date(date).getFullYear() +
              '년 ' +
              (new Date(date).getMonth() + 1) +
              '월 ' +
              new Date(date).getDate() +
              '일 ' +
              new Date(date).getHours() +
              '시 ' +
              new Date(date).getMinutes() +
              '분 '}
          </Text>
        </View>
        <View style={styles.iconBox}>
          <Icon name={'navigate-next'} size={45} style={{ color: '#878787' }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    width: '90%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#676767',
    left: '10%',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  textBox: {
    width: '90%',
    justifyContent: 'center',
    gap: 10,
  },
  titleText: { fontSize: 20, fontWeight: '500', paddingLeft: '6%' },
  dateText: { color: '#676767', paddingLeft: '6%' },
  iconBox: {
    width: '10%',
    justifyContent: 'center',
  },
});

export default NotiItem;
