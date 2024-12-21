import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { productListReducers } from './reducers/prodcutRreducers';

// Combine your reducers here
const reducer = combineReducers({
  productList: productListReducers,
});

// Define the initial state
const initialState = {};

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
