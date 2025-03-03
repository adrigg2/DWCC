"use client";

import Articulo from "@/components/articulo";
import { useEffect, useState } from "react";
import { db } from "@/js/api";

export default function Articulos() {
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        db.get(`/products`)
            .then((response) => {
                setArticulos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {articulos.map(articulo => (
                <Articulo articulo={articulo} key={articulo.id}></Articulo>
            ))}
        </div>
    )
}