import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: payload,
            };
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ORDER_CREATE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
            };
        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = { order: { user: {}, shippingAddress: {}, orderItems: [] } },
    action,
) => {
    const { type, payload } = action;

    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                order: null,
                error: payload,
            };
        default:
            return state;
    }
};
