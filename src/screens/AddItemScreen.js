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
import { useLists } from '../services/useLists';
import BackButton from '../components/BackBtn';
import TrashBtn from '../components/TrashBtn';
import ResetBtn from '../components/ResetBtn';
import PinBtn from '../components/PinBtn';
import { useSelector } from 'react-redux';

const AddDishScreen = ({ navigation, route }) => {
  const type = useSelector(state => state.filters.type);

  const { upsertList, deleteListById } = useLists()
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const [items, setItems] = useState([]);

  const textInputsRefs = useRef([]);
  const params = route.params?.item;

  const EMPTY_ITEM = {
    id: new Date().getTime().toString(),
    checked: false,
    text: '',
    pinned: false
  };

  const initialSetUp = () => {
    if (!isEmptyList()) return;

    if (params) {
      setId(params.id);
      setName(params.name);
      setItems(params.items);
      setIsPinned(params.pinned);
    } else {
      const id = new Date().getTime().toString();
      setId(id);
    }
  }

  const isEmptyList = () => {
    if (name === null && items.length === 0) {
      return true;
    }
    return false;
  }

  useEffect(() => {

    initialSetUp();

    //save the list after each change.
    if (!isEmptyList()) {
      save();
    }
  }, [name, items, isPinned]);

  const addNewLine = () => {
    setItems((prevItems) => [...prevItems, { ...EMPTY_ITEM }]);
  }

  const setItemText = (item, text) => {
    const updatedItems = items.map((existingItem) =>
      existingItem.id === item.id ? { ...existingItem, text } : existingItem
    );

    setItems(updatedItems);
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
    // onSubmitEditing={() => textInputsRefs.current[0].focus()} // Focus on the first text input
    />
  ))

  const ItemComponent = ({ item, index }) => (
    <View style={styles.checkboxWrap}>
      <TouchableWithoutFeedback onPress={() => toggleItem(item)}>
        <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
      </TouchableWithoutFeedback>
      <TextInput
        ref={(ref) => (textInputsRefs.current[index] = ref)} // Store the ref in the array
        value={item.text}
        onChangeText={(text) => setItemText(item, text)}
        onSubmitEditing={() => handleEnterPress(index)}
        style={[styles.input, { textDecorationLine: item.checked ? 'line-through' : 'none' }]}
      />
      <TouchableWithoutFeedback onPress={() => removeItem(item)}>
        <Image source={require('./../../assets/icons8-close-24.png')} style={styles.closeBtn} />
      </TouchableWithoutFeedback>
    </View>
  )

  const handleEnterPress = (index) => {
    if (index < items.length - 1) {
      textInputsRefs.current[index + 1].focus(); // Focus on the next text input
    } else {
      addNewLine();
      setTimeout(() => textInputsRefs.current[index + 1].focus(), 200);
    }
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

    setItems(updatedItems);
  };

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

  const save = () => {
    const newList = { id: id, name: name, items: items, type: type, pinned: isPinned };
    upsertList(newList);
  }

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
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={ItemComponent}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const maxWidth = windowWidth - 80; // Subtract 40 from each side

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Set your desired background color
  },
  input: {
    height: 40,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '80%',
    maxWidth: maxWidth,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  checkboxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'green',
    marginRight: 8,
  },
  closeBtn: {
    width: 20,
    height: 20,
    marginLeft: 8,
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
  }
});

export default AddDishScreen;
