import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BackBtn from '../../assets/back_btn.svg';

const CreateNotiScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
      edges={['bottom']}
    >
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={[styles.statusBarPlaceholder, { height: top }]}></View>
        <View style={styles.topContainer}>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.backBtn}>
                <BackBtn />
              </TouchableOpacity>
              <Text style={styles.NotiDetail}>공지 추가</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.addBtn}>추가</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='제목을 입력해주세요.'
            style={styles.titleInput}
            placeholderTextColor={'#878787'}
          />
          <Text style={styles.date}>{new Date().toISOString()}</Text>
          <View style={styles.border} />
        </View>
        <ScrollView>
          <TextInput
            placeholder='제목을 입력해주세요.'
            style={styles.messageInput}
            placeholderTextColor={'#676767'}
            multiline={true}
          />
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#E9F1FF',
  },

  statusBarPlaceholder: {
    backgroundColor: '#E9F1FF',
  },
  addBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5496FF',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
    marginHorizontal: 6,
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  titleInput: {
    height: 36,
    marginTop: 45,
    marginBottom: 10,
    marginLeft: 25,
    width: '80%',
    fontWeight: 'bold',
    fontSize: 20,
  },

  backBtn: {},

  NotiDetail: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  date: {
    fontSize: 16,
    color: '#676767',
    marginLeft: 25,
    marginBottom: 14,
  },

  messageInput: {
    fontSize: 16,
    width: '85%',
    marginTop: 14,
    marginHorizontal: 25,
  },
});

export default CreateNotiScreen;
