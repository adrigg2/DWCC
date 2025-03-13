"use client";
import { useEffect, useState } from "react";
import { db } from "@/js/api";
import withAuth from "@/components/security/withAuth";
import FormGestion from "@/components/gestion/formGestion";
import TablaGestion from "@/components/gestion/tablaGestion";
import Swal from "sweetalert2";

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

    const deleteItem = async (id) => {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            html: `¿Quieres eliminar el género con id ${id}?<br><br>Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        });

        if (!resultado.isConfirmed) {
            return;
        }
        db.delete(`/generos/${id}`)
            .then(() => {
                console.log("Género eliminado");
                getGeneros();
            })
            .catch(error => console.error(`Error al eliminar el género: ${error}`))
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Géneros</h1>
            <FormGestion itemName={"generos"}></FormGestion>
            <TablaGestion items={generos} page={page} perPage={perPage} totalPages={totalPages} setPage={setPage} setPerPage={setPerPage} deleteItem={deleteItem}></TablaGestion>
        </div>
    );
}

export default withAuth(Generos, ["admin"]);
