"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);

    const addToCart = (product) => {
        let newCart = [...cart];
        if (!newCart.some(element => element.id === product.id)) {
            console.log("Articulo no en el carrito")
            newCart = [...newCart, {
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                categoria: product.categoria,
                descuento: product.descuento,
                imageExtension: product.imageExtension,
                cantidad: 0,
            }];
        }

        newCart = newCart.map(item => 
            item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
        saveCart(newCart);

        console.log(cart);
    }

    const removeOneFromCart = (product) => {
        let newCart = cart.map(item => 
            item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        
        if (newCart.find(element => element.id === product.id).cantidad <= 0) {
            removeFromCart(product);
            return;
        }
        saveCart(newCart);
    }

    const removeFromCart = (product) => {
        saveCart(cart.filter(element => element.id !== product.id));
    }

    const emptyCart = () => {
        saveCart([]);
    }

    const saveCart = (cart) => {
        setCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeOneFromCart, removeFromCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
