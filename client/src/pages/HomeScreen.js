import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Product from '../components/Product';

import { getProducts, resetProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [firstLoad, setFirstLoad] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(getProducts(pageNumber));
    }, [dispatch, pageNumber]);

    useLayoutEffect(() => {
        return () => {
            dispatch(resetProducts());
        };
    }, [dispatch]);

    const loadMore = () => {
        setPageNumber(pageNumber + 1);
        setFirstLoad(false);
    };

    return loading && firstLoad ? (
        <Loader />
    ) : (
        <div className="products-container">
            <div className="products">
                {products.map((product) => (
                    <Product product={product} key={product._id} />
                ))}
            </div>
            <div className="products__btn-container">
                <button onClick={loadMore} className="btn btn--round text-uppercase">
                    Load More
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;
