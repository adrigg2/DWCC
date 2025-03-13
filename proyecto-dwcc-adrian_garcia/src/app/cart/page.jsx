"use client";

import { useCart } from "@/context/cartContext";
import withAuth from "@/components/security/withAuth";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
    const { cart, addToCart, removeOneFromCart, removeFromCart, emptyCart } = useCart();

    const calcularTotal = () => {
        let total = 0;
        cart.forEach(element => {
            total += element.cantidad * (element.precio * (1 - (element.descuento / 100)));
        });
        return total;
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <table className="w-full border-collapse overflow-hidden rounded-lg">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="p-3">Imagen</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Precio</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Descuento</th>
                        <th className="p-3">Total/unidad</th>
                        <th className="p-3">Cantidad</th>
                        <th className="p-3">Subtotal</th>
                        <th className="p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((articulo) => (
                        <tr key={articulo.id} className="border-b border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white">
                            <td className="p-3">
                                <Image 
                                    src={`/api/image/${articulo.id}.${articulo.imageExtension}`} 
                                    width={80} 
                                    height={80} 
                                    alt={articulo.nombre} 
                                    className="rounded-lg shadow-sm"
                                />
                            </td>

                            <td className="p-3 font-medium">{articulo.nombre}</td>

                            <td className="p-3 text-gray-700 dark:text-gray-300">
                                {parseFloat(articulo.precio).toFixed(2)}€
                            </td>

                            <td className="p-3">{articulo.categoria.name}</td>

                            <td className="p-3 text-red-500 font-semibold">{articulo.descuento}%</td>

                            <td className="p-3 text-green-600 font-semibold">
                                {(articulo.precio * (1 - articulo.descuento / 100)).toFixed(2)}€
                            </td>

                            <td className="p-10 flex items-center space-x-2">
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition text-sm"
                                    onClick={() => removeOneFromCart(articulo)}
                                >
                                    {"<"}
                                </button>
                                <span className="font-semibold text-lg">{articulo.cantidad}</span>
                                <button 
                                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition text-sm"
                                    onClick={() => addToCart(articulo)}
                                >
                                    {">"}
                                </button>
                            </td>

                            <td className="p-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {((articulo.precio * (1 - articulo.descuento / 100)) * articulo.cantidad).toFixed(2)}€
                            </td>

                            <td className="p-3 flex gap-2">
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-1/2"
                                    onClick={() => removeFromCart(articulo)}
                                >
                                    Eliminar
                                </button>

                                <Link href={`/articulos/${articulo.id}`} 
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-1/2 text-center"
                                >
                                    Ver producto
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col sm:flex-row justify-between items-center text-lg font-semibold">
                <p>Total: <span className="text-green-600">{(Math.round(calcularTotal() * 100) / 100).toFixed(2)}€</span></p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button 
                    className="w-full sm:w-1/2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                    onClick={() => emptyCart()}
                >
                    Vaciar carrito
                </button>

                <button 
                    className="w-full sm:w-1/2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                    onClick={() => console.log("Comprar")}
                >
                    Proceder al pago
                </button>
            </div>
        </div>
    )
}

export default withAuth(Cart, ["admin", "user"]);
