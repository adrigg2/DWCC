"use client";

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
        if (prevState.page === page && 
            prevState.perPage === perPage && 
            prevState.articulosLength === articulos.length && 
            JSON.stringify(prevState.categoria) === JSON.stringify(filter.categoria) && 
            JSON.stringify(prevState.etiquetas) === JSON.stringify(filter.etiquetas) && 
            JSON.stringify(prevState.generos) === JSON.stringify(filter.generos) && 
            prevState.buscar === filter.buscar) {
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
    }, []);

    return (
        <div className="flex flex-wrap items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex items-center space-x-2">
                <label htmlFor="perPage" className="text-gray-700 dark:text-white font-medium">Artículos por página:</label>
                <select 
                id="perPage" 
                name="perPage" 
                value={perPage} 
                onChange={(event) => setPerPage(Number(event.target.value))} 
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">25</option>
                <option value="50">50</option>
                </select>
            </div>

            <input
                type="text"
                placeholder="Buscar..."
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white w-60"
                onChange={(e) => updateFilter(e.target.value, "buscar")}
            />

            <div className="items-center space-x-2">
                <label htmlFor="categoria" className="text-gray-700 dark:text-white font-medium">Categoría:</label>
                <select 
                id="categoria" 
                name="categoria" 
                value={JSON.stringify(filter.categoria)} 
                onChange={(event) => updateFilter(event.target.value === "" ? "" : JSON.parse(event.target.value), "categoria")} 
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                >
                <option value="">Todas</option>
                {categorias.map(categoria => (
                    <option key={categoria.id} value={JSON.stringify(categoria)}>{categoria.name}</option>
                ))}
                </select>
            </div>

            <div className="w-64">
                <label className="block text-gray-700 dark:text-white font-medium mb-1">Etiquetas:</label>
                <Select
                    id="etiquetas"
                    isMulti
                    options={etiquetas.map(etiqueta => ({ value: etiqueta, label: etiqueta.name }))}
                    onChange={(selectedOptions) => updateFilter(selectedOptions ? selectedOptions.map(option => option.value) : [], "etiquetas")}
                    className="w-full text-gray-700 dark:text-white"
                    styles={{
                        control: (base) => ({
                            ...base,
                            backgroundColor: 'rgb(55, 65, 81)', // dark background color for dark mode
                            color: 'white',  // text color
                            borderColor: 'rgb(107, 114, 128)', // border color in dark mode
                        }),
                        menu: (base) => ({
                            ...base,
                            backgroundColor: 'rgb(55, 65, 81)', // dark background for the dropdown menu
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: 'white',  // text color for selected value
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? 'rgb(31, 41, 55)' : base.backgroundColor, // dark highlight for selected option
                            color: state.isSelected ? 'white' : 'gray', // color change when selected
                            '&:hover': {
                                backgroundColor: 'rgb(31, 41, 55)', // hover effect in dark mode
                                color: 'white', // text color on hover
                            },
                        }),
                    }}
        />
            </div>

            <div className="w-64">
                <label className="block text-gray-700 dark:text-white font-medium mb-1">Géneros:</label>
                <Select
                    id="generos"
                    isMulti
                    options={generos.map(genero => ({ value: genero, label: genero.name }))}
                    onChange={(selectedOptions) => updateFilter(selectedOptions ? selectedOptions.map(option => option.value) : [], "generos")}
                    className="w-full text-gray-700 dark:text-white"
                    styles={{
                        control: (base) => ({
                            ...base,
                            backgroundColor: 'rgb(55, 65, 81)', // dark background color for dark mode
                            color: 'white',  // text color
                            borderColor: 'rgb(107, 114, 128)', // border color in dark mode
                        }),
                        menu: (base) => ({
                            ...base,
                            backgroundColor: 'rgb(55, 65, 81)', // dark background for the dropdown menu
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: 'white',  // text color for selected value
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? 'rgb(31, 41, 55)' : base.backgroundColor, // dark highlight for selected option
                            color: state.isSelected ? 'white' : 'gray', // color change when selected
                            '&:hover': {
                                backgroundColor: 'rgb(31, 41, 55)', // hover effect in dark mode
                                color: 'white', // text color on hover
                            },
                        }),
                    }}
                />
            </div>
        </div>

    );
}