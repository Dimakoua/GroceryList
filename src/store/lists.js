import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lists: []
}

export const lists = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    
  }
})

// Action creators are generated for each case reducer function
export const {
  setCurrentScreen,
  insertAfter,
  insertBefore,
  remove,
  append,
  replace,
  resetCurrentScreen
} = lists.actions

export default lists.reducer