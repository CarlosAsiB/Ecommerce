import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const isInCart = (id) => cart.some(cartItem => cartItem.item.id === id);

    const getTotalPrice = () => {
        console.log(cart); 
        return cart.reduce((total, { item, quantity }) => {
            console.log(`Price: ${item.price}, Quantity: ${quantity}`); 
            const itemTotal = Number(item.price) * quantity;
            console.log(`Item Total: ${itemTotal}`); 
            return total + itemTotal; 
        }, 0);
    };
    
    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            const newCart = cart.map(cartItem => 
                cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
            );
            setCart(newCart);
        } else {
            setCart(prevCart => [...prevCart, { item, quantity }]);
        }
    };

    const removeItem = (itemId) => {
        setCart(cart.reduce((newCart, cartItem) => {
            if (cartItem.item.id === itemId) {
                if (cartItem.quantity > 1) {
                    return [...newCart, { ...cartItem, quantity: cartItem.quantity - 1 }];
                }
                return newCart;
            } else {
                return [...newCart, cartItem];
            }
        }, []));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, isInCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
