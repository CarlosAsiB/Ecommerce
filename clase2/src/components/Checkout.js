
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { db } from './config/firebase';
import { collection, addDoc } from 'firebase/firestore';

function Checkout() {
    const navigate = useNavigate();
    const { cart, getTotalPrice, clearCart } = useContext(CartContext);
    const [customer, setCustomer] = useState({ name: '', address: '', email: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const order = {
            customer,
            items: cart,
            total: getTotalPrice(),
            date: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, "Orders"), order);
            clearCart();
            navigate(`/order-confirmation/${docRef.id}`);
        } catch (error) {
            console.error("Error adding order: ", error);
        }
    };

    return (
        <div className="checkout-form">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={customer.name} onChange={handleInputChange} required />
    
            <label>Address</label>
            <input type="text" name="address" value={customer.address} onChange={handleInputChange} required />
    
            <label>Email</label>
            <input type="email" name="email" value={customer.email} onChange={handleInputChange} required />
    
            <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
            <button type="submit">Place Order</button>
        </form>
    </div>
    
    );
}

export default Checkout;
