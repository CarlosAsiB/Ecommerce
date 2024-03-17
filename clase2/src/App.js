import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import './styles.css';
import { CartProvider } from './context/CartContext';



const items = [
  { id: 1, name: 'Cortado', description: 'Esto es un Cortado, nivel de cafe medio', category: 'hot', price: 85, },
  { id: 2, name: 'Espresso', description: 'Esto es un Espresso, nivel de cafe alto', category: 'hot', price:80, },
  { id: 3, name: 'Latte', description: 'Esto es un Latte, nivel de cafe bajo', category: 'hot',  price:85, },
  { id: 4, name: 'Cappuccino', description: 'Esto es un Cappuccino, nivel de cafe medio', category: 'hot', price:90, },
  { id: 5, name: 'Iced Americano', description: 'Esto es un Iced Americano, nivel de cafe alto', category: 'cold', price: 90, },
  { id: 6, name: 'Iced Vanilla Latte', description: 'Esto es un Iced Vanilla Latte, nivel de cafe bajo', category: 'cold', price: 100, },
  { id: 7, name: 'Oreo Frappe', description: 'Esto es un Frappuchino de oreo, nivel de cafe medio', category: 'cold', price: 120, },
];



function App() {
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
        </Routes>
      </CartProvider>
      </BrowserRouter>
    </div>
  );  
}

export default App;
