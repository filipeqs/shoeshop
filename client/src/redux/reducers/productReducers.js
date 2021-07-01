import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_REVIEW_LIST_REQUEST,
    PRODUCT_REVIEW_LIST_SUCCESS,
    PRODUCT_REVIEW_LIST_FAIL,
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

export const productDetailsReducer = (state = { product: { stock: [], reviews: [] } }, action) => {
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

export const productReviewCreateReducer = (state = { success: false }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: payload,
            };
        case PRODUCT_CREATE_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
            };
        default:
            return state;
    }
};

export const productReviewListRecuder = (state = { reviews: [] }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_REVIEW_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                reviews: [],
            };
        case PRODUCT_REVIEW_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: payload,
            };
        case PRODUCT_REVIEW_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};
