import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
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

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_DETAILS_RESET:
            return {
                user: {},
            };
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: payload,
            };
        case USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case USER_UPDATE_PROFILE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
            };
        default:
            return state;
    }
};

export const userUpdateReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: payload,
            };
        case USER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case USER_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
            };
        default:
            return state;
    }
};

export const userListReducer = (
    state = {
        users: [],
    },
    action,
) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                users: [],
            };
        case USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                users: payload.users,
                pages: payload.pages,
                page: payload.page,
            };
        case USER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                users: [],
            };
        default:
            return state;
    }
};
