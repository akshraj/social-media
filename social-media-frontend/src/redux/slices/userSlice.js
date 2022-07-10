import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  friends: [],
  isFetching: false,
  erro: null,
  usersFetching: false,
  users: [],
  usersFetchError: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    friendFetching(state) {
      state.isFetching = true;
    },
    friendFetcingSuccess(state, action) {
      state.isFetching = false;
      state.friends = action.payload;
    },
    friendFetchingFailed(state, action) {
      state.isFetching = false;
      state.erro = action.payload;
    },
    usersFetchingStart(state) {
      state.usersFetching = true;
    },
    usersFetcingSuccess(state, action) {
      state.usersFetching = false;
      state.users = action.payload;
    },
    usersFetchingFailed(state, action) {
      state.usersFetching = false;
      state.usersFetchError = action.payload;
    }
  }
});

export const { friendFetching, friendFetcingSuccess, friendFetchingFailed, usersFetchingStart, usersFetcingSuccess, usersFetchingFailed } = userSlice.actions;

export default userSlice.reducer;