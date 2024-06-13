import {createSlice} from '@reduxjs/toolkit';

const SellerSlice = createSlice({
  name: 'Seller Reducer',
  initialState: {
    uuid: [1, 2],
  },
  reducers: {
    addSeller: (state, action) => {
      console.log('action', action.payload);
      const seller = [...state?.uuid, action?.payload];
      state.uuid = seller;
    },
  },
});

export const {addSeller} = SellerSlice.actions;
export default SellerSlice;
