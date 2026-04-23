"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductZoom({ src, alt }) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  
  // Configuración de la lupa
  const magnifierHeight = 250;
  const magnifierWidth = 250;
  const zoomLevel = 2.5;

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    
    // Calcular posición del cursor relativa a la imagen
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  return (
    <div 
      className="relative h-[450px] w-full border border-slate-200 bg-white flex items-center justify-center cursor-none lg:cursor-crosshair overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowMagnifier(false)}
    >
      {/* Imagen Principal */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-10"
        priority
      />

      {/* Lupa Redonda */}
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            borderRadius: "50%",
            border: "3px solid #2563eb", // Azul Blue-600
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            zIndex: 50
          }}
        />
      )}
    </div>
  );
}