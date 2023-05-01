import { View, TextInput, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/search_icon.svg';

const MeetSearchInput = () => {
  return (
    <View style={styles.wrapper}>
      <SearchIcon style={styles.searchIcon} />
      <TextInput style={styles.searchInput} placeholder='Meet 검색하기...' />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    marginRight: -41,
    zIndex: 1,
  },
  searchInput: {
    width: 325,
    height: 40,
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
  },
});

export default MeetSearchInput;
