import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  err: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.err = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload
    },
    loginError: (state, action) => {
      state.isFetching = false;
      state.err = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginError, loginStart } = authSlice.actions

export default authSlice.reducer