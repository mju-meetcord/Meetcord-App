import { TextInput, StyleSheet } from 'react-native';

interface SignInInputProps {
  text: string;
}

const SignInInput = ({ text }: SignInInputProps) => {
  return <TextInput style={styles.inputBox} placeholder={text} />;
};

const styles = StyleSheet.create({
  inputBox: {
    width: 325,
    height: 50,
    borderRadius: 10,
    backgroundColor: ' rgba(255, 255, 255, 0.8)',
    paddingVertical: 17,
    paddingLeft: 20,
    marginBottom: 10,
    color: '#C6C6C6',
  },
});

export default SignInInput;
