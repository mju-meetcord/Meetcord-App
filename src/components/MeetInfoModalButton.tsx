import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type MeetModalButtonProps = {
  firstText: string;
  secondText: string;
};

const MeetInfoModalButton = ({
  firstText,
  secondText,
}: MeetModalButtonProps) => {
  return (
    <View style={styles.bottomButtonBox}>
      <View style={styles.hasJoinedButton}>
        <Text style={styles.hasJoinedButtonText}>{firstText}</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>{secondText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 56,
  },
  hasJoinedButton: {
    backgroundColor: '#ffffff',
    borderColor: '#5496FF',
    borderWidth: 2,
    width: 280,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hasJoinedButtonText: {
    color: '#5496FF',
    fontWeight: '700',
    fontSize: 24,
    letterSpacing: 2,
  },
  cancelButton: {
    width: 70,
    height: 40,
    borderColor: '#676767',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#676767',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
});

export default MeetInfoModalButton;
