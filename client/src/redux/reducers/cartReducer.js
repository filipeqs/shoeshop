import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

export const cartReducer = (
    state = { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    action,
) => {
    const { payload, type } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const itemToAdd = payload;

            const existItem = state.cartItems.find(
                (cartItem) => cartItem.selectedId === itemToAdd.selectedId,
            );

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.selectedId === existItem.selectedId ? itemToAdd : cartItem,
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemToAdd],
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem) => cartItem.selectedId !== payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload,
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload,
            };
        default:
            return state;
    }
};
