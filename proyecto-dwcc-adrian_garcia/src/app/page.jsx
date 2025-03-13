"use client";

import { db } from "@/js/api";
import { useState, useEffect } from "react";
import Articulo from "@/components/articulo";
import Link from "next/link";

export default function Home() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    db.get("/products")
      .then((response) => {
        const articulosDestacados = getDestacados(response.data);
        setArticulos(articulosDestacados);
      })
      .catch((error) => {
        console.error(error);
      }
      );
  }, []);

  const getDestacados = (articulos) => {
    let articulosDestacados = [];
    while (articulosDestacados.length < 4) {
      let articulo = articulos[Math.floor(Math.random()*articulos.length)];
      if (articulosDestacados.includes(articulo)) {
        continue;
      }

      articulosDestacados.push(articulo);
    }
    return articulosDestacados;
  }

  return (
    <div className="container mx-auto p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Productos Destacados
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articulos.map((articulo) => (
          <Articulo key={articulo.id} articulo={articulo} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/articulos"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
          text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Proceder a la tienda
        </Link>
      </div>
    </div>
  );
}
