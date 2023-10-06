import { SHOPPING_ITEMS, DISHES, ALL_TYPES, MIXED } from './types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { remove, upsert } from '../store/lists';
import { useCallback } from 'react';

export function useLists() {
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists, shallowEqual);

    const getAllLists = useCallback(() => {
        return lists;
    });

    const searchLists = useCallback((text, type) => {
        const lists = getListsByType(type);

        const shoppingList = lists.filter(list => {
            if (list.name?.toLowerCase().includes(text.toLowerCase())) return true;

            const nestedList = list.items?.filter(element => {
                if (element.text?.toLowerCase().includes(text.toLowerCase())) return true;
            });

            if (nestedList && nestedList.length) return true;

        });
        return shoppingList;
    }, [lists])

    const getShoppingLists = useCallback(() => {
        const shoppingList = lists.filter(item => item.type === SHOPPING_ITEMS);

        return shoppingList;
    });

    const getMealsList = useCallback(() => {
        const shoppingList = lists.filter(item => item.type === DISHES);

        return shoppingList;
    });

    const getListsByType = useCallback((type) => {
        if (type == MIXED) {
            return lists;
        }

        const typeIndex = ALL_TYPES.findIndex(item => item === type);
        if (typeIndex === -1) {
            throw new Error(`${type} is not allowed type`);
        }

        const shoppingList = lists.filter(item => item.type === type);
        return shoppingList;
    })

    const getListById = useCallback((id) => {
        const index = lists.findIndex(item => item.id === id);
        return lists[index];
    });

    const upsertList = useCallback((newList) => {
        const typeIndex = ALL_TYPES.findIndex(item => item === newList.type);
        if (typeIndex === -1) {
            throw new Error(`${newList.type} is not allowed type`);
        }

        dispatch(upsert(newList));
    })

    const deleteListById = useCallback((id) => {
        dispatch(remove(id));
    })


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
