import { View, Text, StyleSheet } from 'react-native';

const MeetLogo = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.mainTitle}>Meetcord</Text>
      <Text style={styles.subTitle}>만남을 기록하다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 31,
    marginBottom: 44,
  },
  mainTitle: {
    color: '#5496FF',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
  },
  subTitle: {
    color: '#5496FF',
    fontSize: 12,
    lineHeight: 15,
  },
});

export default MeetLogo;
