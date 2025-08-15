import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MealsScreen from '../screens/MealsScreen';
import AddListScreen from '../screens/AddListScreen';

const Tab = createMaterialTopTabNavigator();

const MixedListScreenTabNavigator = ({ route }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 3
                }
            }}
        >
            <Tab.Screen name="List" initialParams={route.params} component={AddListScreen} />
            <Tab.Screen name="Meals" initialParams={route.params} component={MealsScreen} />
        </Tab.Navigator>
    );
};

export default MixedListScreenTabNavigator;
