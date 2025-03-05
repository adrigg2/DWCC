"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if (!cart.some(element => element.id === product.id)) {
            setCart([...cart, {
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                categoria: product.categoria,
                descuento: product.descuento,
                cantidad: 0,
            }])
        }

        setCart(cart.map(item => 
            item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
    }

    const removeOneFromCart = (product) => {
        setCart(cart.map(item => 
            item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
        ));

        if (cart.find(element => element.id === product.id).cantidad <= 0) {
            removeFromCart(product);
        }
    }

    const removeFromCart = (product) => {
        setCart(cart.filter(element => element.id !== product.id));
    }

    const emptyCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeOneFromCart, removeFromCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
