import { createSlice } from '@reduxjs/toolkit'
import { MIXED } from '../services/types'

const initialState = {
    id: null,
    meals: [],
    items: [],
    type: MIXED
}

export const activeList = createSlice({
    name: 'activeList',
    initialState,
    reducers: {
        addMeal: (state, value) => {
            const newValue = value.payload;
            const index = state.meals.findIndex(item => item.id === newValue.id);

            if (index === -1) {
                state.meals.push(newValue);
            } else {
                state.meals[index] = newValue;
            }
        },
        removeMeal: (state, value) => {
            state.meals = state.meals.filter(item => item.id !== value.payload.id);
        },
        addItem: (state, value) => {
            const newValue = value.payload;
            const index = state.items.findIndex(item => item.id === newValue.id);

            if (index === -1) {
                state.items.push(newValue);
            } else {
                state.items[index] = newValue;
            }
        },
        removeItem: (state, value) => {
            state.items = state.items.filter(item => item.id !== value.payload.id);
        },
        setUpActiveList: (state, value) => {
            const list = value.payload;

            state.id = list.id;
            state.type = list.type;
            state.meals = list.meals ?? [];
            state.items = list.items ?? [];
        },
        clean: (state) => {
            state = initialState;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    removeMeal,
    addMeal,
    setUpActiveList,
    clean
} = activeList.actions

export default activeList.reducer