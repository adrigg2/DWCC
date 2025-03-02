"use client";
import withAuth from "@/components/security/withAuth";
import Link from "next/link";

const Gestion = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Panel de Gestión</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/gestion/articulos" className="w-60 bg-blue-500 text-white text-center font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
                        Gestionar Artículos
                    </Link>
                    <Link href="/gestion/categorias" className="w-60 bg-blue-500 text-white text-center font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
                        Gestionar Categorías
                    </Link>
                    <Link href="/gestion/etiquetas" className="w-60 bg-blue-500 text-white text-center font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
                        Gestionar Etiquetas
                    </Link>
                    <Link href="/gestion/generos" className="w-60 bg-blue-500 text-white text-center font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
                        Gestionar Géneros
                    </Link>
            </div>
        </div>
    )
}

export default withAuth(Gestion, ["admin"]);
