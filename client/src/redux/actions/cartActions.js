import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (product) => (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: product,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (selectedId) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: selectedId,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
