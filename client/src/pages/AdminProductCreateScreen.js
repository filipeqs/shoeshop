import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { createProduct } from '../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants';
import ProductForm from '../components/ProductForm';

const AdminProductCreateScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, success, product } = productCreate;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else if (success && product) history.push(`/product/${product._id}`);
    }, [dispatch, history, userInfo, success, product]);

    useEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_CREATE_RESET });
        };
    }, [dispatch]);

    const submitHandler = (product) => {
        dispatch(createProduct(product));
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
                <Breadcrumb.Item active>Create</Breadcrumb.Item>
            </Breadcrumb>
            <ProductForm error={error} loading={loading} submitHandler={submitHandler} />
        </Container>
    );
};

export default AdminProductCreateScreen;
