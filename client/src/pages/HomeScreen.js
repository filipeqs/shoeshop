import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';

import { getProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : (
        <div className="products-container">
            {products.map((product) => (
                <div key={product._id} className="product-container">
                    <a href="#/" className="product__img-link">
                        <img className="product__img" src={product.image} alt={product.name} />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default HomeScreen;
