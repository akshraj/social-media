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
    registerStart: (state) => {
      state.isFetching = true;
      state.err = null;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
    },
    registerError: (state, action) => {
      state.isFetching = false;
      state.err = action.payload;
    },

    signOut: (state) => {
      localStorage.removeItem("user")
      state.user = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginError, loginStart, registerStart, registerSuccess, registerError, signOut } = authSlice.actions

export default authSlice.reducer