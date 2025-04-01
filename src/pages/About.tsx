
import { Layout } from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=2070"
            alt="Gallery Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-white space-y-16">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-serif font-light tracking-wider">Sobre ArTendency</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Una plataforma creada por y para artistas, galeristas y coleccionistas
              </p>
            </div>
            
            <div className="space-y-12">
              <section className="space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                <h2 className="text-3xl font-serif font-light">Nuestra Misión</h2>
                <p className="text-lg text-white/80">
                  ArTendency nace con el propósito de democratizar el acceso al arte contemporáneo, 
                  creando un puente entre artistas emergentes y establecidos con coleccionistas y 
                  amantes del arte alrededor del mundo.
                </p>
                <p className="text-lg text-white/80">
                  Creemos firmemente en la importancia de la transparencia, la autenticidad y la 
                  trazabilidad en el mercado del arte, ofreciendo una plataforma que garantiza 
                  la procedencia y autenticidad de cada obra.
                </p>
              </section>
              
              <section className="space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                <h2 className="text-3xl font-serif font-light">Curaduría y Calidad</h2>
                <p className="text-lg text-white/80">
                  Cada artista y obra en ArTendency pasa por un riguroso proceso de selección 
                  y verificación. Nuestro comité curatorial, formado por profesionales del arte 
                  con amplia experiencia, evalúa cuidadosamente cada solicitud.
                </p>
                <p className="text-lg text-white/80">
                  Este enfoque nos permite mantener un alto nivel de calidad, ofreciendo a los 
                  coleccionistas la seguridad de invertir en obras auténticas con potencial 
                  artístico y económico.
                </p>
              </section>
              
              <section className="space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                <h2 className="text-3xl font-serif font-light">Una Comunidad Global</h2>
                <p className="text-lg text-white/80">
                  ArTendency es más que un marketplace: es una comunidad global que conecta 
                  a personas apasionadas por el arte. Artistas, galerías y coleccionistas de 
                  todo el mundo encuentran en nuestra plataforma un espacio para descubrir, 
                  conectar y crecer.
                </p>
                <p className="text-lg text-white/80">
                  Facilitamos el intercambio cultural y artístico sin fronteras, promoviendo 
                  el descubrimiento de nuevos talentos y tendencias desde cualquier rincón 
                  del planeta.
                </p>
              </section>
              
              <section className="space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                <h2 className="text-3xl font-serif font-light">Tecnología al Servicio del Arte</h2>
                <p className="text-lg text-white/80">
                  Utilizamos tecnología avanzada para crear una experiencia fluida y segura. 
                  Desde la autenticación de obras hasta transacciones seguras, nuestra plataforma 
                  está diseñada para ofrecer confianza y facilidad de uso.
                </p>
                <p className="text-lg text-white/80">
                  La trazabilidad completa de cada obra, combinada con herramientas de descubrimiento 
                  inteligentes, permite a coleccionistas encontrar piezas que resuenen con sus 
                  gustos y a artistas llegar a audiencias globales interesadas en su trabajo.
                </p>
              </section>
              
              <section className="space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
                <h2 className="text-3xl font-serif font-light">Únete a Nosotros</h2>
                <p className="text-lg text-white/80">
                  Te invitamos a formar parte de ArTendency, ya sea como artista, galería o coleccionista. 
                  Juntos, estamos redefiniendo el futuro del mercado del arte, haciéndolo más accesible, 
                  transparente y conectado.
                </p>
                <p className="text-lg text-white/80">
                  Descubre, colecciona y conecta a través del arte en ArTendency.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
