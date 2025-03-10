"use client";

import Articulo from "@/components/articulo";
import { useEffect, useState } from "react";
import { db } from "@/js/api";
import Filtro from "@/components/filtro";

export default function Articulos() {
    const [articulos, setArticulos] = useState([]);
    const [filter, setFilter] = useState({
        categoria: null,
        etiquetas: [],
        generos: [],
        search: "",
    });

    useEffect(() => {
        db.get(`/products`)
            .then((response) => {
                setArticulos(filterProducts(response.data));
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [filter]);

    const filterProducts = (articulos) => {
        if (filter.categoria) {
            articulos = articulos.filter(articulo => articulo.categoria.id === filter.categoria.id);
        }

        if (filter.etiquetas.length > 0) {
            articulos = articulos.filter(articulo =>
                filter.etiquetas.every(selected =>
                    articulo.etiquetas.some(etiqueta => etiqueta.id === selected.id)
                )
            );
        }

        if (filter.generos.length > 0) {
            articulos = articulos.filter(articulo =>
                filter.generos.every(selected =>
                    articulo.generos.some(genero => genero.id === selected.id)
                )
            );
        }

        if (filter.search) {
            articulos = articulos.filter(articulo => articulo.nombre.toLowerCase().includes(filter.search.toLowerCase()));
        }

        return articulos;
    }
    
    const updateFilter = (value, filter) => {
        setFilter (prev => ({
            ...prev,
            [filter]: value
        }));
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <Filtro updateFilter={updateFilter}></Filtro>
            {articulos.map(articulo => (
                <Articulo articulo={articulo} key={articulo.id}></Articulo>
            ))}
        </div>
    )
}