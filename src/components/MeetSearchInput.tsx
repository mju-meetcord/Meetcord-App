import { View, TextInput, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/search_icon.svg';

const MeetSearchInput = () => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.wrapper}>
        <SearchIcon style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder='Meet 검색하기...' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
  },
  wrapper: {
    width: 325,
    height: 40,
    marginTop: 54,
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
