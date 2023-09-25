import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddItemScreen from '../screens/AddItemScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen ';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Screen1" component={AddItemScreen}  options={{ headerShown: false }}/>
      <Tab.Screen name="Screen2" component={ShoppingListScreen}  options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;
