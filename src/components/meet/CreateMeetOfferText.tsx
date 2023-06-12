import { Text, StyleSheet } from 'react-native';

const CreateMeetOfferText = () => {
  return <Text style={styles.adviceText}>새로운 Meet을 만들고 싶은가요?</Text>;
};

const styles = StyleSheet.create({
  adviceText: {
    fontWeight: '400',
    color: '#676767',
    fontSize: 13,
    lineHeight: 15,
    marginRight: 5,
  },
});

export default CreateMeetOfferText;
