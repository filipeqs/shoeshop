import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product }) => {
    const [hovered, setHovered] = useState(false)

    const { _id, name, price, brand, image } = product

    const toggleHover = () => setHovered(!hovered)

    return (
        <div className="product-container">
            <Link 
                to={`/product/${_id}`} 
                className="product__link" 
                onMouseEnter={toggleHover} 
                onMouseLeave={toggleHover}
            >
                <div className="product__img-container">
                    <img className="product__img" src={image} alt={name} />
                </div>
                <div className="mt-05 product__description">
                    {!hovered && 
                        <div className="product__top">
                            <h3 className="header-secondary">
                                <span className="product__name">{name}</span>
                                <span className="product__price">${price}</span>
                            </h3>
                            <p className="product__brand mt-05">{brand}</p>
                        </div>}
                    {hovered && <p className="product__action mt-1"><FontAwesomeIcon icon={faShoppingCart} /> Buy</p>}
                </div>
            </Link>
        </div>
    );
};

export default Product;
