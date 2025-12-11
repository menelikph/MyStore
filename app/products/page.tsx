/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/fakeStore";
import Link from "next/link";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((s) => s.addToCart);
  const toggleFavorite = useCartStore((s) => s.toggleFavorite);
  const favorites = useCartStore((s) => s.favorites);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data || []);
        setFilteredProducts(data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    } else {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(filtered);
  }, [category, sortBy, products]);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-lg text-gray-600">Cargando productos…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Nuestros Productos</h1>
          <p className="text-gray-600">Encontrados {filteredProducts.length} productos</p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-48 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={category === cat}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ordenar</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Nombre (A-Z)</option>
                  <option value="price-low">Precio (Menor)</option>
                  <option value="price-high">Precio (Mayor)</option>
                  <option value="rating">Calificación</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-xl text-gray-600">No se encontraron productos.</p>
                <button
                  onClick={() => {
                    setCategory("all");
                    setSortBy("name");
                  }}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p: any) => {
                  const isFavorite = favorites.some((fav) => fav.id === p.id);

                  return (
                    <Link key={p.id} href={`/products/${p.id}`} className="block">
                      <div className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                        {/* Image */}
                        <div className="relative h-64 bg-gray-200 overflow-hidden group">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(p);
                            }}
                            className={`absolute top-3 right-3 p-2 rounded-full transition ${
                              isFavorite
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white"
                            }`}
                            aria-label="Toggle favorite"
                          >
                            <FaHeart size={18} />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-800 mb-2" style={{ minHeight: 40 }}>
                            {p.title}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                size={14}
                                className={i < Math.floor(p.rating?.rate || 4) ? "text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({p.rating?.count || 0})</span>
                          </div>

                          {/* Price */}
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold text-blue-600">${p.price}</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Stock</span>
                          </div>

                          {/* Add to Cart (prevent link navigation when clicked) */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(p);
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                          >
                            <FaShoppingCart size={16} />
                            Agregar al Carrito
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}