import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const addToCart = (product) => (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            _id: product._id,
            productId: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            count: product.count,
            qty: product.qty,
            size: product.size,
            selectedId: product.selectedId,
        },
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

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};
