"use client";
import { useEffect, useState } from "react";
import { db } from "@/js/api";
import withAuth from "@/components/security/withAuth";
import FormGestion from "@/components/gestion/formGestion";
import TablaGestion from "@/components/gestion/tablaGestion";

const Etiquetas = () => {
    const [etiquetas, setEtiquetas] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getEtiquetas();
    }, [page, perPage]);

    const getEtiquetas = () => {
        db.get(`/etiquetas?_page=${page}&_per_page=${perPage}`)
            .then((response) => {
                setEtiquetas(response.data.data);
                setTotalPages(response.data.pages);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const deleteItem = (id) => {
        db.delete(`/etiquetas/${id}`)
            .then(() => {
                console.log("Etiqueta eliminada");
                getEtiquetas();
            })
            .catch(error => console.error(`Error al eliminar la etiqueta: ${error}`))
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Etiquetas</h1>
            <FormGestion itemName={"etiquetas"}></FormGestion>
            <TablaGestion items={etiquetas} page={page} perPage={perPage} totalPages={totalPages} setPage={setPage} setPerPage={setPerPage} deleteItem={deleteItem}></TablaGestion>
        </div>
    );
}

export default withAuth(Etiquetas, ["admin"]);
