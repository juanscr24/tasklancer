import Image from "next/image";

interface HeroCardProps {
  src: string;
  alt: string;
  className?: string; // Aquí recibiremos las posiciones y rotaciones
}

export const HeroCard = ({ src, alt, className = "" }: HeroCardProps) => {
  return (
    <div className={`absolute group ${className}`}>
      {/* 
         EFECTO DE GLOW / BORDE ANIMADO
         - Es un div absoluto detrás de la imagen.
         - Tiene un gradiente (cyan -> purple).
         - opacity-0 por defecto, opacity-100 en hover (group-hover).
         - blur-md para que parezca luz difusa.
      */}
      <div className="absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200 will-change-[opacity,transform]" />
      
      {/* CONTENEDOR DE LA IMAGEN */}
      <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Brillo sutil sobre la imagen (opcional) */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      </div>
    </div>
  );
};
