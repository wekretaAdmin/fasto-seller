import {createSlice} from '@reduxjs/toolkit';

const ProductsSlice = createSlice({
  name: 'Product Reducer',
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      const existingProduct = state.products.find(
        product => product.id === action.payload.id,
      );
      if (existingProduct) {
        state.products = state.products.filter(
          elem => elem.id !== action.payload?.id,
        );
      } else {
        state.products.push({...action.payload, quantity: 1});
      }
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(
        elem => elem.id === action.payload.id,
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        elem => elem.id === action.payload.id,
      );
      if (product) {
        product.quantity -= 1;
        if (product.quantity < 1) {
          state.products = state.products.filter(
            elem => elem.id !== action.payload.id,
          );
        }
      }
    },
    emptyProductData: (state, action) => {
      state.products = [];
    },
  },
});

export const {
  addProducts,
  increaseQuantity,
  addProductToCart,
  decreaseQuantity,
  emptyProductData,
} = ProductsSlice.actions;
export default ProductsSlice;
