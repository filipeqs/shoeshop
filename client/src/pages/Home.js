import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../redux/actions/productActions';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    });

    return <div>Home</div>;
};

export default Home;
