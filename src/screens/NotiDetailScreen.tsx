import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageButton from '../components/ImageButton';

const NotiDetailScreen = ({ route, navigation }: any) => {
  const backBtnHandle = () => {
    navigation.navigate('Notification');
  };

  const dummyData = {
    title: 'test123',
    date: '2023. 06. 05 (화) 10:00',
    message:
      '05월 07일의 운세 총운은 “어이상실” 입니다. 꼭 운이 많이 따르고 적게 따르고를 논하기 보다는 여러 가지로 바쁜 하루가 될 것으로 보이는군요. 몸과 마음이 부산하고 정신이 없는 날입니다. 무엇을 했는지도 모르게 하루가 지나가 버릴 확률이 많이 있습니다. 일이 많고 생각보다 성과는 적어 지치는 마음이 들 수도 있습니다. 하지만 결과가 그리 나쁜 것은 아니고 평소하던만큼의 성과는 거둘 수 있으니 편하게 생각하고 천천히 하나씩 해결해 나가다 보면 어느새 하루 해가 지고 있는 모습을 보게 될 것입니다.',
    // 테스트용 text
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#E9F1FF',
      }}
      edges={['right', 'left', 'top']}
    >
      <ScrollView>
        <View style={styles.Container}>
          <View style={styles.backBtn}>
            <ImageButton
              onPress={backBtnHandle}
              source={require('../../assets/backBtn.png')}
              color='#E9F1FF'
            ></ImageButton>
            <Text style={styles.title}>공지사항</Text>
          </View>
          <Text style={styles.notiTittle}>{route.params.title}</Text>
          <Text style={styles.notiDate}>{dummyData.date}</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.notiMessage}>{dummyData.message}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#E9F1FF',
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
  },

  backBtn: {
    justifyContent: 'flex-start',
    marginTop: 25,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 45,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  notiTittle: {
    fontSize: 20,

    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 25,
  },

  notiDate: {
    fontSize: 16,
    color: '#676767',
    marginLeft: 25,
    marginBottom: 14,
  },

  message: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  notiMessage: {
    fontSize: 16,
    width: '85%',
    marginTop: 14,
    marginHorizontal: 25,
  },
});

export default NotiDetailScreen;
