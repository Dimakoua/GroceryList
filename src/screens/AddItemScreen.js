import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const AddDishScreen = ({ navigation }) => {
  const [render, setRender] = useState(false);
  const [name, setName] = useState('');
  const [shoppingLists, setshoppingLists] = useState([{ id: 0, text: '' }]);


  useEffect(() => {

  }, [render])

  const handleEnterPress = () => {
    const currentDate = (new Date()).getTime().toString();
    let emptyRow = { id: currentDate, text: '' }
    let newList = shoppingLists;

    newList.push(emptyRow);

    setshoppingLists(newList);
    setRender(!render);

    console.log(shoppingLists)

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
            <TouchableOpacity onPress={() => console.log("asdasdasdasdasd")}>
              <View style={[styles.checkbox,]} />
              {/* { backgroundColor: item.checked ? 'green' : 'transparent' } */}
            </TouchableOpacity>
            <TextInput
              value={item.text}
              onChangeText={(text) => console.log(text)}
              onSubmitEditing={handleEnterPress}
              placeholder="Назва інгредієнту"
              style={styles.input}
            />
          </View>
        )}
      />








    </View>
  );
};

const styles = StyleSheet.create({
  checkboxWrap: {
    flexDirection: 'row',
    lineHeight: 14
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'green',
    marginRight: 8,
  },
});

export default AddDishScreen;
