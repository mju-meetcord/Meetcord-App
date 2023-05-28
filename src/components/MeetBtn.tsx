import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

type MeetBtnProps = {
  onPress: () => void;
};

const MeetBtn = ({ onPress }: MeetBtnProps) => {
  return (
    <TouchableOpacity style={styles.createMeetBtn} onPress={onPress}>
      <Icon name='plus' size={15} color='#5496FF' />
      <View style={styles.ViewCreateMeetBtn}>
        <Text style={styles.btnTxt}>Meet 생성</Text>
      </View>
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

  ViewCreateMeetBtn: {
    ...Platform.select({
      android: {
        paddingBottom: 5,
      },
    }),
  },
});

export default MeetBtn;
