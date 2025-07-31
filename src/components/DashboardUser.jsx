import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, PlusCircle, History, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import Sidebar from "./SideBar"

export const DashboardUser = () => {
    const navigate = useNavigate();
    const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const userReports = [
    { id: '#BV2025-00123', title: 'Actividad sospechosa en la calle Principal', status: 'pending' },
    { id: '#BV2025-00120', title: 'Basura acumulada en el parque', status: 'accepted' },
    { id: '#BV2025-00115', title: 'Falla en el alumbrado público', status: 'accepted' },
    { id: '#BV2025-00108', title: 'Denuncia por ruido excesivo', status: 'rejected' },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <div className="flex bg-[#E7EAEF] min-h-screen">
        <Sidebar />

        <div className="flex-1 overflow-auto p-8">
            <div className="w-full max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="space-y-10 pt-8"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center text-[#217074] font-['Playfair Display'] font-bold text-5xl text-center"
                    >
                        <ShieldCheck size={50} className="mr-4 text-[#1a5c5c]" />
                        Panel de Usuario
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="p-8 bg-[#217074]/10 rounded-2xl border border-[#217074]/20 shadow-xl"
                        style={{
                            backgroundImage: "linear-gradient(160deg, #ffffff 0%, #f0f4f8 100%)",
                        }}
                    >
                        <h3 className="text-2xl font-['Poppins'] font-bold text-[#1a5c5c] mb-4 flex items-center">
                            <PlusCircle size={28} className="mr-2 text-[#37745b]" />
                            Tu Participación es Clave
                        </h3>
                        <p className="text-gray-700 font-['Poppins'] leading-relaxed text-lg">
                            Gracias por ser parte activa de nuestra comunidad. Desde este panel, puedes {" "}
                            <strong className="text-[#217074]">crear nuevas denuncias</strong> para mantener tu entorno seguro y{" "}
                            <span className="font-semibold text-[#8B9D77]">revisar el estado</span> de las que ya has publicado.
                            Tu colaboración es esencial para construir un mejor futuro.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer bg-[#8B9D77] p-8 rounded-2xl shadow-lg text-white text-center flex flex-col items-center justify-center"
                        onClick={() => navigate("/Complaint")}
                      >
                        <PlusCircle size={60} className="mb-4" />
                        <h3 className="font-['Playfair Display'] font-bold text-4xl">
                            Agregar Nueva Denuncia
                        </h3>
                        <p className="font-['Poppins'] text-lg mt-2 opacity-80">
                            Reporta una situación de manera rápida y segura.
                        </p>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer bg-[#217074] p-8 rounded-2xl shadow-lg text-white text-center flex flex-col items-center justify-center"
                        onClick={() => navigate("/ComplaintState")}
                      >
                        <History size={60} className="mb-4" />
                        <h3 className="font-['Playfair Display'] font-bold text-4xl">
                            Ver mis denuncias
                        </h3>
                        <p className="font-['Poppins'] text-lg mt-2 opacity-80">
                            Visualiza el estado de tus reportes.
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="p-8 bg-white rounded-2xl border border-gray-100 shadow-md"
                    >
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6 w-full py-3 bg-[#217074] text-white font-['Poppins'] font-semibold rounded-lg shadow-md hover:bg-[#1a5c5c] transition-colors"
                            onClick={() => navigate("/ComplaintState")}
                        >
                            Ver Todas mis Denuncias
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
      </div>
    </>
  );
};

export default DashboardUser;