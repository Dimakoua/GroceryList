import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { useLists } from '../../services/useLists';

const MealsScreen = ({ navigation, route }) => {
  const { getMealsList } = useLists();
  const meals = getMealsList();

  const toggleItem = (item) => {
    console.log(item)
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleItem(item)}>
      <View>
        <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
        <Text>{item.name}</Text>
        <TextInput
          value={`${item.quantity}`}
          // onChangeText={(quantity) => setItemQuantity(item, quantity)}
          keyboardType="numeric"
          style={styles.quantityInput}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'green',
    marginRight: 8,
  },
  quantityInput: {
    height: 40,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: 40,
    textAlign: 'center',
  },
});

export default MealsScreen;
