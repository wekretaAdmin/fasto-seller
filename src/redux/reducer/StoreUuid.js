import {createSlice} from '@reduxjs/toolkit';

const StoreUUid = createSlice({
  name: 'StoreUUid Reducer',
  initialState: {
    storeUuid: '',
  },
  reducers: {
    addStoreUuid: (state, action) => {
      console.log('action.payload', action.payload);
      state.storeUuid = action.payload;
    },
  },
});

export const {addStoreUuid} = StoreUUid.actions;
export default StoreUUid;
