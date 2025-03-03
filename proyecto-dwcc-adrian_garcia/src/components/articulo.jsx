import Image from "next/image";

export default function Articulo({ articulo }) {
    return (
        <div>
            <Image src={`/api/image/${articulo.id}.${articulo.imageExtension}`} width={100} height={100} alt={articulo.nombre}></Image>
            <p>{articulo.nombre}</p>
            <p>{parseFloat(articulo.precio).toFixed(2)}€</p>
            <button>Añadir al carrito</button>
        </div>
    )
}
