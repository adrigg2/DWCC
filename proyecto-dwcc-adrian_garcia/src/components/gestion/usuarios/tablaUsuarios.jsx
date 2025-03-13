import { db } from "@/js/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import Swal from "sweetalert2";

export default function TablaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const { user } = useAuth();
    
    useEffect(() => {
        db.get("/roles")
            .then(data => {
                setRoles(data.data);
            })
    }, [])

    useEffect(() => {
        updateUsers();
    }, [page, perPage])

    const updateUsers = () => {
        db.get("/users")
            .then(data => {
                setUsuarios(data.data.slice((page - 1) * perPage, (page - 1) * perPage + perPage));
                setTotalPages(Math.ceil(data.data.length / perPage));
                console.log(data.data);
            });
    }
    
    const deleteUser = async (id) => {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            html: `¿Quieres eliminar al usuario con id ${id}?<br><br>Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        });

        if (!resultado.isConfirmed) {
            return;
        }

        db.delete(`/users/${id}`)
            .then(() => {
                console.log("Usuario eliminado");
                updateUsers();
            })
            .catch(error => console.error(`Error al eliminar el usuario: ${error}`))
    }

    const changeUserRole = (id, role) => {
        db.patch(`/users/${id}`, {rol: role})
            .then(() => {
                console.log("Rol actualizado correctamente");
                updateUsers();
            })
            .catch(error => {
                console.error("Se ha producido un error al actualizar el usuario: ", error);
            });
    }

    return (
        <div className="mt-8 overflow-x-auto">
            <div className="flex justify-end items-center mb-4">
                <label htmlFor="perPage" className="mr-2 text-gray-700 dark:text-white">Usuarios por página:</label>
                <select 
                    id="perPage" 
                    name="perPage" 
                    value={perPage} 
                    onChange={(event) => setPerPage(event.target.value)} 
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 dark:bg-blue-600 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Apellido</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Rol</th>
                        <th className="p-3">Gestión</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white">
                            <td className="p-3">{usuario.id}</td>
                            <td className="p-3">{usuario.name}</td>
                            <td className="p-3">{usuario.surname}</td>
                            <td className="p-3">{usuario.email}</td>
                            <td className="p-3">
                                <select 
                                    name="role" 
                                    id="role" 
                                    value={JSON.stringify(usuario.rol)} 
                                    onChange={(event) => changeUserRole(usuario.id, JSON.parse(event.target.value))} 
                                    disabled={user.id === usuario.id} 
                                    className="bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-lg"
                                >
                                    {roles.map((rol) => (
                                        <option key={rol.id} value={JSON.stringify(rol)}>{rol.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="p-3">
                                <button 
                                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition" 
                                    onClick={() => deleteUser(usuario.id)}
                                >
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>            

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-4">
                    <button 
                        onClick={() => setPage(page - 1)} 
                        disabled={page <= 1} 
                        className={page <= 1 ? "bg-blue-400 text-white py-2 px-4 rounded-lg transition" : "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"}
                    >
                        Anterior
                    </button>
                    <button 
                        onClick={() => setPage(page + 1)} 
                        disabled={page >= totalPages} 
                        className={page >= totalPages ? "bg-blue-400 text-white py-2 px-4 rounded-lg transition" : "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    )
}