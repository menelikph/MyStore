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
    <div style={{ padding: "20px" }}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width={200} />
      <p>{product.description}</p>
      <p>${product.price}</p>

      <button onClick={() => toggleFavorite(product)}>
        {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
      </button>

      <br /><br />

      {isInCart ? (
        <button onClick={() => removeFromCart(product.id)}>
          🗑 Quitar del carrito
        </button>
      ) : (
        <button onClick={() => addToCart(product)}>
          🛒 Agregar al carrito
        </button>
      )}
    </div>
  );
}
