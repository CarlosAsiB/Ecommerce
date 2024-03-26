import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import searchImages from '../Api';
import { db } from './config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);  // Add a state for quantity
  const { addItem, removeItem, isInCart } = useContext(CartContext);

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, "Items", itemId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const itemData = docSnap.data();
          setItem({ ...itemData, id: itemId });

          searchImages(itemData.name).then(images => {
            if (images.length > 0) {
              setImage(images[0].urls.small);
            }
          }).catch(error => {
            console.error('Error fetching images:', error);
          });
        } else {
          setItem(undefined);
        }
      } catch (error) {
        console.error('Error fetching item from Firebase:', error);
        setItem(undefined);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, parseInt(event.target.value, 10)));
  };

  const handleAddToCart = () => {
    addItem(item, quantity);
  };

  if (item === undefined) {
    return <p>404 Item not found.</p>;
  }

  if (item === null) {
    return <p>Loading item...</p>;
  }

  return (
    <div className="item-detail">
    {image && <img src={image} alt={item.name} />}
    <h2>{item.name}</h2>
    <p>{item.description}</p>
    <p>${item.price}</p>
    <div>
        <input 
          type="number" 
          value={quantity} 
          onChange={handleQuantityChange} 
          min="1"
          style={{ marginRight: '10px' }}
        />
        <button className="button is-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        {isInCart(item.id) && (
          <button className="button is-remove-from-cart" onClick={() => removeItem(item.id)}>Remove from Cart</button>
        )}
    </div>
</div>

  );
}

export default ItemDetailContainer;
