import {combineReducers, configureStore} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import LoginSlice from './reducer/LoginSlice';
import ProductsSlice from './reducer/ProductsSlice';
import SellerSlice from './reducer/SellerSlice';
import StoreUUid from './reducer/StoreUuid';

const combineReducer = combineReducers({
  loginReducer: LoginSlice.reducer,
  productReducer: ProductsSlice.reducer,
  sellerReducer: SellerSlice.reducer,
  storeUuidReducer: StoreUUid.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['sellerReducer', 'productReducer'],
};
const persistedReducer = persistReducer(persistConfig, combineReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
