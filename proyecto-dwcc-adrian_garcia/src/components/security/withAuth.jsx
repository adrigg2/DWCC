"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component, roles) => {
    return (props) => {
        const { user, loaded } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loaded) return;
            if (!user || (roles && !(roles.find((rol) => rol === user.rol.name)))) {
                router.replace("/login");
            }
        }, [user, loaded])

        if (!user) {
            return <p>Redirigiendo...</p>;
        }

        return <Component {...props} />;
    }
}

export default withAuth;
