import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isFetching: false,
  posts: [],
  error: null,
  showEdit: false,
  postIdToEdit: '',
  postDescToEdit: ''
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
    showEditModal(state) {
      state.showEdit = !state.showEdit;
    },
    postEditdetails(state, action) {
      state.postIdToEdit = action.payload._id;
      state.postDescToEdit = action.payload.desc;
    }
  }
});

export const { postFetchStart, postFetchSuccess, postFetchFailed, showEditModal, postEditdetails } = postSlice.actions;

export default postSlice.reducer;