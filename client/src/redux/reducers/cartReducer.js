import { CART_ADD_ITEM } from '../constants/cartConstants';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

export const cartReducer = (state = { cartItems: cartItemsFromStorage }, action) => {
    const { payload, type } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const itemToAdd = payload;

            const existItem = state.cartItems.find(
                (cartItem) => cartItem.selected._id === itemToAdd.selected._id,
            );

            console.log(existItem);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.selected._id === existItem.selected._id ? itemToAdd : cartItem,
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemToAdd],
                };
            }
        default:
            return state;
    }
};
