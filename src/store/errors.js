import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  errors: []
}

export const errors = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError: (state, value) => {
      const newError = value.payload;
      state.errors.push(newError);
    },
    removeError: (state) => {
      state.errors.shift();
    },
    dismissErrors: (state) => {
      state.errors = [];
    }
  }
})

export const {
  addError,
  removeError,
  dismissErrors
} = errors.actions

export default errors.reducer