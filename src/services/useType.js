import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENT_TYPE = 'current_type';

const ALL_LISTS = 'all_lists';
const SHOPPING_ITEMS = 'shopping_items';
const DISHES = 'dishes';
const ALL_TYPES = [
    ALL_LISTS,
    SHOPPING_ITEMS,
    DISHES
]
const CONST_LIST = [
    SHOPPING_ITEMS,
    DISHES
];

export function useType() {
    const [type, setType] = useState(ALL_LISTS);

    return {
        type,
        setType,
        CONST_LIST,
        SHOPPING_ITEMS,
        DISHES,
        ALL_LISTS
    };
}
