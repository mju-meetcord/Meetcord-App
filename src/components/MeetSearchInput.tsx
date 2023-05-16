import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import SearchIcon from '../../assets/search_icon.svg';

interface inputStyleProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const MeetSearchInput = ({
  inputText,
  setInputText,
  handleSubmit,
}: inputStyleProps) => {
  const onPressSearchIcon = () => {
    handleSubmit();
    Keyboard.dismiss();
  };
  return (
    <View style={styles.topContainer}>
      <View style={styles.wrapper}>
        <SearchIcon style={styles.searchIcon} onPress={onPressSearchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder='Meet 검색하기...'
          value={inputText}
          onChangeText={text => setInputText(text)}
          returnKeyType='search'
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    marginTop: 21,
  },
  wrapper: {
    width: 340,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
  },
  searchIcon: {
    marginLeft: 16,
    marginRight: 8,
  },
  searchInput: {
    fontSize: 15,
    flex: 1,
  },
});

export default MeetSearchInput;
