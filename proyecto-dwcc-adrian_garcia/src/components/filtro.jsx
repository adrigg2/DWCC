export default function Filtro({ updateFilter }) {
    return (
        <div className="flex justify-center p-4">
            <label htmlFor="perPage">Artículos por página: </label>
            <select id="perPage" name="perPage" value={perPage} onChange={(event) => setPerPage(event.target.value)} className="border rounded-lg p-2">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">25</option>
                <option value="50">50</option>
            </select>
            <input
                type="text"
                placeholder="Buscar..."
                className="p-2 border border-gray-300 rounded-lg"
                onChange={(e) => updateFilter(e.target.value)}
            />
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
    );
}