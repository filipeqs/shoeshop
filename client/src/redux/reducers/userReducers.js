import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT} 
from '../constants/userConstants'

const userFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

export const userLoginReducer = (state = { userInfo: userFromStorage }, action) => {
    const {type, payload} = action;

    switch(type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                userInfo: null,
                error: null,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: payload
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
                userInfo: null,
                error: null,
            }
        default:
            return state
    }
}