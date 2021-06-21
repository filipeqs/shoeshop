import React from 'react';

const Product = ({ product }) => {
    return (
        <div key={product._id} className="product-container">
            <a href="#/" className="product__img-link">
                <img className="product__img" src={product.image} alt={product.name} />
            </a>
        </div>
    );
};

export default Product;
