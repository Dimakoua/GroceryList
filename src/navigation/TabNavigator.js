import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddDishScreen from '../screens/AddDishScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen ';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Screen1" component={AddDishScreen} />
      <Tab.Screen name="Screen2" component={ShoppingListScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
