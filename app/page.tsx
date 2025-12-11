/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/Header";
import { getProducts } from "@/lib/fakeStore";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 8);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
          <p className="text-xl text-gray-600">Descubre nuestras mejores ofertas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((p: any) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer group">
                {/* Image Container */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
                    <FaHeart size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
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
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">${p.price}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      En stock
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </section>
    </main>
  );
}