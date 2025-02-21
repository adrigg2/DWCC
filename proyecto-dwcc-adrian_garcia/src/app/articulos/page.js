"use client";

export default function Articulos() {
    const [articulos, setArticulos] = useState([]);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        fetch('localhost:5000/articulos') // TODO: Comprobar url & cambiar a axios
            .then(response => response.json())
            .then(data => setArticulos(data));
    }, []); // TODO: Dejar empty array en la otra página

    const handleChange = (event) => {
        setInputs(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // TODO: Comprobar si es necesario
        fetch('localhost:5000/articulos', { // TODO: Comprobar url & cambiar a axios
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(response => response.json())
            .then(data => setArticulos([...articulos, data]));
    }

    return (
        <div>
            <h1>Artículos</h1>
            <form onSubmit={handleSubmit}>
                <label for="nombre">Nombre: </label>
                <input type="text" id="nombre" name="nombre" onChange={handleChange} />
                <label for="precio">Precio: </label>
                <input type="number" id="precio" name="precio" onChange={handleChange} />
                <label for="descripcion">Descripción: </label>
                <input type="text" id="descripcion" name="descripcion" onChange={handleChange} />
                <label for="stock">Stock: </label>
                <input type="number" id="stock" name="stock" onChange={handleChange} />
                <label for="categoria">Categoría: </label>
                <input type="text" id="categoria" name="categoria" onChange={handleChange} /> // TODO: Cambiar a select
                <label for="imagen">Imagen: </label>
                <input type="file" id="imagen" name="imagen" onChange={handleChange} />
                <input type="submit" value="Agregar artículo"/>
            </form>
            <ul>
                {articulos.map(articulo => (
                    <li key={articulo.id}>
                        <h2>{articulo.nombre}</h2>
                        <p>{articulo.precio}</p>
                        <p>{articulo.descripcion}</p>
                        <p>{articulo.stock}</p>
                        <p>{articulo.categoria}</p>
                        <img src={articulo.imagen} alt={articulo.nombre} />
                    </li>
                ))}
            </ul>
        </div>
    );
}