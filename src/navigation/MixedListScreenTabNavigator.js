import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MealsScreen from '../screens/MixedList/MealsScreen';
import FinalListScreen from '../screens/MixedList/FinalListScreen';
import { AppProvider } from '../Context/MixedListContext';
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const MixedListScreenTabNavigator = ({ navigation, route }) => {
    return (
        <AppProvider>
            <Tab.Navigator>
                <Tab.Screen name="List"  component={FinalListScreen} />
                <Tab.Screen name="Meals" component={MealsScreen} />
            </Tab.Navigator>
        </AppProvider>
    );
};

export default MixedListScreenTabNavigator;
