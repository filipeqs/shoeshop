import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productDetailsReducer,
    productListReducer,
    productRandomReducer,
    productReviewCreateReducer,
    productReviewListRecuder,
    productTopRatedReducer,
} from './reducers/productReducers';
import {
    userDetailsReducer,
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
    orderPayReducer,
} from './reducers/orderReducer';
import { alertsReducer } from './reducers/alertReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
    productReviewList: productReviewListRecuder,
    productTopRated: productTopRatedReducer,
    productRandom: productRandomReducer,
    cart: cartReducer,
    orderDetails: orderDetailsReducer,
    orderCreate: orderCreateReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    alerts: alertsReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
