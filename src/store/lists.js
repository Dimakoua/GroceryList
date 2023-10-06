import { createSlice } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux';

const initialState = {
  lists: []
}

const EMPTY_LIST = {
    id: null,
    name: null,
    items: [],
    meals: [],
    checkedItems: [],
    isPinned: false,
    quantity: 1 
}

export const lists = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    upsert: (state, value) => {
      const newValue = value.payload;
      const index = state.lists.findIndex(item => item.id === newValue.id);

      if (index === -1) {
        state.lists.push({...EMPTY_LIST, ...newValue});
      } else {
        //if nothing changed do not save
        if(shallowEqual(state.lists[index], newValue)) return;

        state.lists[index] = { ...state.lists[index], ...newValue};
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