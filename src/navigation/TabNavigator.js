import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddDishScreen from '../screens/AddDishScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen ';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Screen1" component={AddDishScreen}  options={{ headerShown: false }}/>
      <Tab.Screen name="Screen2" component={ShoppingListScreen}  options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;
