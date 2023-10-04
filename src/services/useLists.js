import { SHOPPING_ITEMS, DISHES, ALL_TYPES, MIXED } from './types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { remove, upsert } from '../store/lists';
import { useEffect, useState } from 'react';

export function useLists() {
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists, shallowEqual);

    const getAllLists = () => {
        return lists;
    };

    const searchLists = async (text, type) => {
        const lists = await getListsByType(type);
        const shoppingList = lists.filter(list => {
            if (list.name?.toLowerCase().includes(text.toLowerCase())) return true;

            const nestedList = list.items?.filter(element => {
                if (element.text?.toLowerCase().includes(text.toLowerCase())) return true;
            });

            if (nestedList && nestedList.length) return true;

        });
        return shoppingList;
    }

    const getShoppingLists = () => {
        const shoppingList = lists.filter(item => item.type === SHOPPING_ITEMS);

        return shoppingList;
    };

    const getMealsList = () => {
        const shoppingList = lists.filter(item => item.type === DISHES);

        return shoppingList;
    };

    const getListsByType = (type) => {
        if (type == MIXED) {
            return lists;
        }

        const typeIndex = ALL_TYPES.findIndex(item => item === type);
        if (typeIndex === -1) {
            throw new Error(`${type} is not allowed type`);
        }

        const shoppingList = lists.filter(item => item.type === type);
        return shoppingList;
    }

    const getListById = (id) => {
        const index = lists.findIndex(item => item.id === id);
        return lists[index];
    };

    const upsertList = (newList) => {
        const typeIndex = ALL_TYPES.findIndex(item => item === newList.type);
        if (typeIndex === -1) {
            throw new Error(`${newList.type} is not allowed type`);
        }

        dispatch(upsert(newList));
    }

    const deleteListById = (id) => {
        dispatch(remove(id));
    }


    return {
        getAllLists,
        getShoppingLists,
        getMealsList,
        getListById,
        upsertList,
        deleteListById,
        searchLists,
        getListsByType,
    };
}
