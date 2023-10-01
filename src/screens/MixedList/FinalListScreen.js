import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

import { useMixedListContext } from '../../Context/MixedListContext';
import AddListScreenCopy from '../AddListScreenCopy';
import { useSelector } from 'react-redux';

const FinalListScreen = ({ navigation, route }) => {
  const activeList = useSelector(state => state.activeList);

  useEffect(() => {
    console.log("FinalListScreen", activeList);
    
    // console.log(state.id)
  }, [])

  return (
    <AddListScreenCopy listId={'id'}/>
  );
};


const windowWidth = Dimensions.get('window').width;
const maxWidth = windowWidth - 80; // Subtract 40 from each side

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '50%',
    maxWidth: maxWidth,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  btnHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
});
export default FinalListScreen;
