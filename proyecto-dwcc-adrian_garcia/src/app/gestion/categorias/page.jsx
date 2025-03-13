"use client";
import { useEffect, useState } from "react";
import { db } from "@/js/api";
import withAuth from "@/components/security/withAuth";
import FormGestion from "@/components/gestion/formGestion";
import TablaGestion from "@/components/gestion/tablaGestion";
import Swal from "sweetalert2";

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getCategorias();
    }, [page, perPage]);

    const getCategorias = () => {
        db.get(`/categorias?_page=${page}&_per_page=${perPage}`)
            .then((response) => {
                setCategorias(response.data.data);
                setTotalPages(response.data.pages);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const deleteProduct = (id) => {
        const product = articulos.find(articulo => articulo.id === id);

        if (product.imageExtension) {
            api.delete(`/api/image/${product.id}.${product.imageExtension}`);
        }

        db.delete(`/products/${id}`)
            .then(() => {
                console.log("Artículo eliminado");
                updateArticulos();
            })
            .catch(error => console.error(`Error al eliminar el artículo: ${error}`))
    }

    const deleteItem = async (id) => {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            html: `¿Quieres eliminar la categoría con id ${id}?<br>Ten en cuenta que eliminar una categoría implica la eliminación de todos los artículos que le pertenezcan<br>Esta acción no se puede deshacer.`,
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

        db.delete(`/categorias/${id}`)
            .then(() => {
                console.log("Categoría eliminada");
                db.get("/products")
                .then(response => {
                    response.data.forEach(element => {
                        if (element.categoria.id === id) {
                            deleteProduct(element.id);
                        }
                    });
                })
                .catch(error => {
                    console.error(error);
                });
                getCategorias();
            })
            .catch(error => console.error(`Error al eliminar la categoría: ${error}`))
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Categorías</h1>
            <FormGestion itemName={"categorias"}></FormGestion>
            <h4 className="text-center text-red-600 font-semibold bg-red-100 border border-red-400 p-2 rounded-lg">Eliminar una categoría implica la eliminación de todos los productos que pertenezcan a esa categoría</h4>
            <TablaGestion items={categorias} page={page} perPage={perPage} totalPages={totalPages} setPage={setPage} setPerPage={setPerPage} deleteItem={deleteItem}></TablaGestion>
        </div>
    );
}

export default withAuth(Categorias, ["admin"]);
