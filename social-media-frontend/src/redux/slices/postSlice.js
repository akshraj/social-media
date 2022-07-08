import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isFetching: false,
  posts: [],
  error: null
}
export const postSlice = createSlice({
  name: 'post',
  initialState: INITIAL_STATE,
  reducers: {
    postFetchStart(state) {
      state.isFetching = true;
      state.error = null;
    },
    postFetchSuccess(state, action) {
      state.isFetching = false;
      state.posts = action.payload
    },
    postFetchFailed(state, action) {
      state.isFetching = false;
      action.error = action.payload
    },

  }
});

export const { postFetchStart, postFetchSuccess, postFetchFailed } = postSlice.actions;

export default postSlice.reducer;