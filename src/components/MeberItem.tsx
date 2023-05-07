import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MeberItem = ({ name, role, onpress }: any) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <View style={styles.itemBox}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBox}></View>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.roleText}>{role}</Text>
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
    left: '5%',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
  },
  textBox: {
    height: 100,
    justifyContent: 'center',
    gap: 10,
    flex: 0.7,
  },
  titleText: { fontSize: 20, fontWeight: '500', paddingLeft: '6%' },
  roleText: { color: '#676767', paddingLeft: '6%' },
});

export default MeberItem;
