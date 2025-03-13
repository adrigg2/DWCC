"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/cartContext";
import { db } from "@/js/api";
import Image from "next/image";

export default function ArticuloPage({ params }) {
    const [articulo, setArticulo] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        getArticulo();
    }, []);

    const getArticulo = async () => {
        const { articuloId } = await params;
        console.log(articuloId);
        if (articuloId) {
            db.get(`/products/${articuloId}`)
                .then(data => setArticulo(data.data))
                .catch(error => console.error(error));
        }
    }

    if (!articulo) {
        return <div>Cargando...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <div className="flex justify-center">
                    <Image 
                        src={`/api/image/${articulo.id}.${articulo.imageExtension}`} 
                        width={600} 
                        height={800} 
                        alt={articulo.nombre} 
                        className="w-full max-w-lg object-cover rounded-lg"
                    />
                </div>

                <div className="flex flex-col justify-center space-y-4 text-gray-800 dark:text-gray-200">
                    <h1 className="text-3xl font-bold">{articulo.nombre}</h1>

                    <p className="text-lg text-gray-600 dark:text-gray-400">{articulo.descripcion}</p>

                    <div className="flex items-center space-x-4">
                        {articulo.descuento > 0 ? (
                            <>
                                <p className="text-red-500 text-2xl font-semibold">
                                    {(articulo.precio - (articulo.precio * articulo.descuento) / 100).toFixed(2)}€
                                </p>
                                <p className="text-gray-500 text-lg line-through">{(articulo.precio * 100 / 100).toFixed(2)}€</p>
                                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                    -{articulo.descuento}%
                                </span>
                            </>
                        ) : (
                            <p className="text-2xl font-semibold">{(articulo.precio * 100 / 100).toFixed(2)}€</p>
                        )}
                    </div>

                    <p className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 inline-block rounded">
                        {articulo.categoria.name}
                    </p>

                    {articulo.etiquetas?.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Etiquetas:</span>{" "}
                            {articulo.etiquetas.map(e => (
                                <span key={e.id} className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold px-2 py-1 rounded m-1">
                                    {e.name}
                                </span>
                            ))}
                        </p>
                    )}

                    {articulo.generos?.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Géneros:</span>{" "}
                            {articulo.generos.map(g => (
                                <span key={g.id} className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded m-1">
                                    {g.name}
                                </span>
                            ))}
                        </p>
                    )}

                    <div className="flex space-x-4 mt-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300" onClick={() => addToCart(articulo)}>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}