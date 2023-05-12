import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const MeetBtn = () => {
  return (
    <TouchableOpacity style={styles.createMeetBtn}>
      <Icon name='plus' size={15} color={'#5496FF'} />
      <Text style={styles.btnTxt}>Meet 생성</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createMeetBtn: {
    backgroundColor: '#ffffff',
    width: 112,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5496ff',
    flexDirection: 'row',
  },
  btnTxt: {
    color: '#5496FF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MeetBtn;
