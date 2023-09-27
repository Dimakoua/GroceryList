import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'; // Import your tab navigator component
import AddItemScreen from '../screens/AddItemScreen';

const Stack = createStackNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{ headerShown: false }} // Optional: Hide the header
                />
                <Stack.Screen 
                    name="addList" 
                    component={AddItemScreen} 
                    options={{ headerShown: false }} 
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;
