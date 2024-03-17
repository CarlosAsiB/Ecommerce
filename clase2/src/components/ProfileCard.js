import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import searchImages from '../Api';

function ProfileCard({ item }) {
    const [imageUrl, setImageUrl] = useState('');
    const { addItem, removeItem, isInCart } = useContext(CartContext);

    useEffect(() => {
        const fetchImage = async () => {
            const images = await searchImages(item.name);
            if (images.length > 0) {
                setImageUrl(images[0].urls.small);
            }
        };

        fetchImage();
    }, [item.name]);

    return (
        <div className="card">
            <div className="card-image">
                {imageUrl && (
                    <figure className="image">
                        <img src={imageUrl} alt={item.name} />
                    </figure>
                )}
            </div>
            <div className="card-content">
                <p className="title is-4">{item.name}</p>
                <p className="subtitle is-6">{item.description}</p>
                <p className="subtitle is-6">${item.price}</p>
                <Link to={`/item/${item.id}`} className="Details">View Details</Link>
                <div>
                <button className="button is-add-to-cart" onClick={() => addItem(item, 1)}>Add to Cart</button>
                    {isInCart(item.id) && (
                        <button className="button is-remove-from-cart" onClick={() => removeItem(item.id)}>Remove from Cart</button>

                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
