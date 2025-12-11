"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

export default function FavoritesPage() {
  const favorites = useCartStore((s) => s.favorites);
  const toggleFavorite = useCartStore((s) => s.toggleFavorite);
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <FaHeart className="text-red-500" />
            Mis Favoritos
          </h1>
          <p className="text-gray-600 mt-2">{favorites.length} producto(s) en favoritos</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <FaHeart className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No tienes favoritos</h2>
            <p className="text-gray-600 mb-8">Agrega productos a tus favoritos para verlos aquí</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 bg-gray-200 overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <FaHeart size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-blue-600">${item.price}</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <FaShoppingCart size={16} />
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}