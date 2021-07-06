import axios from 'axios';
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
    PRODUCT_REVIEW_LIST_REQUEST,
    PRODUCT_REVIEW_LIST_SUCCESS,
    PRODUCT_REVIEW_LIST_FAIL,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_REQUEST,
    PRODUCT_RANDOM_REQUEST,
    PRODUCT_RANDOM_SUCCESS,
    PRODUCT_RANDOM_FAIL,
} from '../constants/productConstants';

export const getProducts =
    (pageNumber = '', brand = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });

            const { data } = await axios.get(
                `/api/products?pageNumber=${pageNumber}&brand=${brand}`,
            );

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const resetProducts = () => (dispatch) => {
    dispatch({ type: PRODUCT_LIST_RESET });
};

export const getProductById = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });

        const { data } = await axios.get(`/api/products/top`);

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getRandomProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_RANDOM_REQUEST });

        const { data } = await axios.get(`/api/products/random`);

        dispatch({
            type: PRODUCT_RANDOM_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_RANDOM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/reviews`, review, config);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getReviewsByProductId = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_LIST_REQUEST });

        const { data } = await axios.get(`/api/products/${productId}/reviews`);

        dispatch({
            type: PRODUCT_REVIEW_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
