import { createSlice } from '@reduxjs/toolkit'
import { ALL_LISTS } from '../services/types';
const initialState = {
  type: ALL_LISTS,
  searchText: ''
}

export const filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setType: (state, value) => {
      state.type = value.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setType
} = filters.actions

export default filters.reducer