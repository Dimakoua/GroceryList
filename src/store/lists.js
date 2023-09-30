import { createSlice } from '@reduxjs/toolkit'
import { ALL_LISTS, SHOPPING_ITEMS, DISHES, CONST_LIST } from '../services/types'

const initialState = {
  lists: []
}

export const lists = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    upsert: (state, value) => {
      const newValue = value.payload;
      const typeIndex = CONST_LIST.findIndex(item => item === newValue.type);
      if (typeIndex === -1) {
          throw new Error(`${newValue.type} is not allowed name`);
      }

      const index = state.lists.findIndex(item => item.id === newValue.id);

      if (index === -1) {
        state.lists.push(newValue);
      } else {
        state.lists[index] = newValue;
      }
    },
    remove: (state, value) => {
      state.lists = state.lists.filter(item => item.id !== value.payload);
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  upsert,
  remove,
  addRecentItem
} = lists.actions

export default lists.reducer