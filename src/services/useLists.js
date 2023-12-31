import React, { useState, useEffect } from 'react';
import { SHOPPING_ITEMS, DISHES, ALL_TYPES, MIXED } from './types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { remove, upsert } from '../store/lists';

export function useLists() {
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists, shallowEqual);

    const getAllLists = () => {
        return lists;
    };

    const searchLists = (text, type) => {
        const lists = getListsByType(type);

        if (text) {
            const shoppingList = lists.filter(list => {
                if (list.name?.toLowerCase().includes(text.toLowerCase())) return true;

                const nestedList = list.items?.filter(element => {
                    if (element.text?.toLowerCase().includes(text.toLowerCase())) return true;
                });

                if (nestedList && nestedList.length) return true;

            });
            return shoppingList;
        } else {
            return lists;
        }
    };

    const getShoppingLists = () => {
        const shoppingList = lists.filter(item => item.type === SHOPPING_ITEMS);

        return shoppingList;
    };

    const getMealsList = () => {
        const shoppingList = lists.filter(item => item.type === DISHES);

        return shoppingList;
    };

    const getListsByType = (type) => {
        const typeIndex = ALL_TYPES.findIndex(item => item === type);
        if (typeIndex === -1) {
            throw new Error(`${type} is not allowed type`);
        }

        const shoppingList = lists.filter(item => item.type === type);
        return shoppingList;
    };

    const getListById = (id) => {
        if (!id) return {};
        return lists.find(item => item.id === id);
    };

    const toggleItemById = (listId, itemId) => {
        const list = lists.find(x => x.id === listId);
        dispatch(upsert({ ...list, checkedItems: [...list.checkedItems, itemId] }));
    }

    const upsertList = (newList) => {
        const typeIndex = ALL_TYPES.findIndex(item => item === newList.type);
        if (typeIndex === -1) {
            throw new Error(`${newList.type} is not allowed type`);
        }

        dispatch(upsert(newList));
    };

    const deleteListById = (id) => {
        dispatch(remove(id));
    };


    return {
        getAllLists,
        getShoppingLists,
        getMealsList,
        getListById,
        upsertList,
        deleteListById,
        searchLists,
        getListsByType,
        toggleItemById
    };
}
