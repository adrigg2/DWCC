"use client";
import TablaUsuarios from "@/components/gestion/usuarios/tablaUsuarios";

const Usuarios = () => {
    return (
        <div>
            <TablaUsuarios></TablaUsuarios>
        </div>
    )
}

export default withAuth(Usuarios, ["admin"]);
