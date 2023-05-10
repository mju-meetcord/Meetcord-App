import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/search_icon.svg';
import { TempMeetList } from '../data/TempMeetList';
import { Meet } from '../screens/MeetSearchScreen';

interface inputStyleProps {
  isMarginTop: boolean;
  setResultList: React.Dispatch<React.SetStateAction<Meet[]>>;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const MeetSearchInput = ({
  isMarginTop,
  setResultList,
  setIsSearch,
}: inputStyleProps) => {
  const [inputText, setInpuText] = useState('');

  const handleSubmit = () => {
    if (!inputText) {
      setResultList([]);
      setIsSearch(false);
      return;
    }
    const temp = TempMeetList.filter(item => item.meetName.includes(inputText));
    setResultList(temp);
    setIsSearch(true);
  };

  return (
    <View style={styles(isMarginTop).topContainer}>
      <View style={styles(isMarginTop).wrapper}>
        <SearchIcon style={styles(isMarginTop).searchIcon} />
        <TextInput
          style={styles(isMarginTop).searchInput}
          placeholder='Meet 검색하기...'
          onChangeText={text => setInpuText(text)}
          returnKeyType='search'
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = (isMarginTop: boolean) =>
  StyleSheet.create({
    topContainer: {
      alignItems: 'center',
    },
    wrapper: {
      width: 325,
      height: 40,
      marginTop: isMarginTop ? 54 : 16,
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
