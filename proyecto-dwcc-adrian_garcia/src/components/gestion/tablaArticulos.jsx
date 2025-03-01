import { db } from "@/js/api";
import Image from "next/image";

// TODO: Agregar filtros

export default function TablaArticulos({ articulos, page, perPage, totalPages, setPage, setPerPage, updateArticulos }) {
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

    return (
        <div className="mt-8 overflow-x-auto">
            <div className="flex justify-between items-center">
                <label htmlFor="perPage">Artículos por página</label>
                <select id="perPage" name="perPage" value={perPage} onChange={(event) => setPerPage(event.target.value)} className="border rounded-lg p-2">
                    <option value="10">10</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Imagen</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Precio</th>
                        <th className="p-3">Descripción</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Categoría</th>
                        <th className="p-3">Gestión</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map(articulo => (
                        <tr key={articulo.id} className="border-b hover:bg-gray-100 text-black">
                            <td className="p-3">{articulo.id}</td>
                            <td className="p-3"><Image src={`/api/image/${articulo.id}.${articulo.imageExtension}`} width={100} height={100} alt={articulo.nombre}></Image></td>
                            <td className="p-3">{articulo.nombre}</td>
                            <td className="p-3">{articulo.precio}</td>
                            <td className="p-3">{articulo.descripcion}</td>
                            <td className="p-3">{articulo.stock}</td>
                            <td className="p-3">{articulo.categoria.name}</td>
                            <td className="p-3">
                                <button className="w-1/2 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
                                    Editar
                                </button>
                                <button className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition" onClick={() => deleteProduct(articulo.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>            
            {
                totalPages > 1 &&
                <div className="mt-4 flex justify-center">
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Anterior</button>
                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Siguiente</button>
                </div>
            }
        </div>
    )
}