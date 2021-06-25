import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
