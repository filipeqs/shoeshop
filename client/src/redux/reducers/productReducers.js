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
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_RANDOM_REQUEST,
    PRODUCT_RANDOM_SUCCESS,
    PRODUCT_RANDOM_FAIL,
    PRODUCT_REVIEW_LIST_ALL_REQUEST,
    PRODUCT_REVIEW_LIST_ALL_SUCCESS,
    PRODUCT_REVIEW_LIST_ALL_FAIL,
    PRODUCT_LIST_ALL_REQUEST,
    PRODUCT_LIST_ALL_SUCCESS,
    PRODUCT_LIST_ALL_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
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

export const productListAllReducer = (state = { loading: true, products: [] }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_LIST_ALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_LIST_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.products,
                pages: payload.pages,
                page: payload.page,
            };
        case PRODUCT_LIST_ALL_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: payload,
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

export const productCreateReducer = (state = {}, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                product: null,
            };
        case PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                product: payload,
            };
        case PRODUCT_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: payload,
            };
        case PRODUCT_CREATE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                product: null,
            };
        default:
            return state;
    }
};

export const productUpdateReducer = (state = {}, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                product: null,
            };
        case PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                product: payload,
            };
        case PRODUCT_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: payload,
            };
        case PRODUCT_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                product: null,
            };
        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
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

export const productReviewListReducer = (state = { reviews: [] }, action) => {
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
                reviews: payload.reviews,
                pages: payload.pages,
                page: payload.page,
                productId: payload.productId,
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

export const productReviewListAllReducer = (state = { reviews: [] }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_REVIEW_LIST_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                reviews: [],
            };
        case PRODUCT_REVIEW_LIST_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: payload,
            };
        case PRODUCT_REVIEW_LIST_ALL_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_TOP_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],
            };
        case PRODUCT_TOP_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload,
            };
        case PRODUCT_TOP_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: payload,
            };

        default:
            return state;
    }
};

export const productRandomReducer = (state = { products: [] }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_RANDOM_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],
            };
        case PRODUCT_RANDOM_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload,
            };
        case PRODUCT_RANDOM_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: payload,
            };

        default:
            return state;
    }
};
