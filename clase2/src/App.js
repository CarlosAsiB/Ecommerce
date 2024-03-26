import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import './styles.css';
import { CartProvider } from './context/CartContext';
import { db } from './components/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfimation';


const itemsCollectionRef = collection(db, "Items");

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItemList = async () => {
      try {
        const data = await getDocs(itemsCollectionRef);
        const itemsArray = data.docs.map(doc => {
          const item = doc.data();
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price
          };
        });
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    getItemList();
  }, []); 

  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer items={items} />} />
            <Route path="/category/:categoria" element={<ItemListContainer items={items} />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer items={items} />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );  
}

export default App;
