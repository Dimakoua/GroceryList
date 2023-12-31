import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import MixedListScreenTabNavigator from './MixedListScreenTabNavigator';
import AddListScreenCopy from '../screens/AddListScreen';
import PlayScreen from '../screens/PlayScreen';

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
                    component={AddListScreenCopy}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="createMixedList"
                    component={MixedListScreenTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="playScreen"
                    component={PlayScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;
