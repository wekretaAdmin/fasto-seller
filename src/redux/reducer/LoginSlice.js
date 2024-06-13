import {createSlice} from '@reduxjs/toolkit';

const LoginSlice = createSlice({
  name: 'Login Reducer',
  initialState: {
    user: {
      idToken: '',
      refreshToken: '',
      userdata: {},
      statusid: '',
    },
  },
  reducers: {
    addUser: (state, action) => {
      console.log('redux', action.payload);
      state.user.idToken = action.payload?.idToken;
      state.user.refreshToken = action.payload?.refreshToken;
    },
    addUserDetail: (state, action) => {
      console.log('redux123', action.payload);
      state.user.userdata = action.payload;
    },
    statusId: (state, action) => {
      state.user.statusid = action.payload;
    },
  },
});

export const {addUser, addUserDetail, statusId} = LoginSlice.actions;
export default LoginSlice;
