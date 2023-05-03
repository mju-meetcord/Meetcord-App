import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MeetList = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.listBox}>
        <Text style={styles.boxTitle}>나의 Meet 리스트</Text>
        <View style={styles.viewTopBox}>
          <ScrollView></ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  listBox: {
    width: 325,
  },
  boxTitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 10,
    marginTop: 35,
  },
  viewTopBox: {
    alignSelf: 'center',
    width: 325,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default MeetList;
