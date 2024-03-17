import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import searchImages from '../Api';

const items = [
  { id: 1, name: 'Cortado', description: 'Esto es un Cortado, nivel de cafe medio', category: 'hot', price: 85, },
  { id: 2, name: 'Espresso', description: 'Esto es un Espresso, nivel de cafe alto', category: 'hot', price:80, },
  { id: 3, name: 'Latte', description: 'Esto es un Latte, nivel de cafe bajo', category: 'hot',  price:85, },
  { id: 4, name: 'Cappuccino', description: 'Esto es un Cappuccino, nivel de cafe medio', category: 'hot', price:90, },
  { id: 5, name: 'Iced Americano', description: 'Esto es un Iced Americano, nivel de cafe alto', category: 'cold', price: 90, },
  { id: 6, name: 'Iced Vanilla Latte', description: 'Esto es un Iced Vanilla Latte, nivel de cafe bajo', category: 'cold', price: 100, },
  { id: 7, name: 'Oreo Frappe', description: 'Esto es un Frappuchino de oreo, nivel de cafe medio', category: 'cold', price: 120, },
];

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [image, setImage] = useState('');
  const { addItem, removeItem, isInCart } = useContext(CartContext);

  useEffect(() => {
    const parsedId = parseInt(itemId, 10);
    const foundItem = items.find(item => item.id === parsedId);
    setItem(foundItem);

    if (foundItem) {
      searchImages(foundItem.name).then(images => {
        if (images.length > 0) {
          setImage(images[0].urls.small);
        }
      }).catch(error => {
        console.error('Error fetching images:', error);
      });
    }
  }, [itemId]);

  if (!item) {
    return <p>404 Item not found.</p>;
  }

  return (
    <div>
      {image && <img src={image} alt={item.name} />}
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <div>
      <button className="button is-add-to-cart" onClick={() => addItem(item, 1)}>Add to Cart</button>
        {isInCart(item.id) && (
            <button className="button is-remove-from-cart" onClick={() => removeItem(item.id)}>Remove from Cart</button>
        )}
      </div>
    </div>
  );
}

export default ItemDetailContainer;
