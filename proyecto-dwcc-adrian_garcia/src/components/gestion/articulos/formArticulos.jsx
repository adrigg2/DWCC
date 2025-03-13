import { useEffect, useState } from "react";
import { db, api } from "@/js/api";
import ImageUploader from "./imageUploader";
import Select from "react-select";

export default function FormArticulos({ updateArticulos, editing, editId, categorias, etiquetas, generos }) {
    const [inputs, setInputs] = useState({
        nombre: "",
        precio: 0,
        descripcion: "",
        stock: 0,
        categoria: null,
        imageExtension: "",
        descuento: 0,
        etiquetas: [],
        generos: [],
        plataforma: "",
        fabricante: "",
    });
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (editId) {
            db.get(`/products/${editId}`)
                .then((response) => {
                    setInputs({...response.data, categoria: JSON.stringify(response.data.categoria)});
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [editId]);

    const handleChange = (event) => {
        setInputs(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleMultiSelectChange = (selectedOptions, key) => {
        setInputs(prev => ({
            ...prev,
            [key]: selectedOptions ? selectedOptions.map(option => option.value) : [],
        }));
    };

    const handleSelectChange = (event) => {
        setInputs(values => ({
            ...values,
            categoria: event.target.value === "" ? "" : JSON.parse(event.target.value)
        }));
        console.log(inputs);
    }

    const setFile = (file) => {
        setImage(file);
        setInputs(values => ({
            ...values,
            imageExtension: file.name.split(".").pop()
        }));
    }

    const clearForm = () => {
        setInputs({
            nombre: "",
            precio: 0,
            descripcion: "",
            stock: 0,
            categoria: null,
            imageExtension: "",
            descuento: 0,
            etiquetas: [],
            generos: [],
            plataforma: "",
            fabricante: "",
        });
    }

    const createProduct = async (event) => {
        event.preventDefault();
        if (!inputs.nombre || !inputs.precio || !inputs.descripcion || !inputs.stock || !inputs.categoria|| !inputs.fabricante || ((inputs.categoria.id === "98cc" || inputs.categoria.id === "095f") && (inputs.generos.length === 0 || !inputs.plataforma)) || (inputs.etiquetas.filter(etiqueta => etiqueta.id === "2" || etiqueta.id === "4").length > 0 && inputs.descuento === 0)) {
            setErrorMsg("Debes rellenar todos los campos no opcionales");
            return;
        }

        await db.post("/products", inputs)
            .then(async data => {
                if (image) {
                    const formData = new FormData();
                    formData.append("file", image);
                    api.put(`/api/image/${data.data.id + "." + inputs.imageExtension}`, formData)
                        .then(() => console.log("Imagen subida"))
                        .catch(error => console.error(`Error al subir la imagen: ${error}`));
                }
            })
            .catch(error => console.error(`Error al agregar el artículo: ${error}`));
        updateArticulos();
        clearForm();
    }

    const editProduct = async (event) => {
        event.preventDefault();
        if (!inputs.nombre || !inputs.precio || !inputs.descripcion || !inputs.stock || !inputs.categoria || !inputs.fabricante || ((inputs.categoria.id === "98cc" || inputs.categoria.id === "095f") && (inputs.generos.length === 0 || !inputs.plataforma)) || (inputs.etiquetas.filter(etiqueta => etiqueta.id === "2" || etiqueta.id === "4").length > 0 && inputs.descuento === 0)) {
            setErrorMsg("Debes rellenar todos los campos no opcionales");
            return;
        }

        await db.put(`/products/${inputs.id}`, inputs)
            .then(async data => {
                if (image) {
                    const formData = new FormData();
                    formData.append("file", image);
                    api.put(`/api/image/${data.data.id + "." + inputs.imageExtension}`, formData)
                        .then(() => console.log("Imagen subida"))
                        .catch(error => console.error(`Error al subir la imagen: ${error}`));
                }
            })
            .catch(error => console.error(`Error al agregar el artículo: ${error}`));
        updateArticulos();
        clearForm();
    }

    return (
        <form onSubmit={editing ? editProduct : createProduct} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
            <div>
                <label htmlFor="nombre" className="block text-gray-700 dark:text-white">Nombre:</label>
                <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    value={inputs.nombre} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label htmlFor="precio" className="block text-gray-700 dark:text-white">Precio:</label>
                <input 
                    type="number" 
                    id="precio" 
                    name="precio" 
                    value={inputs.precio} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label htmlFor="descripcion" className="block text-gray-700 dark:text-white">Descripción:</label>
                <input 
                    type="text" 
                    id="descripcion" 
                    name="descripcion" 
                    value={inputs.descripcion} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label htmlFor="fabricante" className="block text-gray-700 dark:text-white">Fabricante/Desarrollador:</label>
                <input 
                    type="text" 
                    id="fabricante" 
                    name="fabricante" 
                    value={inputs.fabricante} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label htmlFor="stock" className="block text-gray-700 dark:text-white">Stock:</label>
                <input 
                    type="number" 
                    id="stock" 
                    name="stock" 
                    value={inputs.stock} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label htmlFor="categoria" className="block text-gray-700 dark:text-white">Categoría:</label>
                <select 
                    value={JSON.stringify(inputs.categoria)} 
                    onChange={handleSelectChange} 
                    name="categoria" 
                    id="categoria" 
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                >
                    <option value=""></option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={JSON.stringify(categoria)}>{ categoria.name }</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-gray-700 dark:text-white">Etiquetas:</label>
                <Select
                    isMulti
                    options={etiquetas.map(etiqueta => ({ value: etiqueta, label: etiqueta.name }))}
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "etiquetas")}
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
            {(inputs.etiquetas.filter(etiqueta => etiqueta.id === "2" || etiqueta.id === "4").length > 0) && 
                <div>
                    <label htmlFor="descuento" className="block text-gray-700 dark:text-white">Descuento:</label>
                    <input 
                        type="number" 
                        id="descuento" 
                        name="descuento" 
                        min="0" 
                        max="99" 
                        value={inputs.descuento} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
            }
            {inputs.categoria && (inputs.categoria.id === "98cc" || inputs.categoria.id === "095f") && 
            <>
                <div>
                    <label htmlFor="plataforma" className="block text-gray-700 dark:text-white">Plataforma:</label>
                    <input 
                        type="text" 
                        id="plataforma" 
                        name="plataforma" 
                        value={inputs.plataforma} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-white">Géneros:</label>
                    <Select
                        isMulti
                        options={generos.map(generos => ({ value: generos, label: generos.name }))}
                        onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "generos")}
                        className="w-full text-gray-700 dark:text-white"
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: 'rgb(255, 255, 255)',
                                color: 'black',
                                borderColor: 'rgb(207, 213, 220)', 
                                boxShadow: 'none',
                            }),
                            menu: (base) => ({
                                ...base,
                                backgroundColor: 'rgb(255, 255, 255)', 
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: 'black', 
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? 'rgb(31, 41, 55)' : base.backgroundColor,
                                color: state.isSelected ? 'white' : 'gray',
                                '&:hover': {
                                    backgroundColor: 'rgb(31, 41, 55)',
                                    color: 'white',
                                },
                            }),
                        }}
                    />
                </div>
            </>
            }
            <div>
                <ImageUploader setFile={setFile}></ImageUploader>
            </div>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <input 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" 
                value={editing ? "Editar artículo" : "Agregar artículo"}
            />
        </form>
    )
}