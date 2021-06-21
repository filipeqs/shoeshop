import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
} from '../constants/productConstants';

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, ...payload.products],
                pages: payload.pages,
                page: payload.page,
            };
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: payload,
            };
        case PRODUCT_LIST_RESET:
            return {
                ...state,
                loading: true,
                products: [],
                error: null,
            };
        default:
            return state;
    }
};
