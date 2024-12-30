import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { productListReducers , productDetailsReducers } from './reducers/prodcutRreducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducers, userRegisterReducers } from './reducers/userReducers';

// Combine your reducers here
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
      JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
      JSON.parse(localStorage.getItem('userInfo')) : null;

// Define the initial state
const initialState = {
  cart: {cartItems : cartItemsFromStorage},
  userLogin: {userInfo: userInfoFromStorage},
};

// Middleware
const middleware = [thunk];

// Configure the store
const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
