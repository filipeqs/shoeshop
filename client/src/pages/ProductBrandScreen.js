import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductList from '../components/ProductList';
import ProductJumbotron from '../components/ProductJumbotron';

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
        <div className="wrapper">
            <Container>
                <Breadcrumb>
                    <LinkContainer to="/">
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active className="text-capitalize">
                        {brand}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            {loading && firstLoad ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Fragment>
                    <ProductJumbotron title={brand} text="Mens" />
                    <Container>
                        <ProductList />
                        <div className="product__btn">
                            {page < pages && (
                                <div className="btn btn-outline-dark" onClick={loadMore}>
                                    Load More
                                </div>
                            )}
                        </div>
                    </Container>
                </Fragment>
            )}
        </div>
    );
};

export default ProductBrandScreen;
