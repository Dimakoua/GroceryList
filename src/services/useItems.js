import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_LISTS, SHOPPING_ITEMS, DISHES, CONST_LIST } from './types';

export function useItems() {

    const getAllLists = async () => {
        const lists = await AsyncStorage.getItem(ALL_LISTS);

        return JSON.parse(lists) ?? [];
    };

    const searchLists = async (text, type) => {
        const lists = await getListsByType(type);
        const shoppingList = lists.filter(list => {
            if (list.name?.includes(text)) return true;

            const nestedList = list.items?.filter(element => {
                if (element.text?.includes(text)) return true;
            });

            if (nestedList && nestedList.length) return true;

        });
        return shoppingList;
    }

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

    const getListsByType = async (type) => {
        if (type == ALL_LISTS) {
            const lists = await getAllLists();
            return lists;
        }

        const typeIndex = CONST_LIST.findIndex(item => item === type);
        if (typeIndex === -1) {
            throw new Error(`${type} is not allowed type`);
        }

        const lists = await getAllLists();
        const shoppingList = lists.filter(item => item.type === type);
        return shoppingList;
    }

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


    return {
        getAllLists,
        getShoppingLists,
        getDishesList,
        getListById,
        upsertList,
        deleteListById,
        searchLists,
        getListsByType,
        // SHOPPING_ITEMS,
        // DISHES,
        // ALL_LISTS
    };
}
