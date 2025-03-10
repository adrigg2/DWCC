"use client";

import { useCart } from "@/context/cartContext";
import Image from "next/image";

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
        <div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-3">Imagen</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Precio</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Descuento</th>
                        <th className="p-3">Total/unidad</th>
                        <th className="p-3">Cantidad</th>
                        <th className="p-3">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    { cart.map((element) => (
                        <tr key={element.id} className="border-b hover:bg-gray-100 text-black">
                            <td className="p-3"><Image src={`/api/image/${element.id}.${element.imageExtension}`} width={100} height={100} alt={element.nombre}></Image></td>
                            <td className="p-3">{element.nombre}</td>
                            <td className="p-3">{(Math.round(element.precio * 100) / 100).toFixed(2)}€</td>
                            <td className="p-3">{element.categoria.name}</td>
                            <td className="p-3">{element.descuento}%</td>
                            <td className="p-3">{(Math.round(element.precio * (1 - (element.descuento / 100)) * 100) / 100).toFixed(2)}€</td>
                            <td className="p-3">
                                <button className="w-1/4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition mr-2" onClick={() => removeOneFromCart(element)}>{"<"}</button>
                                {element.cantidad}
                                <button className="w-1/4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition ml-2" onClick={() => addToCart(element)}>{">"}</button>
                            </td>
                            <td className="p-3">{(Math.round((element.precio * (1 - (element.descuento / 100))) * element.cantidad * 100) / 100).toFixed(2)}€</td>
                            <td className="p-3"><button className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition" onClick={() => removeFromCart(element)}>Eliminar del carrito</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            Total: {(Math.round(calcularTotal() * 100) / 100).toFixed(2)}€
            <button className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition" onClick={() => emptyCart()}>Vaciar carrito</button>
        </div>
    )
}

export default withAuth(Cart, ["admin", "user"]);
