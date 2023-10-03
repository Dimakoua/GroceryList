import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { useLists } from '../services/useLists';
import BackButton from '../components/BackBtn';
import TrashBtn from '../components/TrashBtn';
import ResetBtn from '../components/ResetBtn';
import PinBtn from '../components/PinBtn';
import { shallowEqual, useSelector } from 'react-redux';
import ListRow from '../components/ListRow';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MIXED } from '../services/types';
import useDebounced from '../services/useDebounced';

const AddListScreen = ({ route }) => {
  const { upsertList, getListById, deleteListById } = useLists();
  const globalType = useSelector(state => state.filters.type);

  const navigation = useNavigation();

  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(globalType);
  const [isPinned, setIsPinned] = useState(false);
  const [meals, setMeals] = useState([]);
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const textInputsRefs = useRef([]);
  const params = route?.params?.item;
  const newId = route?.params?.id;

  const list = getListById(id);

  const debouncedName = useDebounced(name, 500);
  const debouncedMeals = useDebounced(meals, 500);
  const debouncedCheckedItems = useDebounced(checkedItems, 500);
  const debouncedItems = useDebounced(items, 500);

  const EMPTY_ITEM = {
    id: new Date().getTime().toString(),
    mealItem: false,
    text: '',
    pinned: false,
    quantity: 1,
  };

  const setFromRouteParams = () => {
    setId(newId);

    if (params) {
      setName(params.name);
      setItems(params.items);
      setType(params.type);
      setMeals(params.meals);
      setIsPinned(params.pinned);
      setCheckedItems(params.checkedItems);
    }

    calculateCombinedList(params);
  }

  const calculateCombinedList = (list) => {
    if (type === MIXED && list) {
      const mealItems = [];

      list.meals.forEach(meal => {
        meal.items.forEach(item => {
          const index = mealItems.findIndex(x => x.id === item.id);
          if (index === -1) {
            mealItems.push({ ...item, quantity: meal.quantity, mealItem: true })
          } else {
            mealItems[index] = { ...item, quantity: item.quantity * meal.quantity + 1, mealItem: true };
          }
        });
      });

      const uniqueObjectMap = {};
      const mergedAndUniqueArray = [...mealItems, ...list.items].reduce((result, currentObject) => {
        if (!uniqueObjectMap[currentObject.id]) {
          uniqueObjectMap[currentObject.id] = true;
          result.push(currentObject);
        }
        return result;
      }, []);

      setItems(mergedAndUniqueArray)
    }
  }

  const isEmptyList = () => {
    return name === null && items.length === 0 && meals.length === 0;
  }

  useEffect(() => {
    setFromRouteParams();
  }, []);

  useEffect(() => {
    if (!isEmptyList()) {
      save();
    }
  }, [debouncedName, debouncedItems, isPinned, debouncedMeals, debouncedCheckedItems]);

  useFocusEffect(
    useCallback(() => {
      if (list && !shallowEqual(list.meals, meals)) {
        setMeals(list.meals);
        calculateCombinedList(list);
      }
    }, [list])
  );

  const addNewLine = () => {
    const newLine = { ...EMPTY_ITEM };
    setItems(prevItems => [...prevItems, newLine]);
    setTimeout(() => textInputsRefs.current.pop().focus(), 200);
  };

  const setItemText = (item, text) => {
    const updatedItems = items.map(existingItem =>
      existingItem.id === item.id ? { ...existingItem, text } : existingItem
    );

    setItems(updatedItems);
  };

  const setItemQuantity = (item, quantity) => {
    const updatedItems = items.map(existingItem =>
      existingItem.id === item.id ? { ...existingItem, quantity: parseInt(quantity, 10) || 1 } : existingItem
    );

    setItems(updatedItems);
  };

  const handleEnterPress = (index) => {
    if (index < items.length - 1) {
      textInputsRefs.current[index + 1].focus();
    } else {
      addNewLine();
    }
  };

  const removeItem = (item) => {
    setItems(items.filter(x => x.id !== item.id));
  }

  const toggleItem = (item) => {
    const index = checkedItems.findIndex(x => x === item.id);

    if (index === -1) {
      setCheckedItems([...checkedItems, item.id]);
    } else {
      setCheckedItems(checkedItems.filter(x => x !== item.id));
    }
  };

  const handleReset = () => {
    setCheckedItems([]);
  };

  const handleRemove = () => {
    deleteListById(id);
    navigation.goBack();
  }

  const save = () => {
    const filteredMealItems = items.filter(x => !x.mealItem);

    const newList = {
      id: id,
      name: name,
      type: type,
      items: filteredMealItems,
      meals: meals,
      pinned: isPinned,
      checkedItems: checkedItems
    };

    upsertList(newList);
  }

  const ListEmptyComponent = useMemo(() => (
    <TouchableOpacity onPress={() => addNewLine()}>
      <Text> + Пункт списку </Text>
    </TouchableOpacity>
  ))

  const ListHeaderComponent = useMemo(() => (
    <TextInput
      value={name}
      onChangeText={text => setName(text)}
      onSubmitEditing={addNewLine}
      placeholder="Назва"
      style={[styles.input, styles.title]}
    />
  ))

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton />
        <View style={styles.btnHeaderWrap}>
          <PinBtn isActive={isPinned} onPress={() => setIsPinned(!isPinned)} />
          <ResetBtn onPress={handleReset} />
          <TrashBtn onPress={handleRemove} />
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ index, item }) => (
          <ListRow
            index={index}
            item={item}
            textInputsRefs={textInputsRefs}
            checkedItems={checkedItems}
            setItemText={setItemText}
            handleEnterPress={handleEnterPress}
            setItemQuantity={setItemQuantity}
            removeItem={removeItem}
            toggleItem={toggleItem}
          />
        )}
      />
      {ListEmptyComponent}
    </View>
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

export default AddListScreen;
