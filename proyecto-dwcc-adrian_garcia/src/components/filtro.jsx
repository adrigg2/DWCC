import { useEffect, useState } from "react";
import { db } from "@/js/api";
import Select from "react-select";

export default function Filtro({ page, perPage, setPerPage, setTotalPages, setArticulos, articulos }) {
    const [categorias, setCategorias] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]); 
    const [generos, setGeneros] = useState([]);
    const [filter, setFilter] = useState({
        categoria: null,
        etiquetas: [],
        generos: [],
        buscar: "",
    });
    const [prevState, setPrevState] = useState({
        page: -1,
        perPage: -1,
        articulosLength: -1,
        categoria: null,
        etiquetas: [],
        generos: [],
        buscar: "",
    })

    useEffect(() => {
        if (prevState.page === page && prevState.perPage === perPage && prevState.articulosLength === articulos.length && prevState.categoria === filter.categoria && prevState.etiquetas === filter.etiquetas && prevState.generos === filter.generos && prevState.buscar === filter.buscar) {
            return;
        }


        db.get("/products")
            .then(async (response) => {
                console.log("fetching");
                const articulosFiltrados = filtroArticulos(await response.data);
                setArticulos(articulosFiltrados.slice((page - 1) * perPage, (page - 1) * perPage + perPage));
                setTotalPages(Math.ceil(articulosFiltrados.length / perPage));
                setPrevState({
                    page: page,
                    perPage: perPage,
                    articulosLength: articulos.length,
                    categoria: filter.categoria,
                    etiquetas: filter.etiquetas,
                    generos: filter.generos,
                    buscar: filter.buscar,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }, [filter, page, perPage, articulos]);

    const updateFilter = (value, key) => {
        setFilter({
            ...filter,
            [key]: value,
        });
    }

    const filtroArticulos = (articulos) => {
        if (filter.buscar) {
            articulos = articulos.filter(articulo => articulo.nombre.toLowerCase().includes(filter.buscar.toLowerCase()));
        }

        if (filter.categoria) {
            articulos = articulos.filter(articulo => articulo.categoria.id === filter.categoria.id);
        }

        if (filter.etiquetas.length > 0) {
            articulos = articulos.filter(articulo =>
                filter.etiquetas.every(selected =>
                    articulo.etiquetas.some(etiqueta => etiqueta.id === selected.id)
                )
            );
        }

        if (filter.generos.length > 0) {
            articulos = articulos.filter(articulo =>
                filter.generos.every(selected =>
                    articulo.generos.some(genero => genero.id === selected.id)
                )
            );
        }

        return articulos;
    }

    useEffect(() => {
        db.get("/categorias")
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        db.get("/etiquetas")
            .then((response) => {
                setEtiquetas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        db.get("/generos")
            .then((response) => {
                setGeneros(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    });

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
                onChange={(e) => updateFilter(e.target.value, "buscar")}
            />
            <label htmlFor="perPage">Categoría: </label>
            <select id="perPage" name="perPage" value={JSON.stringify(filter.categoria)} onChange={(event) => updateFilter(event.target.value === "" ? "" : JSON.parse(event.target.value), "categoria")} className="border rounded-lg p-2">
                <option value="">Todas</option>
                {categorias.map(categoria => (
                    <option key={categoria.id} value={JSON.stringify(categoria)}>{ categoria.name }</option>
                ))}
            </select>
            <label className="block text-gray-700">Etiquetas:</label>
            <Select
                isMulti
                options={etiquetas.map(etiqueta => ({ value: etiqueta, label: etiqueta.name }))}
                onChange={(selectedOptions) => updateFilter(selectedOptions ? selectedOptions.map(option => option.value) : [], "etiquetas")}
                className="w-full"
            />
            <label className="block text-gray-700">Géneros:</label>
            <Select
                isMulti
                options={generos.map(generos => ({ value: generos, label: generos.name }))}
                onChange={(selectedOptions) => updateFilter(selectedOptions ? selectedOptions.map(option => option.value) : [], "generos")}
                className="w-full"
            />
        </div>
    );
}