import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { productListReducers , productDetailsReducers } from './reducers/prodcutRreducers';
import { cartReducer } from './reducers/cartReducers';
import { userDeleteReducers, userDetailsReducers, userListReducers, userLoginReducers, userRegisterReducers, userUpdateProfileReducers } from './reducers/userReducers';
import { listMyOrdersReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers';

// Combine your reducers here
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,

  cart: cartReducer,

  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  userList : userListReducers,
  userDelete : userDeleteReducers,
  
  orderCreate : orderCreateReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  orderListMy : listMyOrdersReducer,
  
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
      JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
      JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
      JSON.parse(localStorage.getItem('shippingAddress')) : {};

const paymentMehtodFromStorage = localStorage.getItem('paymentMethod') ? 
JSON.parse(localStorage.getItem('paymentMethod')) : "";

// Define the initial state
const initialState = {
  cart: {cartItems : cartItemsFromStorage, 
    shippingAddress : shippingAddressFromStorage,
    paymentMethod : paymentMehtodFromStorage,
  },
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
