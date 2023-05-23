import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MemberItemProps } from '../types';

const MeberItem = ({ data, onpress }: MemberItemProps) => {
  return (
    <TouchableOpacity onPress={onpress}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    left: '5%',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  textBox: {
    height: 100,
    justifyContent: 'center',
    gap: 10,
    flex: 0.7,
  },
  titleText: { fontSize: 20, fontWeight: '500', paddingLeft: '6%' },
  roleText: { color: '#676767', paddingLeft: '6%' },
});

export default MeberItem;
