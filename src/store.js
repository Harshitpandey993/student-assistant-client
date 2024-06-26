// // import { createStore, applyMiddleware } from 'redux'
// // import thunk from 'redux-thunk'
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// // import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from "./reducers/productReducers";
import {
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productUserReducer,
} from "./reducers/productReducers";
import {
  toastMessage,
  userLoginReducer,
  userWishlist,
} from "./reducers/userReducer";
import { userRegisterReducer } from "./reducers/userReducer";

import {
  emailReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userDetailsReducer,
  userVerificationReducer,
} from "./reducers/userReducer";

import { getCHAT, getAllCHAT, deleteChat } from "./reducers/chatReducers";
import { getMESSAGE, postMESSAGE } from "./reducers/messageReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userVerification: userVerificationReducer,
  userRegister: userRegisterReducer,
  emailReducer: emailReducer,
  usersList: userListReducer,
  userDelete: userDeleteReducer,
  userWishlist: userWishlist,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productUser: productUserReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  getChat: getCHAT,
  chatList: getAllCHAT,
  getMessage: getMESSAGE,
  postMESSAGE: postMESSAGE,
  deleteChat: deleteChat,
  toastMessage: toastMessage,
});

const userDataFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

// const middleware = [thunk]
const initialState = {
  userLogin: { userData: userDataFromStorage },
};
const store = configureStore({
  reducer,
  initialState,
});
export default store;
