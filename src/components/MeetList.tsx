import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MeetListItem from './MeetListItem';
import { Meet } from '../screens/MeetScreen';

interface MeetListProps {
  hasMeet: boolean;
  resultList: Meet[];
}

const MeetList = ({ hasMeet, resultList }: MeetListProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.listBox}>
        <Text style={styles.boxTitle}>나의 Meet 리스트</Text>
        <View style={styles.viewTopBox}>
          <ScrollView keyboardDismissMode='on-drag'>
            {hasMeet ? (
              resultList.map(item => (
                <MeetListItem
                  src={item.meetImg}
                  meetName={item.meetName}
                  intro={item.meetIntroduce}
                  key={item.id}
                />
              ))
            ) : (
              <View style={styles.emptyListBox}>
                <Text style={styles.emptyListText}>
                  현재 가입된 Meet이 없습니다.{'\n'}
                  Meet이름 또는 초대받은 코드로 {'\n'}
                  Meet을 검색해보세요!
                </Text>
              </View>
            )}
          </ScrollView>
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
    width: 340,
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
    width: 340,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  emptyListBox: {
    height: 300,
    backgroundColor: 'none',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#5496FF',
    lineHeight: 25,
    textAlign: 'center',
  },
});

export default MeetList;
