import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SHOPPING_ITEMS = 'shopping_items';
const DISHES = 'dishes';
const CONST_LIST = [
    SHOPPING_ITEMS,
    DISHES
];

export function useItems() {
    
    const getAllLists = async () => {
        const shoppingLists = await getShoppingLists();
        const dishes = await getDishes();

        return shoppingLists.concat(dishes);
    };

    const getShoppingLists = async () => {
        const lists = await AsyncStorage.getItem(SHOPPING_ITEMS);

        return JSON.parse(lists) ?? [];
    };

    const getDishes = async () => {
        const dishes = await AsyncStorage.getItem(DISHES);

        return JSON.parse(dishes) ?? [];
    };

    const getItemsByListId = async (listName) => {
        const shoppingLists = await getShoppingLists();
        const index = shoppingLists.findIndex(item => item.name === listName);

        return shoppingLists[index];
    };

    const getItemsByDishId = async (dishName) => {
        const dishesLists = await getDishes();
        const index = dishesLists.findIndex(item => item.name === dishName);

        return dishesLists[index];
    };

    const saveDish = async (dish) => {
        let dishesLists = await getDishes();

        if (!dishesLists) {
            return;
        }

        const index = dishesLists.findIndex(item => item.id === dish.id);

        if (index === -1) { 
            dishesLists.push(dish);
        } else {
            dishesLists[index] = dish;
        }

        await save(DISHES, dishesLists);
    };

    const saveShoppingItem = async (shoppingItem) => {
        let shoppingLists = await getShoppingLists();
        const index = shoppingLists.findIndex(item => item.name === shoppingItem.name);

        if (index !== -1) {
            shoppingLists[index] = shoppingItem;
        }

        await save(SHOPPING_ITEMS, shoppingLists);
    };

    const save = async (name, payload) => {
        const index = CONST_LIST.findIndex(item => item === name);
        if (index === -1) {
            throw new Error(`${name} is not allowed name`);
        }

        try {
            await AsyncStorage.setItem(name, JSON.stringify(payload));
        } catch (error) {
            console.error('Error saving ideas:', error);
        }
    };


    return { getShoppingLists, getDishes, getItemsByListId, getItemsByDishId, saveDish, saveShoppingItem, getAllLists };
}
