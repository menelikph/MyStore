"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { FaTrash, FaShoppingBag } from "react-icons/fa";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900">Tu Carrito</h1>
          <p className="text-gray-600 mt-2">{cart.length} producto(s) en el carrito</p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <FaShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">Añade productos para continuar</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Precio
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-contain"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 line-clamp-2">
                              {item.title}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-blue-600 font-bold">${item.price}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 transition p-2"
                          >
                            <FaTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen</h3>

                <div className="space-y-4 mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos:</span>
                    <span className="font-semibold">${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-lg">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-blue-600">${(total * 1.1).toFixed(2)}</span>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                  Proceder al Pago
                </button>

                <Link
                  href="/products"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}