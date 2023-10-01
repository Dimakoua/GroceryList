import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    meals: [],
}

export const checkedMealList = createSlice({
    name: 'checkedMealList',
    initialState,
    reducers: {
        setCheckedMeals: (state, value) => {
            state.meals = value.payload;
        },
        clean: (state) => {
            state = initialState;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    clean,
    setCheckedMeals
} = checkedMealList.actions

export default checkedMealList.reducer