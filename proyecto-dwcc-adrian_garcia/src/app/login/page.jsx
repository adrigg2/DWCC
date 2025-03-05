"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { useSearchParams } from 'next/navigation'
import { db } from "@/js/api";

export default function FormRegistro() {
  const { login } = useAuth();
  const { addToCart } = useCart();
  const searchParams = useSearchParams()

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  async function loginUser(event) {
    event.preventDefault();

    await login(formData.email, formData.password);

    const addProduct = searchParams.get('add');

    if (addProduct) {
      db.get(`/products/${addProduct}`)
            .then(async (response) => {
                addToCart(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    router.push('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Log in</h2>
        <form className="space-y-4" onSubmit={loginUser}>
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

          <input type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" value="Inciar sesión"/>
        </form>
      </main>
    </div>
  );
}
