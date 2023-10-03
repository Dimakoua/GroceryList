import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useLists } from '../services/useLists';
import { MIXED } from '../services/types';

const MealsScreen = ({ navigation, route }) => {
  const { getMealsList, upsertList, getListById } = useLists();

  const id = route.params.id;
  const mealsFromParams = route.params?.item?.meals ?? [];
  const allMeals = getMealsList();

  const [meals, setMeals] = useState(allMeals);
  const [checked, setChecked] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const newChecked = [];
    mealsFromParams.forEach(meal => {
      const index = allMeals.findIndex(x => x.id === meal.id);

      if (index !== -1) {
        newChecked.push(meal.id);
      }
    });


    const newAllMeals = allMeals.map((existingItem) => {
      const index = mealsFromParams.findIndex(x => x.id === existingItem.id);

      if(index === -1){
        return existingItem;
      } else {
        return { ...existingItem, quantity: mealsFromParams[index].quantity }
      }
    });

    setMeals(newAllMeals);
    setChecked(newChecked);
    setLoading(false);
  }, [])

  useEffect(() => {
    if (isLoading) return;

    const filtered = meals.filter(x => checked.includes(x.id));
    upsertList({ id: id, type: MIXED, meals: filtered });
  }, [meals, checked])

  const toggleItem = (item) => {
    const index = checked.findIndex(x => x === item.id);

    if (index === -1) {
      setChecked([...checked, item.id]);
    } else {
      setChecked(checked.filter(x => x !== item.id));
    }
  };

  const incrementQuantity = (item) => {
    const updatedMeals = meals.map((meal) =>
      meal.id === item.id ? { ...meal, quantity: meal.quantity + 1 } : meal
    );
    setMeals(updatedMeals);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 0) {
      const updatedMeals = meals.map((meal) =>
        meal.id === item.id ? { ...meal, quantity: meal.quantity - 1 } : meal
      );
      setMeals(updatedMeals);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemContainer}>
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, { backgroundColor: checked.includes(item.id) ? 'green' : 'transparent' }]} />
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
