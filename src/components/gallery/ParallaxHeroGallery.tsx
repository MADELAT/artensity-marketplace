// ParallaxHeroGallery.tsx – Hero modular con sombra reforzada para máxima legibilidad

interface ParallaxHeroGalleryProps {
    image: string;
    name: string;
    quote: string;
  }
  
  export default function ParallaxHeroGallery({ image, name, quote }: ParallaxHeroGalleryProps) {
    return (
      <div
        className="relative h-[80vh] w-full bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Overlay oscuro y suave */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
  
        {/* Contenido del hero */}
        <div className="relative z-10 h-full w-full flex flex-col justify-center max-w-7xl mx-auto px-6 py-16 text-center pointer-events-none">
          <div />
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight tracking-wide text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
            {name}
          </h1>
          <p className="text-lg italic text-gray-200 mt-6 mb-2 drop-shadow-[0_6px_12px_rgba(0,0,0,0.75)]">
            {quote}
          </p>
        </div>
      </div>
    );
  }
  