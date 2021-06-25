import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
