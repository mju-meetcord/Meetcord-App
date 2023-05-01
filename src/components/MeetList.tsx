import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MeetList = () => {
  return (
    <>
      <Text style={styles.boxTitle}>나의 Meet 리스트</Text>
      <View style={styles.viewTopBox}>
        <ScrollView></ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  boxTitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 35,
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
