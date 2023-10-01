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

// import { useMixedListContext } from '../../Context/MixedListContext';
import AddListScreenCopy from '../AddListScreenCopy';

const FinalListScreen = ({ route }) => {
  return (
    <AddListScreenCopy route={route}/>
  );
};


const windowWidth = Dimensions.get('window').width;
const maxWidth = windowWidth - 80; // Subtract 40 from each side

const styles = StyleSheet.create({
});
export default FinalListScreen;
