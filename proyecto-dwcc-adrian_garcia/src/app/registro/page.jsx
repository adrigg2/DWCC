"use client";

import { useEffect, useState } from "react";
import { api } from "@/js/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function FormRegistro() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [usuarios, setUsuarios] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosResponse = await api.get("/users");
      const usuarios = usuariosResponse.data;
      if (!usuarios) {
        setUsuarios([]);
        return;
      }
      setUsuarios(usuarios);
    }

    fetchUsuarios();
  }, []);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  async function registerUser(event) {
    event.preventDefault();

    let user = {... formData};
    let roles = await api.get("/roles");
    user.rol = roles.data.find((rol) => rol.name === "user");

    console.log(usuarios);
    if (usuarios && usuarios.find((usuario) => usuario.email === user.email)) {
      setErrorMsg("El email ya está registrado");
      return;
    }

    await api.post("/users", user)
      .then((response) => {
        console.log(response.data);
        login(user.email, user.password);
        router.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Registro</h2>
        <form className="space-y-4" onSubmit={registerUser}>
          <label className="block">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Apellido:</span>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Contraseña:</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </label>

          {errorMsg && <p className="text-red-500">{errorMsg}</p>}

          <input type="submit" value="Registrarse" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" />
        </form>
      </main>
    </div>
  );
}
