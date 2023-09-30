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
    console.log(item);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemContainer}>
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2, // Додавання тіні (Android)
    shadowColor: '#000', // Додавання тіні (iOS)
    shadowOffset: { width: 0, height: 2 }, // Додавання тіні (iOS)
    shadowOpacity: 0.2, // Додавання тіні (iOS)
    shadowRadius: 2, // Додавання тіні (iOS)
  },
  checkboxContainer: {
    paddingHorizontal: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'green',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityInput: {
    height: 40,
    width: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default MealsScreen;
