import { TouchableOpacity } from 'react-native';
import BackButtonSvg from 'assets/back_btn.svg';

type BackButtonProps = {
  onPress: () => void;
};

const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BackButtonSvg />
    </TouchableOpacity>
  );
};

export default BackButton;
