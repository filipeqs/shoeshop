import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    const { payload, type } = action;

    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: payload.products,
                pages: payload.pages,
                page: payload.page,
            };
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                products: [],
                error: payload,
            };
        default:
            return state;
    }
};
