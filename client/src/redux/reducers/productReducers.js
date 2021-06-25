import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
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

export const productDetailsReducer = (state = { product: { stock: [] } }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                product: {},
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};
