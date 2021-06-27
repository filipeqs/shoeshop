import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

export const cartReducer = (state = { cartItems: cartItemsFromStorage }, action) => {
    const { payload, type } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const itemToAdd = payload;

            const existItem = state.cartItems.find(
                (cartItem) => cartItem.selectedId === itemToAdd.selectedId,
            );

            console.log(existItem);

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
            console.log(payload);
            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem) => cartItem.selectedId !== payload),
            };
        default:
            return state;
    }
};
