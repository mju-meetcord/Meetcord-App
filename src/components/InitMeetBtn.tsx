import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InitMeetBtn = () => {
  return (
    <View style={styles.btnWrapper}>
      <Text style={styles.meetCreateText}>새로운 Meet을 만들고 싶은가요?</Text>
      <TouchableOpacity style={styles.meetCreateButton}>
        <Text style={styles.btnTxt}>Meet 생성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    marginTop: 42,
    alignItems: 'center',
  },
  meetCreateText: {
    fontWeight: '500',
    color: '#676767',
    fontSize: 12,
    lineHeight: 24,
    marginBottom: 5,
  },
  meetCreateButton: {
    width: 111,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#5496FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontWeight: '700',
    fontSize: 18,
    color: '#ffffff',
  },
});

export default InitMeetBtn;
