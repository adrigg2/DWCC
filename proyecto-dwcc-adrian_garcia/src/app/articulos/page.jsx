"use client";

import Articulo from "@/components/articulo";
import { useState } from "react";
import Filtro from "@/components/filtro";

export default function Articulos() {
    const [articulos, setArticulos] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    
    const updateTotalPages = (length) => {
        setTotalPages(length);
        if (page > length) {
            setPage(length);
        }
    }

    return (
        <div className="relative flex bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="fixed left-0 top-16 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4 hidden md:block">
                <Filtro 
                page={page} 
                perPage={perPage} 
                setPerPage={setPerPage} 
                setTotalPages={updateTotalPages} 
                setArticulos={setArticulos} 
                articulos={articulos} 
                />
            </div>

            <div className={`ml-0 md:ml-64 p-4 w-full`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {articulos.map((articulo) => (
                <Articulo articulo={articulo} key={articulo.id} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-4">
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page <= 1} 
                    className={`py-2 px-4 rounded-lg transition text-white 
                        ${page <= 1 
                        ? "bg-blue-400 dark:bg-blue-600 opacity-50 cursor-not-allowed" 
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"}`}
                >
                    Anterior
                </button>

                <button 
                    onClick={() => setPage(page + 1)} 
                    disabled={page >= totalPages} 
                    className={`py-2 px-4 rounded-lg transition text-white 
                        ${page >= totalPages 
                        ? "bg-blue-400 dark:bg-blue-600 opacity-50 cursor-not-allowed" 
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"}`}
                >
                    Siguiente
                </button>
                </div>
            )}
            </div>
        </div>
    )
}