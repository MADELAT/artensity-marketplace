
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Globe, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animaciones para elementos al hacer scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <Layout>
      {/* Hero Section con Parallax */}
      <div 
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url(https://unsplash.com/photos/C5s_V9SNXmI/download?force=true)` 
        }}
      >
        {/* Overlay para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>
        
        {/* Contenido del Hero */}
        <div className="container mx-auto relative z-10 text-center px-4 py-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-serif text-white mb-4 tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sobre ArTendency
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 italic font-serif max-w-3xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            "El arte no se explica, se respira. Esta es nuestra forma de respirar."
          </motion.p>
        </div>
      </div>
      
      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-24">
          {/* Nuestra Misión */}
          <motion.section 
            className="grid md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light">Nuestra Misión</h2>
              <p className="text-lg text-muted-foreground">
                ArTendency nace con el propósito de democratizar el acceso al arte contemporáneo, 
                tejiendo un puente invisible entre artistas emergentes y establecidos con coleccionistas y 
                amantes del arte alrededor del mundo.
              </p>
              <p className="text-lg text-muted-foreground">
                Creemos firmemente en la magia de la transparencia, la autenticidad y la 
                trazabilidad en el mercado del arte, ofreciendo un espacio donde cada obra 
                cuenta su historia, desde su concepción hasta su nuevo hogar.
              </p>
            </motion.div>
            
            <motion.div 
              className="aspect-square bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
              variants={fadeInUp}
              style={{ 
                backgroundImage: `url(https://unsplash.com/photos/ieHjFj4lZvo/download?force=true)` 
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-transparent"></div>
            </motion.div>
          </motion.section>
          
          {/* Curaduría y Calidad */}
          <motion.section 
            className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="space-y-6 md:order-2" variants={fadeInUp}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light">Curaduría y Calidad</h2>
              <p className="text-lg text-muted-foreground">
                Cada artista y obra en ArTendency atraviesa un delicado proceso de selección 
                y verificación. Nuestro comité curatorial, formado por almas entregadas al arte
                con décadas de experiencia, evalúa cuidadosamente cada pincelada, cada concepto.
              </p>
              <p className="text-lg text-muted-foreground">
                Este enfoque nos permite crear un ecosistema de excelencia donde los 
                coleccionistas encuentran la confianza de invertir en piezas auténticas con 
                valor artístico y potencial que trasciende el tiempo.
              </p>
            </motion.div>
            
            <motion.div 
              className="aspect-square bg-cover bg-center rounded-lg shadow-xl overflow-hidden md:order-1"
              variants={fadeInUp}
              style={{ 
                backgroundImage: `url(https://unsplash.com/photos/UsUfpYMBgRo/download?force=true)` 
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-transparent"></div>
            </motion.div>
          </motion.section>
          
          {/* Una Comunidad Global */}
          <motion.section 
            className="grid md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light">Una Comunidad Global</h2>
              <p className="text-lg text-muted-foreground">
                ArTendency es mucho más que un marketplace: es un ecosistema vibrante que conecta 
                a almas apasionadas por la expresión artística. Artistas, galerías y coleccionistas de 
                todo el mundo encuentran aquí un lienzo en blanco para descubrir, 
                conectar y crecer.
              </p>
              <p className="text-lg text-muted-foreground">
                Facilitamos el diálogo cultural y artístico sin fronteras, celebrando 
                el descubrimiento de nuevas voces y tendencias desde cualquier rincón 
                del planeta, tejiendo una red global unida por la belleza.
              </p>
            </motion.div>
            
            <motion.div 
              className="aspect-square bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
              variants={fadeInUp}
              style={{ 
                backgroundImage: `url(https://unsplash.com/photos/9I2W5-7Kp4k/download?force=true)` 
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-transparent"></div>
            </motion.div>
          </motion.section>
          
          {/* CTA Final */}
          <motion.section 
            className="text-center py-8 md:py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-light mb-6"
              variants={fadeInUp}
            >
              Únete a Nosotros
            </motion.h2>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
              variants={fadeInUp}
            >
              Te invitamos a formar parte del universo ArTendency, ya sea como artista, galería o coleccionista. 
              Juntos, estamos reescribiendo el futuro del mercado del arte, haciéndolo más accesible, 
              transparente y conectado.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Button size="lg" className="font-serif">
                Descubre más <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
