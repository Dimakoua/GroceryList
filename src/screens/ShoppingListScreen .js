import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

function ShoppingListScreen({ navigation }) {
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem) {
      setShoppingList([...shoppingList, { name: newItem, checked: false }]);
      setNewItem('');
    }
  };

  const deleteItem = (item) => {
    const updatedList = shoppingList.filter((shoppingItem) => shoppingItem.name !== item.name);
    setShoppingList(updatedList);
  };

  const editItem = (oldItem, newItem) => {
    const updatedList = shoppingList.map((shoppingItem) =>
      shoppingItem.name === oldItem.name ? { name: newItem, checked: oldItem.checked } : shoppingItem
    );
    setShoppingList(updatedList);
  };

  const toggleItem = (item) => {
    const updatedList = shoppingList.map((shoppingItem) =>
      shoppingItem.name === item.name ? { ...shoppingItem, checked: !shoppingItem.checked } : shoppingItem
    );
    setShoppingList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список покупок</Text>
      <TextInput
        style={styles.input}
        placeholder="Додати новий товар"
        value={newItem}
        onChangeText={(text) => setNewItem(text)}
      />
      <Button title="Додати" onPress={addItem} />
      <FlatList
        data={shoppingList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleItem(item)}>
              <View style={[styles.checkbox, { backgroundColor: item.checked ? 'green' : 'transparent' }]} />
            </TouchableOpacity>
            <Text style={[styles.itemText, { textDecorationLine: item.checked ? 'line-through' : 'none' }]}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Видалити" onPress={() => deleteItem(item)} />
              <Button
                title="Редагувати"
                onPress={() => {
                  const editedItem = prompt('Редагувати товар:', item.name);
                  if (editedItem !== null) {
                    editItem(item, editedItem);
                  }
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'green',
    marginRight: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
});

export default ShoppingListScreen;
