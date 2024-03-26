import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import searchImages from '../Api';

function ProfileCard({ item }) {
    const { addItem, removeItem, cart } = useContext(CartContext);
    const [imageUrl, setImageUrl] = useState('');
    const [quantity, setQuantity] = useState(cart.find(cartItem => cartItem.item.id === item.id)?.quantity || 0);

    useEffect(() => {
        const fetchImage = async () => {
            const images = await searchImages(item.name);
            if (images.length > 0) {
                setImageUrl(images[0].urls.small);
            }
        };

        fetchImage();
    }, [item.name]);

    useEffect(() => {
        const cartItem = cart.find(cartItem => cartItem.item.id === item.id);
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [cart, item.id]);

    const updateQuantity = (newQuantity) => {
        setQuantity(newQuantity);
        if (newQuantity > 0) {
            addItem(item, newQuantity - (cart.find(cartItem => cartItem.item.id === item.id)?.quantity || 0));
        } else if (newQuantity === 0) {
            removeItem(item.id);
        }
    };

    const incrementQuantity = () => {
        updateQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        updateQuantity(Math.max(0, quantity - 1));
    };

    return (
        <div className="card">
            <div className="card-image">
                {imageUrl && (
                    <img src={imageUrl} alt={item.name} />
                )}
            </div>
            <div className="card-content">
                <p className="title is-4">{item.name}</p>
                <p className="subtitle is-6">{item.description}</p>
                <p className="subtitle is-6">${item.price}</p>
                <Link to={`/item/${item.id}`} className="Details">View Details</Link>
                <div className="quantity-control">
                    <button onClick={decrementQuantity} disabled={quantity <= 0} className="quantity-btn decrement-btn">-</button>
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => updateQuantity(Math.max(0, parseInt(e.target.value, 10)))}
                            min="0" 
                            className="quantity-input"
                         />
                <button onClick={incrementQuantity} className="quantity-btn increment-btn">+</button>
</div>

            </div>
        </div>
    );
}

export default ProfileCard;
