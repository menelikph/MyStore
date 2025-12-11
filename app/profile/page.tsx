"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaUser, FaEnvelope, FaSignOutAlt, FaShoppingBag, FaHeart } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);
  const favorites = useCartStore((s) => s.favorites);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900">Mi Perfil</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {session ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" size={48} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {session.user?.name || "Usuario"}
                    </h2>
                    <p className="text-gray-600">{session.user?.email}</p>
                  </div>
                </div>

                <div className="space-y-6 border-t pt-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Nombre Completo</label>
                    <p className="text-lg text-gray-900 mt-1">{session.user?.name || "N/A"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-lg text-gray-900 mt-1">{session.user?.email}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Estado de Cuenta</label>
                    <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mt-1">
                      ✓ Verificado
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-8 flex items-center gap-2 w-full justify-center bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  <FaSignOutAlt size={18} />
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              {/* Cart Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <FaShoppingBag className="text-blue-600" size={32} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Productos en Carrito</p>
                    <p className="text-3xl font-bold text-gray-900">{cart.length}</p>
                  </div>
                </div>
                <Link
                  href="/cart"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Ver Carrito →
                </Link>
              </div>

              {/* Favorites Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-4 rounded-lg">
                    <FaHeart className="text-red-500" size={32} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Productos Favoritos</p>
                    <p className="text-3xl font-bold text-gray-900">{favorites.length}</p>
                  </div>
                </div>
                <Link
                  href="/favorites"
                  className="block text-center mt-4 text-pink-600 hover:text-pink-700 font-semibold"
                >
                  Ver Favoritos →
                </Link>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Enlaces Rápidos</h3>
                <div className="space-y-2">
                  <Link href="/products" className="block text-blue-600 hover:text-blue-700">
                    → Explorar Productos
                  </Link>
                  <Link href="/cart" className="block text-blue-600 hover:text-blue-700">
                    → Mi Carrito
                  </Link>
                  <Link href="/favorites" className="block text-blue-600 hover:text-blue-700">
                    → Mis Favoritos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <FaUser className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Por favor inicia sesión</h2>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Ir a Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}