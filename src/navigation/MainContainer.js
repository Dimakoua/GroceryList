import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddItemScreen from '../screens/AddItemScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import MixedListScreenTabNavigator from './MixedListScreenTabNavigator';

const Stack = createStackNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{ headerShown: false }} // Optional: Hide the header
                /> */}
                <Stack.Screen
                    name="Main"
                    component={ShoppingListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="addList"
                    component={AddItemScreen}
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
