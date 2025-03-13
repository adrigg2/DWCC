import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Articulo({ articulo }) {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-full">
            <Link href={`/articulos/${articulo.id}`} className="block">
                <div className="w-full h-48 flex justify-center items-center bg-gray-100 dark:bg-gray-700">
                    <Image 
                        src={`/api/image/${articulo.id}.${articulo.imageExtension}`} 
                        width={200} 
                        height={200} 
                        alt={articulo.nombre} 
                        className="object-cover max-h-40"
                    />

                {articulo.descuento > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{articulo.descuento}%
                    </span>
                )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{articulo.nombre}</h3>
                    <div className="flex items-center space-x-2">
                        {articulo.descuento > 0 ? (
                            <>
                                <p className="text-red-500 text-xl font-bold">
                                    {(articulo.precio - (articulo.precio * articulo.descuento) / 100).toFixed(2)}€
                                </p>
                                <p className="text-gray-500 text-lg line-through">{parseFloat(articulo.precio).toFixed(2)}€</p>
                            </>
                        ) : (
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-200">{parseFloat(articulo.precio).toFixed(2)}€</p>
                        )}
                    </div>

                    {articulo.plataforma !== "" && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{articulo.plataforma}</p>
                    )}
                </div>
            </Link>

            <div className="p-4 mt-auto">
                <button 
                    onClick={() => user ? addToCart(articulo) : router.replace(`/login?add=${articulo.id}`)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    )
}
