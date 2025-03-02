import { db } from "@/js/api";

export default function TablaArticulos({ items, page, perPage, totalPages, setPage, setPerPage, deleteItem }) {
    return (
        <div className="mt-8 overflow-x-auto">
            <div className="flex justify-between items-center">
                <label htmlFor="perPage">Artículos por página</label>
                <select id="perPage" name="perPage" value={perPage} onChange={(event) => setPerPage(event.target.value)} className="border rounded-lg p-2">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Gestión</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="border-b hover:bg-gray-100 text-black">
                            <td className="p-3">{item.id}</td>
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">
                                <button className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition" onClick={() => deleteItem(item.id)}>
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