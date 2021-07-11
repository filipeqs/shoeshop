import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ProductForm from '../components/ProductForm';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { getProductById, updateProduct } from '../redux/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants';

const AdminProductEditScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const productId = match.params.id;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else if (success) history.push(`/product/${productId}`);
        else dispatch(getProductById(productId));
    }, [dispatch, history, userInfo, productId, success]);

    useEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_UPDATE_RESET });
        };
    }, [dispatch]);

    const submitHandler = (product) => {
        dispatch(updateProduct({ ...product, _id: productId }));
    };

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/admin">
                    <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                    <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <ProductForm
                    error={errorUpdate}
                    loading={loadingUpdate}
                    submitHandler={submitHandler}
                    product={product}
                    update={true}
                />
            )}
        </Container>
    );
};

export default AdminProductEditScreen;
