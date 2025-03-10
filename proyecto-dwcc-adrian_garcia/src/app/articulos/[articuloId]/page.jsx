"use client";

import { useEffect, useState } from "react";
import { db } from "@/js/api";
import Image from "next/image";

export default function ArticuloPage({ params }) {
    const [articulo, setArticulo] = useState(null);

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
        <div>
            <h1>{articulo.nombre}</h1>
            <p>{articulo.descripcion}</p>
            <p>{articulo.precio}</p>
            <p>{articulo.categoria.name}</p>
            <p>{articulo.descuento}</p>
            <p>Etiquetas: {articulo.etiquetas?.map(e => e.name).join(", ")}</p>
            {articulo.generos?.length > 0 &&
            <p>Géneros: {articulo.generos?.map(g => g.name).join(", ")}</p>}
            <Image src={`/api/image/${articulo.id}.${articulo.imageExtension}`} width={500} height={1000} alt={articulo.nombre}></Image>
        </div>
    )
}