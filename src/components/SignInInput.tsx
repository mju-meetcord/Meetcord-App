import { TextInput, StyleSheet, View } from 'react-native';
import InputIcon1 from 'assets/signin_icon1.svg';
import InputIcon2 from 'assets/signin_icon2.svg';
interface SignInInputProps {
  text: string;
  secureTextEntry: boolean;
  setText: any;
  keyboardType: any;
  inputValue: string;
  isEmail: boolean;
}

const SignInInput = ({
  text,
  secureTextEntry,
  setText,
  keyboardType,
  isEmail,
  inputValue,
}: SignInInputProps) => {
  return (
    <View style={styles.wrapper}>
      {isEmail ? (
        <InputIcon1 style={styles.inputIcon} />
      ) : (
        <InputIcon2 style={styles.inputIcon} />
      )}
      <TextInput
        style={styles.inputBox}
        placeholder={text}
        placeholderTextColor={'#C6C6C6'}
        secureTextEntry={secureTextEntry}
        value={inputValue}
        onChangeText={text => setText(text)}
        keyboardType={keyboardType}
        autoCapitalize='none'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 50,
    borderRadius: 10,
    backgroundColor: ' rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
  },
  inputIcon: {
    marginLeft: 20,
    marginRight: 10,
  },
  inputBox: {
    flex: 1,
    color: '#000000',
  },
});

export default SignInInput;
