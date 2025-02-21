import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <Link href="/" className="hover:underline">
                <h1 className="text-2xl font-bold">Game</h1>
            </Link>
            <ul className="flex gap-4">
                <li>
                    <Link href="/" className="hover:underline">Inicio</Link>
                </li>
                <li>
                    <Link href="/registro" className="hover:underline">Registro</Link>
                </li>
                <li>
                    <Link href="/login" className="hover:underline">Iniciar sesión</Link>
                </li>
            </ul>
        </nav>
    );
}