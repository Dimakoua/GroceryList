import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';

function ShoppingListScreen({ navigation }) {
  // Створюємо стейт для зберігання списку покупок
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Функція для додавання нової покупки до списку
  const addItem = () => {
    if (newItem) {
      setShoppingList([...shoppingList, newItem]);
      setNewItem('');
    }
  };

  // Функція для видалення покупки зі списку
  const deleteItem = (item) => {
    const updatedList = shoppingList.filter((shoppingItem) => shoppingItem !== item);
    setShoppingList(updatedList);
  };

  // Функція для редагування покупки в списку
  const editItem = (oldItem, newItem) => {
    const updatedList = shoppingList.map((shoppingItem) =>
      shoppingItem === oldItem ? newItem : shoppingItem
    );
    setShoppingList(updatedList);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Список покупок
      </Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16 }}
        placeholder="Додати новий товар"
        value={newItem}
        onChangeText={(text) => setNewItem(text)}
      />
      <Button title="Додати" onPress={addItem} />
      <FlatList
        data={shoppingList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="Видалити" onPress={() => deleteItem(item)} />
              <Button
                title="Редагувати"
                onPress={() => {
                  const editedItem = prompt('Редагувати товар:', item);
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

export default ShoppingListScreen;
