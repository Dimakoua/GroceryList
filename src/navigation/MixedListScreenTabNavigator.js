import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MealsScreen from '../screens/MealsScreen';
import AddListScreenCopy from '../screens/AddListScreen';

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
            <Tab.Screen name="List" initialParams={route.params} component={AddListScreenCopy} />
            <Tab.Screen name="Meals" initialParams={route.params} component={MealsScreen} />
        </Tab.Navigator>
    );
};

export default MixedListScreenTabNavigator;
