import { useEffect, useState } from "react";
import { db, api } from "@/js/api";
import ImageUploader from "./imageUploader";

// TODO: Cambiar categorías a géneros y añadir PUT

export default function FormArticulos({ updateArticulos }) {
    const [categorias, setCategorias] = useState([]);
    const [inputs, setInputs] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
        categoria: "",
        imageExtension: "",
    });
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        db.get("/categories")
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleChange = (event) => {
        setInputs(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
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
            precio: "",
            descripcion: "",
            stock: "",
            categoria: "",
            imageExtension: "",
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputs.nombre || !inputs.precio || !inputs.descripcion || !inputs.stock || !inputs.categoria) {
            setErrorMsg("Debes rellenar todos los campos no opcionales");
            return;
        }

        var categoria = JSON.parse(inputs.categoria);
        inputs.categoria = categoria;
        await db.post("/products", inputs)
            .then(async data => {
                if (image) {
                    const formData = new FormData();
                    formData.append("file", image);
                    formData.append("fileName", data.data.id + "." + inputs.imageExtension);
                    api.post("/api/image", formData)
                        .then(() => console.log("Imagen subida"))
                        .catch(error => console.error(`Error al subir la imagen: ${error}`));
                }
            })
            .catch(error => console.error(`Error al agregar el artículo: ${error}`));
        updateArticulos();
        clearForm();
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
            <div>
                <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={inputs.nombre} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
                <label htmlFor="precio" className="block text-gray-700">Precio:</label>
                <input type="number" id="precio" name="precio" value={inputs.precio} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
                <label htmlFor="descripcion" className="block text-gray-700">Descripción:</label>
                <input type="text" id="descripcion" name="descripcion"  value={inputs.descripcion} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
                <label htmlFor="stock" className="block text-gray-700">Stock:</label>
                <input type="number" id="stock" name="stock" value={inputs.stock} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
                <label htmlFor="categoria" className="block text-gray-700">Categoría:</label>
                <select value={inputs.categoria} onChange={handleChange} name="categoria" id="categoria" className="w-full p-2 border rounded-lg">
                    <option value=""></option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={JSON.stringify(categoria)}>{ categoria.name }</option>
                    ))}
                </select>
            </div>
            <div>
                <ImageUploader setFile={setFile}></ImageUploader>
            </div>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <input type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" value="Agregar artículo"/>
        </form>
    )
}