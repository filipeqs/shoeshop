import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
} from '../constants/userConstants';

const userFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

export const userLoginReducer = (state = { userInfo: userFromStorage }, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                userInfo: null,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: payload,
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
                userInfo: null,
                error: null,
            };
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                userInfo: null,
                error: null,
            };
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: payload,
            };
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case USER_REGISTER_RESET:
            return {
                ...state,
                loading: false,
                userInfo: null,
                error: null,
            };
        default:
            return state;
    }
};
