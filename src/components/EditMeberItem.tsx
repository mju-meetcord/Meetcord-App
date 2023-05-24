import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EditMemberItemProps } from '../types';
import { Image } from 'expo-image';

const EditMeberItem = ({ data, option, setReload }: EditMemberItemProps) => {
  const submintAdmission = () => {
    fetch(`http://121.124.131.142:4000/member`, {
      method: 'post',
      body: JSON.stringify({
        mem_id: data.mem_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        setReload(data.mem_id.toString());
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.itemBox}>
      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <Image
            source={{
              uri: 'http://121.124.131.142:4000/images/user/' + data.profile,
            }}
            style={styles.img}
          />
        </View>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.titleText}>
          {data.name}
          {data.nickname != ' ' ? ' - ' + data.nickname : ''}
        </Text>
        <Text style={styles.roleText}>{data.role}</Text>
      </View>
      <View style={styles.btnBox}>
        <TouchableOpacity
          disabled={!option}
          onPress={() => submintAdmission()}
          style={styles.btnTouch}
        >
          <Text
            style={
              option
                ? { fontSize: 16, color: '#5496FF' }
                : { fontSize: 16, color: '#FFFFFF' }
            }
          >
            승인
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouch}>
          <Text style={{ fontSize: 16, color: '#FA1F11' }}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
    left: '5%',
    paddingLeft: 0,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  textBox: {
    height: 80,
    justifyContent: 'center',
    gap: 5,
    width: '50%',
  },
  titleText: { fontSize: 20, fontWeight: '500', paddingLeft: '6%' },
  roleText: { color: '#676767', paddingLeft: '6%' },
  btnBox: {
    height: 80,
    justifyContent: 'space-between',
    gap: 5,
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTouch: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditMeberItem;
