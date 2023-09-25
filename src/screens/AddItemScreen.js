import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const AddDishScreen = ({ navigation }) => {
  const [render, setRender] = useState(false);
  const [name, setName] = useState('');
  const [shoppingLists, setShoppingLists] = useState([{ id: 0, text: '', checked: false }]);


  useEffect(() => {

  }, [render])

  const handleEnterPress = () => {
    const currentDate = (new Date()).getTime().toString();
    let emptyRow = { id: currentDate, text: '', checked: false }
    let newList = shoppingLists;

    newList.push(emptyRow);

    setShoppingLists(newList);
    setRender(!render);
  }

  const setItemText = (item, text) => {
    const index = shoppingLists.findIndex(x => x.id === item.id);

    if (index === -1) {
      return;
    }

    shoppingLists[index].text = text;

    setShoppingLists(shoppingLists);
    setRender(!render);


    console.log(shoppingLists)
  }

  const toggleItem = (item) => {
    const index = shoppingLists.findIndex(x => x.id === item.id);

    if (index === -1) {
      return;
    }

    shoppingLists[index].checked = !shoppingLists[index].checked;
    setRender(!render);
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Назва"
        style={styles.input}
      />
      <FlatList
        data={shoppingLists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.checkboxWrap}>
            <TouchableOpacity onPress={() => toggleItem(item)}>
              <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
            </TouchableOpacity>
            <TextInput
              value={item.text}
              onChangeText={(text) => setItemText(item, text)}
              onSubmitEditing={handleEnterPress}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => console.log("aaaaa")}>
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
    maxWidth: maxWidth
  },
  checkboxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between'
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
