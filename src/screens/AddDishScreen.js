import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddDishScreen = ({ navigation }) => {
  const [dishName, setDishName] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    if (ingredientName.trim() !== '') {
      setIngredients([...ingredients, ingredientName]);
      setIngredientName('');
    }
  };

  const saveDish = () => {
    // Додайте логіку для збереження страви і інгредієнтів, як вам потрібно.
    // Наприклад, можлиливо, ви захочете використовувати AsyncStorage або зберігати дані на сервері.

    // Після збереження даних, можливо, вам захочеться очистити стан форми.
    setDishName('');
    setIngredients([]);
    setIngredientName('');

    // Повернутися на попередній екран (список страв)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додати страву</Text>
      <TextInput
        value={dishName}
        onChangeText={(text) => setDishName(text)}
        placeholder="Назва страви"
        style={styles.input}
      />

      <Text style={styles.subtitle}>Інгредієнти:</Text>
      <View style={styles.ingredientsContainer}>
        <TextInput
          value={ingredientName}
          onChangeText={(text) => setIngredientName(text)}
          placeholder="Назва інгредієнту"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonLabel}>Додати</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Список інгредієнтів:</Text>
      <View>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredientItem}>
            {ingredient}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveDish}>
        <Text style={styles.saveButtonLabel}>Зберегти страву</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  ingredientItem: {
    fontSize: 16,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddDishScreen;
