import { useState } from "react";
import { db } from "@/js/api";

// TODO: Géneros y etiquetas (Ver chat con ChatGPT y cambiar el is checked por comprobar la array)

export default function FormGestion({ itemName }) {
    const [inputs, setInputs] = useState({
        nombre: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (event) => {
        setInputs(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const clearForm = () => {
        setInputs({
            nombre: "",
        });
    }

    const createItem = async (event) => {
        event.preventDefault();
        if (!inputs.nombre) {
            setErrorMsg("Debes rellenar todos los campos no opcionales");
            return;
        }

        await db.post(`/${itemName}`, inputs)
            .then(console.log(`${itemName} agregado`))
            .catch(error => console.error(`Error al agregar el artículo: ${error}`));
        updateArticulos();
        clearForm();
    }

    return (
        <form onSubmit={createItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
            <div>
                <label htmlFor="nombre" className="block text-gray-700 dark:text-white">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={inputs.nombre} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <input type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" value={`Agregar ${itemName.substring(0, itemName.length - 1)}`}/>
        </form>
    )
}