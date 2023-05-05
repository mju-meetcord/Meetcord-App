import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotiItem = ({ title, date, onpress }: any) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <View style={styles.itemBox}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.dateText}>{date}</Text>
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
    left: '5%',
    paddingLeft: 10,
    justifyContent: 'center',
    gap: 10,
  },
  titleText: { fontSize: 20, fontWeight: '500', paddingLeft: '6%' },
  dateText: { color: '#676767', paddingLeft: '6%' },
});

export default NotiItem;
