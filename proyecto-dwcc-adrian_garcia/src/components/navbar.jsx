"use client";

import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import Link from "next/link";


export default function Navbar() {
    const { user, logout } = useAuth();
    const { cart, emptyCart } = useCart();

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow-md p-4">
            <Link href="/" className="hover:underline">
                <h1 className="text-2xl font-bold">Game</h1>
            </Link>
            <ul className="flex gap-4">
                <li>
                    <Link href="/" className="hover:underline">Inicio</Link>
                </li>
                <li>
                    <Link href="/articulos" className="hover:underline">Tienda</Link>
                </li>
                {
                    user ? (
                        <>
                            {user.rol.name === "admin" &&
                            <li>
                                <Link href="/gestion" className="hover:underline">Gestión</Link>
                            </li>
                            }
                            <li>
                                <Link href="/cart" className="hover:underline"><i className="bi bi-cart4"></i>{cart.length}</Link>
                            </li>
                            <li>
                                <button onClick={() => {emptyCart(); logout();}} className="hover:underline">Cerrar sesión</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/registro" className="hover:underline">Registro</Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:underline">Iniciar sesión</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
}