import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';
import { useLists } from '../services/useLists';
import { DISHES, MIXED, SHOPPING_ITEMS } from '../services/types';
import { useTranslation } from 'react-i18next';

const MealsScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { getMealsList, upsertList, getShoppingLists } = useLists();

  const id = route.params.id;
  const mealsFromParams = route.params?.item?.meals ?? [];
  const allMeals = getMealsList();
  const allShopingLists = getShoppingLists();

  const composedList = [...allMeals, ...allShopingLists];
  const [meals, setMeals] = useState(composedList);
  const [checked, setChecked] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const newChecked = [];
    mealsFromParams.forEach(meal => {
      const index = composedList.findIndex(x => x.id === meal.id);

      if (index !== -1) {
        newChecked.push(meal.id);
      }
    });


    const newAllMeals = composedList.map((existingItem) => {
      const index = mealsFromParams.findIndex(x => x.id === existingItem.id);

      if (index === -1) {
        return existingItem;
      } else {
        return { ...existingItem, quantity: mealsFromParams[index].quantity }
      }
    });

    setMeals(newAllMeals);
    setChecked(newChecked);
    setLoading(false);
  }, [composedList.length])

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

  const handleAddListPress = (type) => {
    const id = new Date().getTime().toString();
    navigation.navigate('addList', { id, type });
  }

  const ListEmptyComponent = (
    <View style={styles.emptyListContainer}>
      <Image source={require('./../../assets/icons8-todo-list-100.png')} />
      <TouchableOpacity style={[styles.addNewButtonContainer, { marginBottom: 10 }]} onPress={() => { handleAddListPress(SHOPPING_ITEMS) }}>
        <Text>{t('add_new_shopping_list')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addNewButtonContainer} onPress={() => { handleAddListPress(DISHES) }}>
        <Text>{t('add_new_meal')}</Text>
      </TouchableOpacity>

    </View>
  )

  const FlatListComponent = (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  )

  return (
    <View style={styles.container}>
      {meals.length ? FlatListComponent : ListEmptyComponent}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EBEFF3',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
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
    maxWidth: '60%'
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
    marginRight: 10,
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
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addNewButtonContainer: {
    padding: 10,
    backgroundColor: 'rgba(182,180,181,0.2)',
    borderRadius: 10
  }
});

export default MealsScreen;
