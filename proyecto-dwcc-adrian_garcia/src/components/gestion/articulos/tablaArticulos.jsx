import { db, api } from "@/js/api";
import Image from "next/image";
import Filtro from "@/components/filtro";
import Swal from "sweetalert2";

export default function TablaArticulos({ articulos, page, perPage, totalPages, setPage, setPerPage, updateArticulos, editProduct, setTotalPages, setArticulos }) {    
    const deleteProduct = async (id) => {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            html: `¿Quieres eliminar el artículo con id ${id}?<br><br>Esta acción no se puede deshacer.`,
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

    return (
        <div className="mt-8 overflow-x-auto">
            <Filtro 
                page={page} 
                perPage={perPage} 
                setPerPage={setPerPage} 
                setTotalPages={setTotalPages} 
                setArticulos={setArticulos} 
                articulos={articulos}
            ></Filtro>
            
            <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 dark:bg-blue-600 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Imagen</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Precio</th>
                        <th className="p-3">Descuento</th>
                        <th className="p-3">Descripción</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Categoría</th>
                        <th className="p-3">Etiquetas</th>
                        <th className="p-3">Géneros</th>
                        <th className="p-3">Gestión</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map(articulo => (
                        <tr key={articulo.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white">
                            <td className="p-3">{articulo.id}</td>
                            <td className="p-3"><Image src={`/api/image/${articulo.id}.${articulo.imageExtension}`} width={100} height={100} alt={articulo.nombre}></Image></td>
                            <td className="p-3">{articulo.nombre}</td>
                            <td className="p-3">{articulo.precio}</td>
                            <td className="p-3">{articulo.descuento || 0}%</td>
                            <td className="p-3">{articulo.descripcion}</td>
                            <td className="p-3">{articulo.stock}</td>
                            <td className="p-3">{articulo.categoria.name}</td>
                            <td className="p-3">{articulo.etiquetas?.map(e => e.name).join(", ") || "N/A"}</td>
                            <td className="p-3">{articulo.generos?.map(g => g.name).join(", ") || "N/A"}</td>
                            <td className="p-3 flex space-x-2">
                                <button 
                                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition w-full" 
                                    onClick={() => editProduct(articulo.id)}
                                >
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button 
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition w-full" 
                                    onClick={() => deleteProduct(articulo.id)}
                                >
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-4">
                    <button 
                        onClick={() => setPage(page - 1)} 
                        disabled={page <= 1} 
                        className={`py-2 px-4 rounded-lg transition ${page <= 1 ? "bg-blue-400 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Anterior
                    </button>
                    <button 
                        onClick={() => setPage(page + 1)} 
                        disabled={page >= totalPages} 
                        className={`py-2 px-4 rounded-lg transition ${page >= totalPages ? "bg-blue-400 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    )
}