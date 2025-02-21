"use client";

import { useEffect, useState } from "react";
import { api } from "@/js/api";

export default function FormRegistro() {
  const [formData, setFormData] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuarios = api.get("/users").data;
    setUsuarios(usuarios);
  }, [usuarios.length]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  async function registerUser() {
    let user = {... formData};
    let roles = await api.get("/roles");
    user.rol = roles.data.find((rol) => rol.name === "user");

    await api.post("/users", user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Registro</h2>
        <form className="space-y-4" method="post">
          <label className="block">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Apellido:</span>
            <input
              type="text"
              name="apellido"
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
              name="contrasena"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
          </label>

          <button
            type="button"
            onClick={registerUser}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Registrarse
          </button>
        </form>
      </main>
    </div>
  );
}
