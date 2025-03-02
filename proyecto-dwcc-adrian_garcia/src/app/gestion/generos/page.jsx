"use client";
import { useEffect, useState } from "react";
import { db } from "@/js/api";
import withAuth from "@/components/security/withAuth";
import FormGestion from "@/components/gestion/formGestion";
import TablaGestion from "@/components/gestion/tablaGestion";

const Generos = () => {
    const [generos, setGeneros] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getGeneros();
    }, [page, perPage]);

    const getGeneros = () => {
        db.get(`/generos?_page=${page}&_per_page=${perPage}`)
            .then((response) => {
                setGeneros(response.data.data);
                setTotalPages(response.data.pages);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const deleteItem = (id) => {
        db.delete(`/generos/${id}`)
            .then(() => {
                console.log("Género eliminado");
                getGeneros();
            })
            .catch(error => console.error(`Error al eliminar el género: ${error}`))
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Géneros</h1>
            <FormGestion itemName={"generos"}></FormGestion>
            <TablaGestion items={generos} page={page} perPage={perPage} totalPages={totalPages} setPage={setPage} setPerPage={setPerPage} deleteItem={deleteItem}></TablaGestion>
        </div>
    );
}

export default withAuth(Generos, ["admin"]);
