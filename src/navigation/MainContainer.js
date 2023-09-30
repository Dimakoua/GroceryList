import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddListScreen from '../screens/AddListScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import MixedListScreenTabNavigator from './MixedListScreenTabNavigator';

const Stack = createStackNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={ShoppingListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="addList"
                    component={AddListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="createMixedList"
                    component={MixedListScreenTabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;
