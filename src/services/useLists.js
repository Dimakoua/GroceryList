import { ALL_LISTS, SHOPPING_ITEMS, DISHES, CONST_LIST } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { remove, upsert } from '../store/lists';

export function useLists() {
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists);

    const getAllLists = () => {
        return lists;
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

    const getShoppingLists = () => {
        const shoppingList = lists.filter(item => item.type === SHOPPING_ITEMS);

        return shoppingList;
    };

    const getDishesList = () => {
        const shoppingList = lists.filter(item => item.type === DISHES);

        return shoppingList;
    };

    const getListsByType = (type) => {
        if (type == ALL_LISTS) {
            return lists;
        }

        const typeIndex = CONST_LIST.findIndex(item => item === type);
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
        dispatch(upsert(newList));
    }

    const deleteListById = (id) => {
        dispatch(remove(id));
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
    };
}
