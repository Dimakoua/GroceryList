import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
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