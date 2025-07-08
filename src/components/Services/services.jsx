import { useState, useEffect } from 'react';
import { useServices } from '../../shared/hooks/useService'; // Asegúrate de que la ruta sea correcta
import { AddServiceModal } from './addService'; // Asegúrate de que la ruta sea correcta

const ServiceGrid = ({onEditService}) => {
  const { services, loading, error, refresh } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar servicios cuando cambia el término de búsqueda o la lista de servicios
  useEffect(() => {
    const filtered = services.filter(service => 
      service.nameService.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4 h-64 animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 mx-4">
      <div className="flex items-center">
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
          <button 
            onClick={refresh}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      {/* Barra de búsqueda */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Buscar servicios por nombre o marca..."
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg 
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button 
                 onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md mb-20 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                 + Agregar Service
              </button>
              <AddServiceModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>

      {/* Contador de resultados */}
      <p className="text-sm text-gray-500 text-center">
        Mostrando {filteredServices.length} de {services.length} servicios
      </p>

      {/* Grid de servicios */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? 'No se encontraron servicios' : 'No hay servicios registrados'}
          </h3>
          <button 
            onClick={refresh}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Recargar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Imagen del servicio */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.nameService} 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-gray-400 p-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span className="block mt-2">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {service.nameService}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {service.brand?.nameBrand || service.brandName || 'Sin marca'}
          </span>
        </div>

        {/* Botón de edición */}
        <div className="mt-4 flex justify-end space-x-2">
          <button 
            onClick={() => onEditService(service)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;