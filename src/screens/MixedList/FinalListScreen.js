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
import AddListScreen from '../AddListScreen';
import { MIXED } from '../../services/types';
import { useDispatch, useSelector } from 'react-redux';
import { useLists } from '../../services/useLists';
import { useMixedListContext } from '../../Context/MixedListContext';

const FinalListScreen = ({ navigation, route }) => {
  const [items, setItems] = useState();
  const { state, dispatch } = useMixedListContext();
  const { getListById } = useLists();


  useEffect(() => {
    console.log('FinalListScreen', state)

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      dispatch({ type: 'CLEAN'});
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if(state.meals.length === 0){
        setItems([]);
        return;
      }

      const list = [];
      state.meals.forEach(element => {
        const meal = getListById(element.id);
        list.push(...meal.items)

        setItems(list);
      });
    }, [state.meals])
  );

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text>{item.text}</Text>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({

});

export default FinalListScreen;
