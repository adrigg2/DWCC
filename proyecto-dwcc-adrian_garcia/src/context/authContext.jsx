"use client";

import { db } from '@/js/api';
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const login = async(email, password) => {
        const users = await db.get('/users');
        const user = users.data.find(user => user.email === email);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.password !== password) {
            throw new Error('Contraseña incorrecta');
        }

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
        setLoaded(true);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loaded, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
