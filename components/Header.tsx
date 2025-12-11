"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaTruck, FaHeadset } from "react-icons/fa";
import Link from "next/link";

const heroImages = [
  {
    id: 1,
    title: "Bienvenido a MyStore",
    description: "Descubre los mejores productos",
    image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg",
    cta: "Ver Productos",
    ctaLink: "/products",
  },
  {
    id: 2,
    title: "Ofertas Exclusivas",
    description: "Hasta 50% de descuento",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=500&fit=crop",
    cta: "Comprar Ahora",
    ctaLink: "/products",
  },
  {
    id: 3,
    title: "Envío Gratis",
    description: "En compras mayores a $50",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop",
    cta: "Explorar",
    ctaLink: "/products",
  },
];

const features = [
  {
    icon: FaShoppingBag,
    title: "Productos de Calidad",
    description: "Amplio catálogo de artículos seleccionados",
  },
  {
    icon: FaTruck,
    title: "Envío Rápido",
    description: "Entrega en 24-48 horas",
  },
  {
    icon: FaHeadset,
    title: "Soporte 24/7",
    description: "Atención al cliente disponible siempre",
  },
];

export default function Header() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const item = heroImages[current];

  return (
    <>
      {/* Hero Carousel */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl shadow-2xl mt-4">
        {/* Imagen con transición suave */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: 1 }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

        {/* Contenido principal */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
            {item.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-6 md:mb-8 drop-shadow-md">
            {item.description}
          </p>
          <Link
            href={item.ctaLink}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {item.cta}
          </Link>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10"
          aria-label="Anterior"
        >
          <FaChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10"
          aria-label="Siguiente"
        >
          <FaChevronRight size={24} />
        </button>

        {/* Indicadores (Dots) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? "bg-white w-8 h-2"
                  : "bg-white/50 w-2 h-2 hover:bg-white/70"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Contador */}
        <div className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full font-semibold">
          {current + 1} / {heroImages.length}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12 px-4 md:px-0">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border-t-4 border-blue-600"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <IconComponent className="text-blue-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}