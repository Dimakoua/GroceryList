import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { useItems } from '../services/useItems';

const AddDishScreen = ({ navigation }) => {
  const [render, setRender] = useState(false);
  const [name, setName] = useState('');

  const [shoppingLists, setShoppingLists] = useState([
    { id: 0, text: '', checked: false },
  ]);

  const {saveDish} = useItems()

  const nameInputRef = useRef();
  const textInputsRefs = useRef([]);

  useEffect(() => {
    
  }, [render]);

  const handleEnterPress = (currentItemIndex) => {
    const currentDate = new Date().getTime().toString();
    const emptyRow = { id: currentDate, text: '', checked: false };
    const newList = [...shoppingLists, emptyRow];

    setShoppingLists(newList);
    save();

    // Focus on the next TextInput
    setTimeout(() => textInputsRefs.current[currentItemIndex + 1].focus(), 100)
  };


  const setItemText = (item, text) => {
    const index = shoppingLists.findIndex((x) => x.id === item.id);

    if (index === -1) {
      return;
    }

    shoppingLists[index].text = text;

    setShoppingLists([...shoppingLists]);
    save();
  };

  const removeItem = (item) => {
    const newShoppingLists = shoppingLists.filter((x) => x.id !== item.id);

    setShoppingLists(newShoppingLists);
    save();
  }

  const toggleItem = (item) => {
    const index = shoppingLists.findIndex((x) => x.id === item.id);

    if (index === -1) {
      return;
    }

    shoppingLists[index].checked = !shoppingLists[index].checked;
    save();
  };

  const save = async () => {
    setRender(!render);
    await saveDish({name: name, list: shoppingLists});
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>header</Text>
      </View>

      <FlatList
        data={shoppingLists}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <TextInput
            ref={nameInputRef}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Назва"
            style={[styles.input, styles.title]}
            onSubmitEditing={() => textInputsRefs.current[0].focus()} // Focus on the first text input
          />
        }
        renderItem={({ item, index }) => (
          <View style={styles.checkboxWrap}>
            <TouchableOpacity onPress={() => toggleItem(item)}>
              <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
            </TouchableOpacity>
            <TextInput
              ref={(ref) => (textInputsRefs.current[index] = ref)} // Store the ref in the array
              value={item.text}
              onChangeText={(text) => setItemText(item, text)}
              onSubmitEditing={() => {
                if (index < shoppingLists.length - 1) {
                  textInputsRefs.current[index + 1].focus(); // Focus on the next text input
                } else {
                  handleEnterPress(index); // Handle Enter press when reaching the last input
                }
              }}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => removeItem(item)}>
              <Image source={require('./../../assets/icons8-close-24.png')} style={styles.closeBtn} />
            </TouchableOpacity>
          </View>
        )}
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
    borderColor: 'gray',
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
});

export default AddDishScreen;
