import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
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
