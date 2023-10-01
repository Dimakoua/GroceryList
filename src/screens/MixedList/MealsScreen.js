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
import { MIXED } from '../../services/types';

const MealsScreen = ({ navigation, route }) => {
  const { getMealsList, upsertList, getListById } = useLists();

  const id = route.params.id;
  const allMeals = getMealsList();

  const [meals, setMeals] = useState(allMeals);

  useEffect(() => {
    const list = getListById(id);
    if (list && list.meals) {
      const updatedMealList = allMeals.map(existingItem => {
        const foundObject = list.meals.findIndex(item =>
          item.id === existingItem.id
        );

        if (foundObject !== -1) {
          return { ...existingItem, checked: true }
        }

        return existingItem;
      });

      setMeals(updatedMealList);
    }
  }, [])

  useEffect(() => {
    const filtered = meals.filter(x => x.checked);

    if (filtered.length) {
      upsertList({ id: id, type: MIXED, meals: filtered });
    } else {
      upsertList({ id: id, type: MIXED, meals: [] });
    }
  }, [meals])

  const toggleItem = (item) => {
    const updatedMeals = meals.map((existingItem) =>
      existingItem.id === item.id
        ? { ...existingItem, checked: !existingItem.checked }
        : existingItem
    );

    setMeals(updatedMeals);
  };
  const incrementQuantity = (item) => {
    const updatedMeals = meals.map((meal) =>
      meal.id === item.id ? { ...meal, quantity: (meal.quantity ?? 1) + 1 } : meal
    );
    setMeals(updatedMeals);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 0) {
      const updatedMeals = meals.map((meal) =>
        meal.id === item.id ? { ...meal, quantity: (meal.quantity ?? 1) - 1 } : meal
      );
      setMeals(updatedMeals);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemContainer}>
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decrementQuantity(item)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            value={`${item.quantity ?? 1}`}
            keyboardType="numeric"
            style={styles.quantityInput}
          />
          <TouchableOpacity onPress={() => incrementQuantity(item)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
    marginLeft: 10,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
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
