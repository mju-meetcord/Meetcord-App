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
              resultList.map((item, index) => (
                <MeetListItem meetInfo={item} userJoinInfo={item} key={index} />
              ))
            ) : (
              <View style={styles.emptyListBox}>
                <Text style={styles.emptyListText}>
                  현재 가입된 Meet이 없습니다.{'\n'}
                  Meet이름을 검색하여 원하는 {'\n'}
                  Meet을 찾아보세요 :)
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
    height: 360,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  emptyListBox: {
    height: 360,
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
