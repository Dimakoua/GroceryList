import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALL_LISTS = 'all_lists';
const SHOPPING_ITEMS = 'shopping_items';
const DISHES = 'dishes';
const CONST_LIST = [
    SHOPPING_ITEMS,
    DISHES
];

export function useItems() {

    const getAllLists = async () => {
        const lists = await AsyncStorage.getItem(ALL_LISTS);

        return JSON.parse(lists) ?? [];
    };

    const getShoppingLists = async () => {
        const lists = await getAllLists();
        const shoppingList = lists.filter(item => item.type === SHOPPING_ITEMS);

        return shoppingList;
    };

    const getDishesList = async () => {
        const lists = await getAllLists();
        const shoppingList = lists.filter(item => item.type === DISHES);

        return shoppingList;
    };

    const getListById = async (id) => {
        const shoppingLists = await getAllLists();
        const index = shoppingLists.findIndex(item => item.id === id);

        return shoppingLists[index];
    };

    const upsertList = async (newList) => {
        const typeIndex = CONST_LIST.findIndex(item => item === newList.type);
        if (typeIndex === -1) {
            throw new Error(`${newList.type} is not allowed name`);
        }

        const list = await getAllLists();
        const index = list.findIndex(item => item.id === newList.id);

        if (index === -1) {
            list.push(newList);
        } else {
            list[index] = newList;
        }

        console.log('list', list)

        save(list);
    }

    const save = async (newLists) => {
        try {
            await AsyncStorage.setItem(ALL_LISTS, JSON.stringify(newLists));
        } catch (error) {
            console.error('Error saving ideas:', error);
        }
    };

    const deleteListById = async (id) => {
        const lists = await getAllLists();
        const newList = lists.filter(item => item.id !== id);

        save(newList);
    }


    return { getAllLists, getShoppingLists, getDishesList, getListById, upsertList, deleteListById, SHOPPING_ITEMS, DISHES };
}
