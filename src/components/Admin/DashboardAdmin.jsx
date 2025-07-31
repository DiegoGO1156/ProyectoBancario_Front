import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ShieldCheck, FileText, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  // Variantes para animaciones escalonadas
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Retraso entre la aparición de los hijos
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <>
      {/* Importa las mismas fuentes que en tu Sidebar */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#E7EAEF] flex flex-col items-center justify-center p-8 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="w-full max-w-6xl space-y-10" // Contenedor principal con más espacio
        >
          {/* Título del Panel de Administrador */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-8 text-[#217074] font-['Playfair Display'] font-bold text-5xl text-center"
          >
            <ShieldCheck size={50} className="mr-4 text-[#1a5c5c]" />
            Panel de Administración
          </motion.div>

          {/* Sección de Descripción del Rol */}
          <motion.div
            variants={itemVariants}
            className="p-8 bg-[#217074]/10 rounded-2xl border border-[#217074]/20 shadow-xl"
            style={{
              backgroundImage: "linear-gradient(160deg, #ffffff 0%, #f0f4f8 100%)",
            }}
          >
            <h3 className="text-2xl font-['Poppins'] font-bold text-[#1a5c5c] mb-4 flex items-center">
              <FileText size={28} className="mr-2 text-[#37745b]" />
              Tu Rol Fundamental
            </h3>
            <p className="text-gray-700 font-['Poppins'] leading-relaxed text-lg">
              Como <strong className="text-[#217074]">administrador</strong>, eres el cerebro detrás de la justicia en nuestra plataforma. Tienes el poder de{" "}
              <span className="font-semibold text-[#8B9D77]">validar</span>,{" "}
              <span className="font-semibold text-[#b34444]">rechazar</span> y{" "}
              <span className="font-semibold text-[#217074]">gestionar</span> cada denuncia para asegurar un ambiente seguro y equitativo. Tu visión y decisiones son clave para la integridad de Brigada Virtual. ¡Gracias por tu dedicación!
            </p>
          </motion.div>

          {/* Tarjetas de Métricas (Más Dinámico) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center justify-center text-center"
            >
              <TrendingUp size={40} className="text-[#8B9D77] mb-3" />
              <h4 className="font-['Poppins'] font-bold text-3xl text-gray-800">125</h4>
              <p className="font-['Poppins'] text-gray-600">Denuncias Aceptadas</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center justify-center text-center"
            >
              <Clock size={40} className="text-[#217074] mb-3" />
              <h4 className="font-['Poppins'] font-bold text-3xl text-gray-800">18</h4>
              <p className="font-['Poppins'] text-gray-600">Denuncias Pendientes</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center justify-center text-center"
            >
              <XCircle size={40} className="text-[#b34444] mb-3" />
              <h4 className="font-['Poppins'] font-bold text-3xl text-gray-800">7</h4>
              <p className="font-['Poppins'] text-gray-600">Denuncias Rechazadas</p>
            </motion.div>
          </div>

          {/* Sección de Denuncia Destacada/Urgente */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
            className="bg-[#37745b]/10 rounded-2xl p-6 border border-[#37745b]/20 shadow-lg cursor-pointer"
            onClick={() => alert('¡Revisando Denuncia Destacada!')}
          >
            <div className="flex items-center mb-4">
              <AlertTriangle size={36} className="text-[#b34444] mr-3 animate-pulse" />
              <h3 className="font-['Playfair Display'] font-bold text-3xl text-[#37745b]">
                Denuncia Pendiente: <span className="text-[#b34444]">URGENTE</span>
              </h3>
            </div>
            <p className="font-['Poppins'] text-gray-700 mb-3 text-lg">
              **ID:** #BV2025-00123
            </p>
            <p className="font-['Poppins'] text-gray-600 italic text-md">
              "Hay actividad sospechosa en la calle Principal #123, reportan ruidos extraños por la noche..."
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500 font-['Poppins']">
              <span>Fecha: 25/07/2025</span>
              <span>Categoría: Disturbios</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#1a5c5c" }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-3 bg-[#217074] text-white font-['Poppins'] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Ver Detalles Completos
            </motion.button>
          </motion.div>

          {/* Barra de Progreso Simulada */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <h3 className="font-['Poppins'] font-bold text-xl text-[#217074] mb-3">Progreso de Tareas Diarias</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }} // Simula un progreso del 75%
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                className="bg-[#8B9D77] h-full rounded-full"
              ></motion.div>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                75% Completado
              </span>
            </div>
            <p className="font-['Poppins'] text-sm text-gray-500 mt-2">
              Revisando denuncias en cola... ¡Casi listo!
            </p>
          </motion.div>


          {/* Contenedor de Botones - Al final para acciones principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Botón Aceptar Denuncias */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 px-8 py-5 bg-[#8B9D77] text-white
                         font-['Poppins'] font-bold text-xl rounded-xl shadow-lg
                         transition-all duration-300 ease-in-out
                         hover:bg-[#6c825a] hover:rotate-2"
              onClick={() => alert('¡Denuncia Aceptada! (Lógica a implementar)')}
            >
              <CheckCircle size={32} />
              Aceptar Denuncias
            </motion.button>

            {/* Botón Rechazar Denuncias */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 px-8 py-5 bg-[#b34444] text-white
                         font-['Poppins'] font-bold text-xl rounded-xl shadow-lg
                         transition-all duration-300 ease-in-out
                         hover:bg-[#993434] hover:-rotate-2"
              onClick={() => alert('¡Denuncia Rechazada! (Lógica a implementar)')}
            >
              <XCircle size={32} />
              Rechazar Denuncias
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminDashboard;