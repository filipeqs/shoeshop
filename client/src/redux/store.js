import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productDeleteReducer,
    productDetailsReducer,
    productListAllReducer,
    productListReducer,
    productRandomReducer,
    productReviewCreateReducer,
    productReviewListAllReducer,
    productReviewListReducer,
    productTopRatedReducer,
} from './reducers/productReducers';
import {
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducer';
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderPayReducer,
} from './reducers/orderReducer';
import { alertsReducer } from './reducers/alertReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productList: productListReducer,
    productListAll: productListAllReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productReviewCreate: productReviewCreateReducer,
    productReviewList: productReviewListReducer,
    productReviewListAll: productReviewListAllReducer,
    productTopRated: productTopRatedReducer,
    productRandom: productRandomReducer,
    cart: cartReducer,
    orderDetails: orderDetailsReducer,
    orderCreate: orderCreateReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    orderListMy: orderListMyReducer,
    alerts: alertsReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
