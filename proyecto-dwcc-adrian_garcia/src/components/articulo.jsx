import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Articulo({ articulo }) {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div>            
            <Link href={`/articulos/${articulo.id}`}>
                <Image src={`/api/image/${articulo.id}.${articulo.imageExtension}`} width={100} height={100} alt={articulo.nombre}></Image>
                <p>{articulo.nombre}</p>
                <p>{parseFloat(articulo.precio).toFixed(2)}€</p>
                {articulo.plataforma !== "" && <p>{articulo.plataforma}</p>}
            </Link>
            <button onClick={() => user ? addToCart(articulo) : router.replace(`/login?add=${articulo.id}`)}>Añadir al carrito</button>
        </div>
    )
}
