import { CART_ADD_ITEM } from '../constants/cartConstants';

export const addToCart = (product) => (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: product,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
