
import { useMemo } from "react";

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  quote?: string;
}

const artQuotes = [
  "El arte es la mentira que nos permite comprender la verdad.",
  "El arte lava del alma el polvo de la vida cotidiana.",
  "El propósito del arte es lavar el polvo de la vida diaria de nuestras almas.",
  "El arte debería confortar a los perturbados y perturbar a los confortables.",
  "Todo niño es un artista. El problema es cómo seguir siendo artista una vez que crecemos.",
  "El arte es libertad. Ser artista es no temer equivocarse.",
  "La creatividad toma valor, deja ir la certeza.",
  "El arte es una línea alrededor de tus pensamientos.",
  "La belleza perece en la vida, pero es inmortal en el arte.",
  "El arte no reproduce lo visible; más bien, hace visible lo invisible.",
];

// Arreglo de URLs de imágenes de fondos artísticos
const backgroundImages = [
  "https://unsplash.com/photos/91HeDF6fjVQ/download?force=true",
  "https://unsplash.com/photos/UsUfpYMBgRo/download?force=true",
  "https://unsplash.com/photos/zZPeoLxLRyM/download?force=true",
  "https://unsplash.com/photos/yRmlkP9VShE/download?force=true",
  "https://unsplash.com/photos/ieHjFj4lZvo/download?force=true",
  "https://unsplash.com/photos/9I2W5-7Kp4k/download?force=true",
  "https://unsplash.com/photos/sfDf_z-iJ1c/download?force=true",
  "https://unsplash.com/photos/e5LdlAMpkEw/download?force=true",
  "https://unsplash.com/photos/C5s_V9SNXmI/download?force=true",
  "https://unsplash.com/photos/2Y3AhqTIqNo/download?force=true",
  "https://unsplash.com/photos/NAOlAo6ufxA/download?force=true",
  "https://unsplash.com/photos/wQLAGv4_OYs/download?force=true",
  "https://unsplash.com/photos/zKnQnyARggY/download?force=true",
  "https://unsplash.com/photos/-MCrF6hnojU/download?force=true"
];

export default function ParallaxHero({ title, subtitle, quote }: ParallaxHeroProps) {
  // Seleccionar aleatoriamente una imagen de fondo y una cita
  const randomBackground = useMemo(() => {
    return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  }, []);

  const randomQuote = useMemo(() => {
    return quote || artQuotes[Math.floor(Math.random() * artQuotes.length)];
  }, [quote]);

  return (
    <div
      className="relative h-[50vh] w-full bg-center bg-cover"
      style={{ 
        backgroundImage: `url(${randomBackground})`,
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Contenido del héroe */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center items-center py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 tracking-wide drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
          {title}
        </h1>
        <p className="text-md md:text-lg text-white/90 max-w-2xl mb-8">
          {subtitle}
        </p>
        <p className="text-lg md:text-xl italic text-white/80 mt-4 max-w-2xl font-serif drop-shadow-[0_6px_12px_rgba(0,0,0,0.75)]">
          "{randomQuote}"
        </p>
      </div>
    </div>
  );
}
