import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { productListReducers , productDetailsReducers } from './reducers/prodcutRreducers';
import { cartReducer } from './reducers/cartReducers';

// Combine your reducers here
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
      JSON.parse(localStorage.getItem('cartItems')) : [];

// Define the initial state
const initialState = {
  cart: {cartItems : cartItemsFromStorage}
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
