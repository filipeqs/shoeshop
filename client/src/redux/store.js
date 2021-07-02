import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productDetailsReducer,
    productListReducer,
    productReviewCreateReducer,
    productReviewListRecuder,
} from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducer';
import { orderCreateReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
    productReviewList: productReviewListRecuder,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
