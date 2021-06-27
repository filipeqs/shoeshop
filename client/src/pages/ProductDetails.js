import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Alert from '../components/Alert';
import Loader from '../components/Loader';

import { getProductById } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';

const ProductDetails = ({ match, history }) => {
    const [selected, setSelected] = useState({ qty: 0, _id: '' });
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const { name, image, price, brand, stock } = product;

    useEffect(() => {
        dispatch(getProductById(match.params.id));
    }, [match.params.id, dispatch]);

    const handleSelected = (e) => {
        const newSelected = stock.filter((value) => value._id === e.target.value)[0];
        setSelected({ ...newSelected, qty: 0 });
    };

    const handleQty = (e) => {
        setSelected({ ...selected, qty: e.target.value });
    };

    const handleAddToCard = () => {
        const productToAdd = {
            ...product,
            qty: selected.qty,
            count: selected.count,
            size: selected.size,
            selectedId: selected._id,
        };

        dispatch(addToCart(productToAdd));
        history.push('/cart');
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Alert variant="danger">{error}</Alert>
    ) : (
        <div className="product-details-container">
            <div className="product-details-wrapper">
                <div className="product-details__image-container">
                    <img src={image} alt={name} className="product-details__image" />
                </div>
                <div className="product-details__specifications">
                    <h3 className="product-details__header header-primary">
                        <span className="product-details__name">{name}</span>
                        <span className="product-details__price">${price}</span>
                    </h3>
                    <p className="product-details__brand mt-05">{brand}</p>
                    <select
                        value={selected._id}
                        onChange={handleSelected}
                        className="product-details__size mt-3"
                    >
                        <option value="" disabled defaultValue>
                            Select a size
                        </option>
                        {stock.map(({ _id, size }) => (
                            <option key={_id} value={_id}>
                                {size}
                            </option>
                        ))}
                    </select>
                    {selected.size && (
                        <p className="product-details__stock mt-1">Stock: {selected.count}</p>
                    )}
                    {selected.count && selected.count > 0 && (
                        <select
                            value={selected.qty}
                            onChange={handleQty}
                            disabled={selected.count <= 0}
                            className="product-details__qty mt-1"
                        >
                            <option value={0} disabled defaultValue>
                                Select quantity
                            </option>
                            {[...Array(selected.count).keys()].map((x) => (
                                <option key={x + 1} value={x + 1} defaultValue={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    )}
                    <button
                        className="btn btn__black btn--round mt-2"
                        disabled={selected.qty === 0}
                        onClick={handleAddToCard}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
