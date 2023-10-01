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

import AddListScreenCopy from '../AddListScreenCopy';
import { useLists } from '../../services/useLists';


// useEffect(() => {
//   // Obtain the current route params
//   const { params } = route;

//   // Update the params (mutate it as needed)
//   const updatedParams = {
//     ...params,
//     newParam: 'UpdatedValue',
//   };

//   // Set the updated params back to the route
//   navigation.setParams(updatedParams);

//   // Clean up or perform other actions as needed
//   return () => {
//     // Cleanup code if necessary
//   };
// }, [navigation, route]);



const FinalListScreen = ({ navigation, route }) => {
  const { getListById } = useLists();

  const { params } = route;
  const list = getListById(params.id);

  useFocusEffect(
    useCallback(() => {
      const updatedParams = {
        ...params,
        item: list,
      };

      navigation.setParams(updatedParams);
    }, [list])
  );

  return (
    <AddListScreenCopy route={route} />
  );
};


const windowWidth = Dimensions.get('window').width;
const maxWidth = windowWidth - 80; // Subtract 40 from each side

const styles = StyleSheet.create({
});
export default FinalListScreen;
