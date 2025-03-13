export default function TablaArticulos({ items, page, perPage, totalPages, setPage, setPerPage, deleteItem }) {
    return (
        <div className="mt-8 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="perPage" className="text-gray-700 dark:text-white ml-auto mr-2">Artículos por página:</label>
                <select 
                    id="perPage" 
                    name="perPage" 
                    value={perPage} 
                    onChange={(event) => setPerPage(event.target.value)} 
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 dark:bg-blue-600 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Gestión</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white">
                            <td className="p-3">{item.id}</td>
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">
                                <button 
                                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition" 
                                    onClick={() => deleteItem(item.id)}
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
                        className={page <= 1 ? "bg-blue-400 text-white py-2 px-4 rounded-lg transition" : "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"}
                    >
                        Anterior
                    </button>
                    <button 
                        onClick={() => setPage(page + 1)} 
                        disabled={page >= totalPages} 
                        className={page >= totalPages ? "bg-blue-400 text-white py-2 px-4 rounded-lg transition" : "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    )
}