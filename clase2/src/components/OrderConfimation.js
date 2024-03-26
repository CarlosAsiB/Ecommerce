// OrderConfirmation.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function OrderConfirmation() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            const docRef = doc(db, "Orders", orderId);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setOrder(docSnap.data());
                } else {
                    setError("Order not found");
                }
            } catch (err) {
                setError("Error fetching order");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <p>Loading order details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
<div className='order-confirmation'>
    <h1>Order Confirmation</h1>
    {order && (
        <div>
            <p>Order ID: {orderId}</p>
            <p>Name: {order.customer.name}</p>
            <p>Address: {order.customer.address}</p>
            <p>Email: {order.customer.email}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <h2>Items:</h2>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index}>{item.item.name} - Quantity: {item.quantity}</li>
                ))}
            </ul>
        </div>
    )}
</div>

    );
}

export default OrderConfirmation;
