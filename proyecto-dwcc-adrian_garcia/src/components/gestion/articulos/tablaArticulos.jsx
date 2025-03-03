import { db } from "@/js/api";
import Image from "next/image";
import Select from "react-select";

export default function TablaArticulos({ articulos, page, perPage, totalPages, setPage, setPerPage, updateArticulos, editProduct, categorias, etiquetas, generos, setFilter, filter }) {    
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
            <div className="flex justify-end items-center">
                <label htmlFor="perPage">Artículos por página: </label>
                <select id="perPage" name="perPage" value={perPage} onChange={(event) => setPerPage(event.target.value)} className="border rounded-lg p-2">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                </select>
                <label htmlFor="perPage">Categoría: </label>
                <select id="perPage" name="perPage" value={JSON.stringify(filter.categoria)} onChange={(event) => setFilter(event.target.value === "" ? "" : JSON.parse(event.target.value), "categoria")} className="border rounded-lg p-2">
                    <option value="">Todas</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={JSON.stringify(categoria)}>{ categoria.name }</option>
                    ))}
                </select>
                <label className="block text-gray-700">Etiquetas:</label>
                <Select
                    isMulti
                    options={etiquetas.map(etiqueta => ({ value: etiqueta, label: etiqueta.name }))}
                    onChange={(selectedOptions) => setFilter(selectedOptions ? selectedOptions.map(option => option.value) : [], "etiquetas")}
                    className="w-full"
                />
                <label className="block text-gray-700">Géneros:</label>
                <Select
                    isMulti
                    options={generos.map(generos => ({ value: generos, label: generos.name }))}
                    onChange={(selectedOptions) => setFilter(selectedOptions ? selectedOptions.map(option => option.value) : [], "generos")}
                    className="w-full"
                />
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
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
                        <tr key={articulo.id} className="border-b hover:bg-gray-100 text-black">
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
                            <td className="p-3">
                                <button className="w-1/2 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition" onClick={() => editProduct(articulo.id)}>
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
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1} className={page <= 1 ? "bg-blue-400 text-white py-2 px-4 rounded-lg transition" : "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"}>Anterior</button>
                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className={page >= totalPages ? "bg-blue-400 text-white py-2 px-4 rounded-lg transition" : "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"}>Siguiente</button>
                </div>
            }
        </div>
    )
}