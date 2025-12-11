"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

export default function AppNavbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const favorites = useCartStore((state) => state.favorites);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🛍️ MyStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/products" className="hover:text-blue-600 transition">
            Productos
          </Link>

          <Link href="/favorites" className="flex items-center gap-2 hover:text-pink-600 transition">
            <FaHeart className="text-red-500" />
            Favoritos
            {favorites.length > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="flex items-center gap-2 hover:text-green-600 transition">
            <FaShoppingCart />
            Carrito
            {cart.length > 0 && (
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Auth Desktop */}
        <div className="hidden md:flex gap-4 items-center">
          {!session ? (
            <>
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
                <FaUser size={16} />
                {session.user?.name || "Usuario"}
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 flex flex-col gap-4">
          <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
            Productos
          </Link>

          <Link href="/favorites" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-pink-600">
            ❤️ Favoritos ({favorites.length})
          </Link>

          <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-green-600">
            🛒 Carrito ({cart.length})
          </Link>

          <div className="border-t pt-4 flex flex-col gap-2">
            {!session ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded text-center">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-blue-600 text-blue-600 rounded text-center">
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded text-center">
                  Mi Perfil
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}