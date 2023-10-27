import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import { useLists } from '../services/useLists';
import BackButton from '../components/BackBtn';
import TrashBtn from '../components/TrashBtn';
import ResetBtn from '../components/ResetBtn';
import PinBtn from '../components/PinBtn';
import { shallowEqual } from 'react-redux';
import ListRow from '../components/ListRow';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DISHES, MIXED } from '../services/types';
import useDebounced from '../services/useDebounced';
import { useTranslation } from 'react-i18next';
import useErrors from '../services/useErrors';

const AddListScreen = ({ route }) => {
  const { t } = useTranslation();
  const { upsertList, getListById, deleteListById } = useLists()
  const { newError } = useErrors()
  const navigation = useNavigation();

  const textInputsRefs = useRef([]);
  const titleInputRef = useRef([]);
  const newId = route?.params?.id;
  const paramType = route?.params?.type;
  const params = route?.params?.item ?? null;

  const flatListRef = useRef(null);


  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(paramType);
  const [isPinned, setIsPinned] = useState(false);
  const [meals, setMeals] = useState([]);
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [recipe, setRecipe] = useState('');

  const list = getListById(newId);

  const debouncedName = useDebounced(name, 500);
  const debouncedMeals = useDebounced(meals, 500);
  const debouncedCheckedItems = useDebounced(checkedItems, 500);
  const debouncedItems = useDebounced(items, 500);
  const debouncedRecipe = useDebounced(recipe, 500);

  const EMPTY_ITEM = {
    id: new Date().getTime().toString(),
    mealItem: false,
    text: '',
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
      setRecipe(params.recipe);
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
          // If the object with this 'id' is not already in the result array, add it
          uniqueObjectMap[currentObject.id] = true;
          result.push(currentObject);
        }
        return result;
      }, []);

      setItems(mergedAndUniqueArray)
    }
  }

  const isEmptyList = () => {
    if (name === null && items.length === 0 && meals.length === 0 && recipe === '') {
      return true;
    }
    return false;
  }

  useEffect(() => {
    // set up from router
    setFromRouteParams();

    if (params === null) {
      setTimeout(() => { titleInputRef.current.focus() }, 100);
    }
  }, []);

  useEffect(() => {
    //save the list after each change.
    if (!isEmptyList()) {
      save();
    }
  }, [debouncedName, debouncedItems, isPinned, debouncedMeals, debouncedCheckedItems, debouncedRecipe]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    };
  }, [id, debouncedName, debouncedItems, debouncedMeals]);

  const handleBackButton = () => {
    if (isEmptyList()) {
      deleteListById(id);
      newError(t('empty_list_is_removed'));
    }
    return false;
  };

  useFocusEffect(
    useCallback(() => {
      if (list) {
        if (!shallowEqual(list.meals, meals)) {
          setMeals(list.meals);
          calculateCombinedList(list);
        }
        if (!shallowEqual(list.checkedItems, checkedItems)) {
          setCheckedItems(list.checkedItems);
        }
      }
    }, [list])
  );

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ index });
  };

  const addNewLine = () => {
    const newLine = { ...EMPTY_ITEM };
    setItems((prevItems) => {
      return [newLine, ...prevItems];
    });

    setTimeout(() => {
      if (textInputsRefs.current[0]) {
        textInputsRefs.current[0].focus();
        scrollToIndex(0);
      }
    }, 200);
  };

  const setItemText = (item, text) => {
    const updatedItems = items.map((existingItem) =>
      existingItem.id === item.id ? { ...existingItem, text } : existingItem
    );

    setItems(updatedItems);
  };

  const setItemQuantity = (item, quantity) => {
    const updatedItems = items.map((existingItem) =>
      existingItem.id === item.id ? { ...existingItem, quantity: parseInt(quantity, 10) || 1 } : existingItem
    );

    setItems(updatedItems);
  };

  const removeItem = (item) => {
    setItems(items.filter((x) => x.id !== item.id));
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
    if (checkedItems.length === 0) {
      newError(t('no_one_element_is_checked'));
    }
    setCheckedItems([]);
  };

  const handleRemove = () => {
    deleteListById(id);
    newError(t('list_is_removed'));
    navigation.goBack();
  }

  const handlePin = () => {
    if (!isPinned) {
      newError(t('is_pinned'));
    } else {
      newError(t('is_unpinned'));
    }
    setIsPinned(!isPinned)
  }

  const save = () => {
    const filteredMealItems = items.filter(x => !x.mealItem);

    const newList = {
      id: id,
      name: name,
      type: type,
      items: filteredMealItems,
      meals: meals,
      recipe: recipe,
      pinned: isPinned,
      checkedItems: checkedItems
    };

    upsertList(newList);
  }

  const ListEmptyComponent = useMemo(() => (
    <TouchableOpacity
      onPress={() => addNewLine()}
      style={styles.addButton} // Add this style
    >
      <Text style={styles.addButtonLabel}>{t('add_new_line')}</Text>
    </TouchableOpacity>
  ))

  const ListHeaderComponent = useMemo(() => (
    <TextInput
      ref={titleInputRef}
      value={name}
      onChangeText={(text) => setName(text)}
      onSubmitEditing={() => addNewLine()}
      placeholder={t('title')}
      style={[styles.input, styles.title]}
    />
  ))

  const RecipeTextArea = () => {
    if (type === DISHES) {
      return <TextInput
        style={styles.textArea}
        value={recipe}
        multiline={true}
        numberOfLines={4}
        placeholder={t('receipe_placeholder')}
        onChangeText={(text) => setRecipe(text)}
      />
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton onPress={handleBackButton} />
        <View style={styles.btnHeaderWrap}>
          <PinBtn isActive={isPinned} onPress={handlePin} />
          <ResetBtn onPress={handleReset} />
          <TrashBtn onPress={handleRemove} />
        </View>
      </View>

      <FlatList
        data={items}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={RecipeTextArea()}
        renderItem={({ index, item }) => (
          <ListRow
            index={index}
            item={item}
            textInputsRefs={textInputsRefs}
            checkedItems={checkedItems}
            setItemText={setItemText}
            handleEnterPress={addNewLine}
            setItemQuantity={setItemQuantity}
            removeItem={removeItem}
            toggleItem={toggleItem}
          />
        )}
      />

      {ListEmptyComponent}

      {items.length && checkedItems.length < items.length ? (
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('playScreen', { items, checkedItems, listId: id })}
        >
          <Text style={styles.playButtonText}>
            <Image source={require('./../../assets/icons8-play-48.png')} />
          </Text>
        </TouchableOpacity>
      ) : null}

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
    width: '100%',
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
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  playButton: {
    backgroundColor: '#98E0E4',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
    marginBottom: 50,
    marginRight: 16,
    position: 'absolute',
    bottom: 16,
    right: 16
  },
  playButtonText: {
    color: '#fff',
    fontSize: 64,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
  },
});

export default AddListScreen;