import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lightbulb, Handshake, Lock, Phone, Mail } from 'lucide-react';

const HomePage = () => {
  // Variantes para animaciones escalonadas
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre la aparición de los hijos
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonHoverVariants = {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <>
      {/* Importa las mismas fuentes que en tu Sidebar */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#E7EAEF] text-gray-800 font-['Poppins'] overflow-hidden">
        {/* Sección Hero / Banner Principal */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="relative w-full h-[600px] flex items-center justify-center p-8 text-center"
          style={{
            backgroundImage: "linear-gradient(135deg, #1a5c5c 0%, #217074 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)", // Forma diagonal para un toque moderno
          }}
        >
          <motion.div variants={itemVariants} className="z-10 text-white max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-['Playfair Display'] font-extrabold leading-tight mb-6 drop-shadow-lg">
              Tu Voz, Nuestra Fuerza: Denuncia y Protege
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              En Brigada Virtual, te ofrecemos un espacio seguro y confidencial para reportar irregularidades.
              Juntos, construimos una comunidad más justa.
            </p>
            <motion.a
              href="/DashboardUsers" // Enlaza a la sección de "Cómo denunciar"
              whileHover={buttonHoverVariants}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-[#8B9D77] text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg
                         hover:bg-[#6c825a] transition-all duration-300 transform hover:-translate-y-1"
            >
              <ShieldCheck size={28} className="mr-3" />
              Haz tu Denuncia Ahora
            </motion.a>
          </motion.div>
          {/* Aquí podrías añadir una imagen superpuesta o patrón de fondo */}
          {/* <motion.img variants={imageVariants} src="/path/to/hero-image.png" alt="Personas unidas" className="absolute inset-0 w-full h-full object-cover opacity-20"/> */}
        </motion.section>

        {/* Sección de Información Clave / Cómo Funciona */}
        <section className="py-20 bg-white shadow-inner">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="max-w-6xl mx-auto px-6 text-center"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-['Playfair Display'] font-bold text-[#217074] mb-12">
              ¿Por Qué y Cómo Denunciar?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
                className="bg-[#E7EAEF] p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
              >
                <Lightbulb size={50} className="text-[#37745b] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1a5c5c] mb-3">Tu Impacto</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cada denuncia es un paso hacia un cambio positivo. Nos ayudas a identificar problemas y actuar eficazmente.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
                className="bg-[#E7EAEF] p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
              >
                <Lock size={50} className="text-[#b34444] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1a5c5c] mb-3">Confidencialidad</h3>
                <p className="text-gray-700 leading-relaxed">
                  Protegemos tu identidad. Puedes elegir denunciar de forma anónima si lo prefieres.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
                className="bg-[#E7EAEF] p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-300"
              >
                <Handshake size={50} className="text-[#8B9D77] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1a5c5c] mb-3">Proceso Claro</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nuestra plataforma es intuitiva y te guía paso a paso para que tu denuncia sea efectiva.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Sección "Cómo Hacer una Denuncia" (Guía visual) */}
        <section id="denunciar" className="py-20 bg-[#E7EAEF]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="max-w-6xl mx-auto px-6"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-['Playfair Display'] font-bold text-[#217074] text-center mb-12">
              Pasos para Denunciar
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Paso 1 */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="bg-[#217074] text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-[#1a5c5c] mb-3">Describe la Situación</h3>
                <p className="text-gray-700 leading-relaxed">
                  Detalla lo sucedido de forma clara y concisa. Incluye fechas, lugares y personas involucradas.
                </p>
                {/* Puedes añadir una imagen aquí */}
                {/* <motion.img variants={imageVariants} src="/path/to/step1-image.png" alt="Paso 1" className="mt-4 rounded-lg w-full h-48 object-cover"/> */}
              </motion.div>

              {/* Paso 2 */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="bg-[#37745b] text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-[#1a5c5c] mb-3">Adjunta Evidencia</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sube fotos, videos, documentos o cualquier archivo que respalde tu denuncia.
                </p>
                {/* Puedes añadir una imagen aquí */}
                {/* <motion.img variants={imageVariants} src="/path/to/step2-image.png" alt="Paso 2" className="mt-4 rounded-lg w-full h-48 object-cover"/> */}
              </motion.div>

              {/* Paso 3 */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="bg-[#8B9D77] text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-[#1a5c5c] mb-3">Envía y Sigue tu Caso</h3>
                <p className="text-gray-700 leading-relaxed">
                  Una vez enviada, podrás hacer seguimiento al estado de tu denuncia y recibir actualizaciones.
                </p>
                {/* Puedes añadir una imagen aquí */}
                {/* <motion.img variants={imageVariants} src="/path/to/step3-image.png" alt="Paso 3" className="mt-4 rounded-lg w-full h-48 object-cover"/> */}
              </motion.div>
            </div>
            <div className="text-center mt-12">
                <motion.a
                    href="/DashboardUsers" // Enlace real al formulario de denuncia
                    whileHover={buttonHoverVariants}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center bg-[#217074] text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg
                             hover:bg-[#1a5c5c] transition-all duration-300 transform hover:-translate-y-1"
                >
                    Iniciar mi Denuncia
                </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Sección de CTA y Contacto */}
        <section className="py-20 bg-[#217074] text-white">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="max-w-6xl mx-auto px-6 text-center"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-['Playfair Display'] font-bold mb-8">
              ¿Tienes Preguntas? Contáctanos
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl mb-12 opacity-90 leading-relaxed">
              Estamos aquí para ayudarte. Si tienes dudas o necesitas asistencia, no dudes en contactarnos.
            </motion.p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <motion.a
                variants={itemVariants}
                href="tel:+50212345678" // Número de teléfono de ejemplo
                whileHover={buttonHoverVariants}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-white text-[#217074] font-bold py-4 px-8 rounded-full text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Phone size={24} className="mr-3" />
                Llámanos
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="mailto:contacto@brigadavirtual.com" // Correo de ejemplo
                whileHover={buttonHoverVariants}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-white text-[#217074] font-bold py-4 px-8 rounded-full text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Mail size={24} className="mr-3" />
                Envíanos un Email
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-[#1a5c5c] text-center text-white/70 text-sm">
          <div className="max-w-6xl mx-auto px-6">
            © 2025 Brigada Virtual. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;