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
import BackButton from '../../components/BackBtn';
import PinBtn from '../../components/PinBtn';
import ResetBtn from '../../components/ResetBtn';
import TrashBtn from '../../components/TrashBtn';
import ListRow from '../../components/ListRow';

const FinalListScreen = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState(null);
  const [isPinned, setIsPinned] = useState(false);

  const { upsertList, deleteListById } = useLists()

  const { state, dispatch } = useMixedListContext();
  const { getListById } = useLists();

  const textInputsRefs = useRef([]);

  const EMPTY_ITEM = {
    id: new Date().getTime().toString(),
    checked: false,
    text: '',
    pinned: false,
    quantity: 1,
  };

  useEffect(() => {
    console.log('FinalListScreen', state)

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      console.log('beforeRemove')
      dispatch({ type: 'CLEAN' });
    });

    return unsubscribe;
  }, [navigation, items]);

  useFocusEffect(
    useCallback(() => {
      if (state.meals.length === 0) {
        setItems([]);
        return;
      }

      const list = [];
      state.meals.forEach(element => {
        const meal = getListById(element.id);
        // quantity: meal.quantity
        list.push(...meal.items)

        setItems(list);
      });
    }, [state.meals])
  );

  const handleReset = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      checked: false,
    }));

    setItems(updatedItems);
  };

  const handleRemove = () => {
    deleteListById(id);
    navigation.goBack();
  }

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

  const handleEnterPress = (index) => {
    if (index < items.length - 1) {
      textInputsRefs.current[index + 1].focus(); // Focus on the next text input
    } else {
      addNewLine();
    }
  };

  const addNewLine = () => {
    const newLine = { ...EMPTY_ITEM };
    setItems((prevItems) => {
      const uncheckedItems = prevItems.filter((item) => !item.checked);
      const checkedItems = prevItems.filter((item) => item.checked);
      return [...uncheckedItems, newLine, ...checkedItems];
    });
    // setTimeout(() => textInputsRefs.current.pop().focus(), 200);
  };

  const removeItem = (item) => {
    const newItems = items.filter((x) => x.id !== item.id);

    setItems(newItems);
  }

  const toggleItem = (item) => {
    const updatedItems = items.map((existingItem) =>
      existingItem.id === item.id
        ? { ...existingItem, checked: !existingItem.checked }
        : existingItem
    );

    const uncheckedItems = updatedItems.filter((item) => !item.checked);
    const checkedItems = updatedItems.filter((item) => item.checked);

    const sortedItems = [...uncheckedItems, ...checkedItems];

    setItems(sortedItems);
  };

  const ListEmptyComponent = useMemo(() => (
    <TouchableOpacity onPress={() => addNewLine()}>
      <Text> + Пункт списку </Text>
    </TouchableOpacity>
  ))

  const ListHeaderComponent = useMemo(() => (
    <TextInput
      value={name}
      onChangeText={(text) => setName(text)}
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
export default FinalListScreen;
