import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Alert from '../components/Alert';

const CartScreen = () => {
    const { cartItems } = useSelector((state) => state.cart);
    console.log(cartItems);

    return cartItems.length === 0 ? (
        <Alert variant="info">You cart is empty</Alert>
    ) : (
        <div className="cart-container">
            <h1 className="cart__title mb-3">Shopping Bag</h1>
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th className="table__head-item table__head-item--wide">Item</th>
                        <th className="table__head-item">Quanty</th>
                        <th className="table__head-item">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {cartItems.map((item) => (
                        <tr key={item._id} className="table__body-row">
                            <td className="table__body-item table__item-container">
                                <div className="table__item-image-container">
                                    <Link to={`product/${item._id}`}>
                                        <img
                                            className="table__item-image"
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    </Link>
                                </div>
                                <div className="table__item-text">
                                    <h3 className="header-secondary">{item.name}</h3>
                                    <div>Size: {item.selected.size}</div>
                                    <div>${item.price}</div>
                                </div>
                            </td>
                            <td className="table__body-item table__item-qty">
                                {item.selected.qty}
                            </td>
                            <td className="table__body-item table__item-subtotal">
                                ${Number(item.selected.qty) * Number(item.price)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="cart__btn-checkout btn btn__black btn--round mt-1">Checkout</button>
        </div>
    );
};

export default CartScreen;
