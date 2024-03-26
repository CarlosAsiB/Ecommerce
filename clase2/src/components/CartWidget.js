import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';    
function CartWidget({ img }) {
    const { cart, getTotalPrice } = useContext(CartContext);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = getTotalPrice();
    console.log("Total Price: ", getTotalPrice()); 


    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={img} className="carritoImg" alt="Cart" />
            <Link to="/checkout" className="checkout-link">Go to Checkout</Link>

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
