import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotiItem = ({ title, date, onpress }: any) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <View style={styles.itemBox}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
          }}
        >
          {title}
        </Text>
        <Text style={{ color: '#676767' }}> {date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    width: '90%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderColor: '#676767',
    left: '5%',
    paddingLeft: 20,
    justifyContent: 'center',
    gap: 10,
  },
});

export default NotiItem;
