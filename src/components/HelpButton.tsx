import { TouchableOpacity, StyleSheet } from 'react-native';
import HelpIcon from 'assets/icon_help.svg';

type HelpButtonProps = {
  handlePress: () => void;
};

const HelpButton = ({ handlePress }: HelpButtonProps) => {
  return (
    <TouchableOpacity style={styles.helpButton} onPress={handlePress}>
      <HelpIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  helpButton: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
});

export default HelpButton;
