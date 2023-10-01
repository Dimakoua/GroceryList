import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lists: []
}

export const lists = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    upsert: (state, value) => {
      const newValue = value.payload;
      const index = state.lists.findIndex(item => item.id === newValue.id);

      if (index === -1) {
        state.lists.push(newValue);
      } else {
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