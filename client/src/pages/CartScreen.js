import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '../components/Alert';

const CartScreen = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return cartItems.length === 0 ? (
        <Alert variant="info">You cart is empty</Alert>
    ) : (
        <div>
            <h1>Shopping Bag</h1>
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th className="table__head-item table__head-item--wide">Item</th>
                        <th className="table__head-item">Quanty</th>
                        <th className="table__head-item">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    <tr>
                        <td className="table__body-item table__image">Item</td>
                        <td className="table__body-item table__qty">Item</td>
                        <td className="table__body-item table__subtotal">Item</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CartScreen;
