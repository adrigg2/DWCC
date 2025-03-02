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

    useEffect(() => {
        getArticulos();
    }, [page, perPage]);

    const getArticulos = () => {
        db.get(`/products?_page=${page}&_per_page=${perPage}`)
            .then((response) => {
                setArticulos(response.data.data);
                setTotalPages(response.data.pages);
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

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Artículos</h1>
            <FormArticulos updateArticulos={getArticulos} editing={editing} editId={editId}></FormArticulos>
            <TablaArticulos articulos={articulos} page={page} perPage={perPage} totalPages={totalPages} setPage={setPage} setPerPage={setPerPage} updateArticulos={getArticulos} editProduct={editProduct}></TablaArticulos>
        </div>
    );
}

export default withAuth(Articulos, ["admin"]);
