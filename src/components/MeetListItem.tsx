import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface ListItemProps {
  src: ImageSourcePropType;
  meetName: string;
  intro: string;
}

const MeetListItem = ({ src, meetName, intro }: ListItemProps) => {
  return (
    <View style={styles.wrapper}>
      <Image source={src} style={styles.meetImg} />
      <View style={styles.meetInfoBox}>
        <Text style={styles.meetName}>{meetName}</Text>
        <Text style={styles.meetIntro}>{intro}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 10,
    width: 340,
    height: 60,
  },
  meetImg: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  meetInfoBox: {
    justifyContent: 'space-between',
  },
  meetName: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    width: 260,
  },
  meetIntro: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 24,
    width: 260,
  },
});

export default MeetListItem;
