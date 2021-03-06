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
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from '../constants/productConstants';
import { setAlert } from './alertActions';

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

export const getAllProducts =
    (pageNumber = '', productName = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_ALL_REQUEST });

            const { data } = await axios.get(
                `/api/products?pageNumber=${pageNumber}&productName=${productName}`,
            );

            dispatch({
                type: PRODUCT_LIST_ALL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_ALL_FAIL,
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

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/products`, product, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/products/${product._id}`, product, config);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
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

        dispatch(setAlert('Review Submited', 'success'));
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

export const getAllReviewsByProductId = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_LIST_ALL_REQUEST });

        const { data } = await axios.get(`/api/products/${productId}/reviews/all`);

        dispatch({
            type: PRODUCT_REVIEW_LIST_ALL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_LIST_ALL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getReviewsByProductId =
    (productId, pageNumber = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_REVIEW_LIST_REQUEST });

            const { data } = await axios.get(
                `/api/products/${productId}/reviews?pageNumber=${pageNumber}`,
            );

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
