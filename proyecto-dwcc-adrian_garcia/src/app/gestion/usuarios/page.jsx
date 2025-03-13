"use client";
import TablaUsuarios from "@/components/gestion/usuarios/tablaUsuarios";
import withAuth from "@/components/security/withAuth";

const Usuarios = () => {
    return (
        <div className="p-8">
            <TablaUsuarios></TablaUsuarios>
        </div>
    )
}

export default withAuth(Usuarios, ["admin"]);
