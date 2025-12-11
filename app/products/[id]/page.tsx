/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function ProductDetail() {
  const { id } = useParams(); 

  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const toggleFavorite = useCartStore((s) => s.toggleFavorite);
  const favorites = useCartStore((s) => s.favorites);
  const cart = useCartStore((s) => s.cart);

  const [product, setProduct] = useState<any>(null);

  const isFavorite = favorites.some((f) => f.id === Number(id));
  const isInCart = cart.some((p) => p.id === Number(id));

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchData();
  }, [id]);

  if (!product) return <p>Loading...</p>;

return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Imagen */}
      <div className="md:col-span-1 flex items-center justify-center">
        <div className="w-full max-w-xs h-56 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-h-full p-6"
          />
        </div>
      </div>

      {/* Detalles */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-3xl font-extrabold text-blue-600">${product.price}</div>
          <div className="text-sm text-gray-600">Precio final</div>
        </div>

        <div className="text-gray-700 leading-relaxed">
          <p>{product.description}</p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Favorito */}
          <button
            onClick={() => toggleFavorite(product)}
            className={`flex-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              isFavorite
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-700 border-gray-200 hover:bg-red-50"
            }`}
          >
            {isFavorite ? "❤️ Favorito" : "🤍 Favorito"}
          </button>

          {/* Carrito - si está en carrito, mostrar quitar */}
          {isInCart ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              🗑 Quitar del carrito
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              🛒 Agregar al carrito
            </button>
          )}
        </div>

        {/* Meta / acciones secundarias */}
        <div className="mt-4 text-sm text-gray-500">
          <span className="inline-block mr-4">Stock: <strong>Disponible</strong></span>
          <span>SKU: <strong>{product.id}</strong></span>
        </div>
      </div>
    </div>
  </div>
);
}
