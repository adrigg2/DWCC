"use client";
import { useEffect, useState } from "react";
import { db } from "@/js/api";
import withAuth from "@/components/security/withAuth";
import TablaArticulos from "@/components/gestion/articulos/tablaArticulos";
import FormArticulos from "@/components/gestion/articulos/formArticulos";

const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [filter, setFilter] = useState({
        categoria: null,
        etiquetas: [],
        generos: [],
    })

    useEffect(() => {
        db.get("/categorias")
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        db.get("/etiquetas")
            .then((response) => {
                setEtiquetas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        db.get("/generos")
            .then((response) => {
                setGeneros(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        getArticulos();
    }, [page, perPage, filter]);

    const filtroArticulos = (articulos) => {
        console.log(filter);

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

        return articulos;
    }

    const getArticulos = () => {
        db.get(`/products`)
            .then(async (response) => {
                const articulosFiltrados = filtroArticulos(await response.data);
                setArticulos(articulosFiltrados.slice((page - 1) * perPage, (page - 1) * perPage + perPage));
                setTotalPages(Math.ceil(response.data.length / perPage));
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const editProduct = (id) => {
        setEditing(true);
        setEditId(id);
    }

    const setFilters = (value, filter) => {
        console.log(filter);
        setFilter(prev => ({
            ...prev,
            [filter]: value,
        }));
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Artículos</h1>
            <FormArticulos updateArticulos={getArticulos} editing={editing} editId={editId} categorias={categorias} etiquetas={etiquetas} generos={generos}></FormArticulos>
            <TablaArticulos articulos={articulos} page={page} perPage={perPage} totalPages={totalPages} setPage={setPage} setPerPage={setPerPage} updateArticulos={getArticulos} editProduct={editProduct} categorias={categorias} etiquetas={etiquetas} generos={generos} filter={filter} setFilter={setFilters}></TablaArticulos>
        </div>
    );
}

export default withAuth(Articulos, ["admin"]);
