import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MealsScreen from '../screens/MixedList/MealsScreen';
import FinalListScreen from '../screens/MixedList/FinalListScreen';
import AddListScreenCopy from '../screens/AddListScreenCopy';
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const MixedListScreenTabNavigator = ({ route }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="List" initialParams={route.params} component={AddListScreenCopy} />
            <Tab.Screen name="Meals" initialParams={route.params} component={MealsScreen} />
        </Tab.Navigator>
    );
};

export default MixedListScreenTabNavigator;
