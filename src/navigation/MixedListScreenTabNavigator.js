import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateMixedListScreen from '../screens/CreateMixedListScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const MixedListScreenTabNavigator = ({ navigation, route }) => {
  // Your existing code here

  return (
    <Tab.Navigator>
      <Tab.Screen name="List" component={CreateMixedListScreen} />
      <Tab.Screen name="Meals" component={CreateMixedListScreen} />
    </Tab.Navigator>
  );
};

export default MixedListScreenTabNavigator;
