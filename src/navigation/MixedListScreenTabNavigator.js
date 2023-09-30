import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MealsScreen from '../screens/MixedList/MealsScreen';
import FinalListScreen from '../screens/MixedList/FinalListScreen';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const MixedListScreenTabNavigator = ({ navigation, route }) => {
  // Your existing code here

  return (
    <Tab.Navigator>
      <Tab.Screen name="List" component={FinalListScreen} />
      <Tab.Screen name="Meals" component={MealsScreen} />
    </Tab.Navigator>
  );
};

export default MixedListScreenTabNavigator;
