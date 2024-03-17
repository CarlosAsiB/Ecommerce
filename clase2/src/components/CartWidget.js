import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartWidget({ img }) {
    const { cart, getTotalPrice } = useContext(CartContext);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = getTotalPrice();
    console.log("Total Price: ", getTotalPrice()); 


    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={img} className="carritoImg" alt="Cart" />
            {cart.length > 0 && (
                <>
                    <span>({totalItems} items)</span>
                    <span> - ${totalPrice ? totalPrice.toFixed(2) : '0.00'}</span>
                </>
            )}
        </div>
    );
}

export default CartWidget;
