import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGetComplaintsAuthorites } from "../shared/hooks";

const ComplaintsAuthorities = () => {
  const { complaints, getComplaints } = useGetComplaintsAuthorites();

  useEffect(() => {
    getComplaints();
  }, []);

  if (!complaints) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a5c5c] to-[#217074]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-['Poppins']">Cargando denuncias...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B9D77] to-[#37745B] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con estilo */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-white font-['Playfair_Display'] tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Denuncias Recibidas
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-[#8B9D77] mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          ></motion.div>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto font-['Poppins']">
            Revisión de todas las denuncias reportadas por la comunidad
          </p>
        </motion.div>

        {/* Filtros y estadísticas */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-10 border border-white/20 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white font-['Poppins'] mb-4 md:mb-0">
              <h3 className="font-semibold text-lg">Filtros</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Todas", "Pendientes", "En proceso", "Resueltas"].map((filter, i) => (
                  <button 
                    key={i}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{complaints.length}</div>
                <div className="text-white/70 text-sm">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#8B9D77]">
                  {complaints.filter(c => c.statusComplaint === "Pendiente").length}
                </div>
                <div className="text-white/70 text-sm">Pendientes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de denuncias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint, index) => (
            <motion.div
              key={complaint._id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            >
              {/* Cabecera de la tarjeta */}
              <div 
                className={`p-4 ${
                  complaint.statusComplaint === "Resuelta" ? "bg-[#8B9D77]" : 
                  complaint.statusComplaint === "En proceso" ? "bg-[#37745b]" : "bg-[#217074]"
                } text-white`}
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold font-['Playfair_Display']">{complaint.type}</h2>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    {complaint.statusComplaint}
                  </span>
                </div>
                <p className="text-sm mt-1 font-['Poppins']">
                  {new Date(complaint.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              
              {/* Contenido de la denuncia */}
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#217074]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Poppins'] font-medium">Dirección:</span>
                  </div>
                  <p className="text-gray-700 pl-7">{complaint.address}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#217074]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Poppins'] font-medium">Descripción:</span>
                  </div>
                  <p className="text-gray-700 pl-7">{complaint.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-gray-600 text-sm font-medium font-['Poppins']">Evidencia</div>
                    <div className="text-gray-700 mt-1">
                      {complaint.evidence ? (
                        <span className="text-[#217074] font-medium">Adjuntada</span>
                      ) : (
                        <span className="text-gray-500">No disponible</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-sm font-medium font-['Poppins']">Tipo de reporte</div>
                    <div className="text-gray-700 mt-1">
                      {complaint.anonymous ? (
                        <span className="text-[#217074] font-medium">Anónimo</span>
                      ) : (
                        <span className="text-gray-700">Identificado</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 bg-[#217074] hover:bg-[#1a5c5c] text-white rounded-lg text-sm font-medium transition-colors">
                    Ver detalles
                  </button>
                  <button className="px-4 py-2 bg-white border border-[#217074] text-[#217074] hover:bg-[#f5f5f5] rounded-lg text-sm font-medium transition-colors">
                    Asignar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pie de página */}
        <div className="mt-12 text-center text-white/60 text-sm font-['Poppins']">
          Sistema de Gestión de Denuncias • v2.4.1 © {new Date().getFullYear()} Brigada Virtual
        </div>
      </div>
    </div>
  );
};

export default ComplaintsAuthorities;