import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';

function ItemListContainer({ items }) {
  let { categoria } = useParams();
  const filteredItems = items.filter(item => categoria ? item.category === categoria : true);
  
  return (
    <div className="container">
      <div className="columns is-multiline">
        {filteredItems.map(item => (
          <div className="column is-one-third" key={item.id}>
            <ProfileCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;