import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShoppingListScreen from '../screens/ShoppingListScreen ';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="shoppingList" component={ShoppingListScreen}  options={{ headerShown: false }}/>
      {/* <Tab.Screen name="dishesList" component={ShoppingListScreen}  options={{ headerShown: false }}/> */}
    </Tab.Navigator>
  );
}

export default TabNavigator;
