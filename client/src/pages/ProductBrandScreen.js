import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductList from '../components/ProductList';

import { getProducts } from '../redux/actions/productActions';

const ProductBrandScreen = ({ match }) => {
    const dispatch = useDispatch();
    const brand = match.params.brand;
    const [firstLoad, setFirstLoad] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const productList = useSelector((state) => state.productList);
    const { loading, error, page, pages } = productList;

    useEffect(() => {
        dispatch(getProducts(pageNumber, brand));
    }, [dispatch, pageNumber, brand]);

    const loadMore = () => {
        setPageNumber(pageNumber + 1);
        setFirstLoad(false);
    };

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active className="text-capitalize">
                    {brand}
                </Breadcrumb.Item>
            </Breadcrumb>

            {loading && firstLoad ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Fragment>
                    <ProductList />
                    <div className="product__btn">
                        {page < pages && (
                            <div className="btn btn-outline-dark" onClick={loadMore}>
                                Load More
                            </div>
                        )}
                    </div>
                </Fragment>
            )}
        </Container>
    );
};

export default ProductBrandScreen;
