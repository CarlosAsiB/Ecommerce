// NavBar.js
import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; 
import CartWidget from '../components/CartWidget';
import CarritoImg from ".././components/img/Carrito.png";

function NavBar() {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to='/'>All Drinks</Link>
        <Link className="navbar-item" to='/category/hot'>Hot Drinks</Link>
        <Link className="navbar-item" to='/category/cold'>Cold Drinks</Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <CartWidget img={CarritoImg} />
          {itemCount > 0 && <span>{itemCount}</span>}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
