"use client";
import { db, api } from "@/js/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploader from "@/components/imageUploader";
import withAuth from "@/components/security/withAuth";

const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
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

    useEffect(() => {
        db.get("/products")
            .then((response) => {
                setArticulos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
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

    const handleSubmit = (event) => {
        event.preventDefault();
        var categoria = JSON.parse(inputs.categoria);
        inputs.categoria = categoria;
        db.post("/products", inputs)
            .then(data => setArticulos([...articulos, data.data]))
            .catch(error => console.error(`Error al agregar el artículo: ${error}`));
        
        if (image) {
            const formData = new FormData();
            console.log(articulos);
            formData.append("file", image);
            formData.append("fileName", articulos[articulos.length - 1].id + "." + inputs.imageExtension);
            api.post("/api/upload", formData)
                .then(() => console.log("Imagen subida"))
                .catch(error => console.error(`Error al subir la imagen: ${error}`));
        }
    }

    const deleteProduct = (id) => {
        const product = articulos.find(articulo => articulo.id === id);

        if (product.imageExtension) {
            api.delete(`/api/delete/${product.id}.${product.imageExtension}`);
        }

        db.delete(`/products/${id}`)
            .then(() => {
                console.log("Artículo eliminado");
                setArticulos(articulos.filter(articulo => articulo.id !== id));
            })
            .catch(error => console.error(`Error al eliminar el artículo: ${error}`))
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Artículos</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
                <div>
                    <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" onChange={handleChange} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label htmlFor="precio" className="block text-gray-700">Precio:</label>
                    <input type="number" id="precio" name="precio" onChange={handleChange} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label htmlFor="descripcion" className="block text-gray-700">Descripción:</label>
                    <input type="text" id="descripcion" name="descripcion" onChange={handleChange} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-gray-700">Stock:</label>
                    <input type="number" id="stock" name="stock" onChange={handleChange} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label htmlFor="categoria" className="block text-gray-700">Categoría:</label>
                    <select onChange={handleChange} name="categoria" id="categoria" className="w-full p-2 border rounded-lg">
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={JSON.stringify(categoria)}>{ categoria.name }</option>
                        ))}
                    </select>
                </div>
                <div>
                    <ImageUploader setFile={setFile}></ImageUploader>
                </div>
                <input type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" value="Agregar artículo"/>
            </form>
            <div className="mt-8 overflow-x-auto">
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
                                <td className="p-3"><Image src={`/uploads/img/${articulo.id}.${articulo.imageExtension}`} width={100} height={100} alt={articulo.nombre}></Image></td>
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
            </div>
        </div>
    );
}

export default withAuth(Articulos, ["admin"]);
