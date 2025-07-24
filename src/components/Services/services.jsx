import { useState } from 'react';
import { useServices } from '../../shared/hooks/useService';
import { AddServiceModal } from './addService';
import { EditServiceModal } from './updateService';

export const ServiceGrid = () => {
  const { 
    services, 
    loading, 
    error, 
    refresh,
    addService,
    updateService,
    deleteService,
    resetState
  } = useServices();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredServices = services.filter(service => 
    service.nameService.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.brandName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    resetState();
    refresh();
  };

  const handleUpdateSuccess = () => {
    setEditingService(null);
    resetState();
    refresh();
  };

  // Efecto de carga esqueleto mejorado
  if (loading && !services.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white rounded-2xl shadow-md p-5 h-80 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return (
    <div className="mx-6 mt-6 animate-fade-in">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">{error}</p>
            <button 
              onClick={refresh}
              className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-all hover:scale-105"
            >
              <svg className="-ml-0.5 mr-1.5 h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6 animate-fade-in">
      {/* Encabezado con efecto de vidrio */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Barra de búsqueda con icono */}
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar servicios..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Botón de agregar con efecto hover */}
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Servicio
            </span>
          </button>
        </div>

        {/* Contador de resultados */}
        <p className="mt-4 text-sm text-gray-500 font-medium">
          Mostrando <span className="text-blue-600 font-bold">{filteredServices.length}</span> de <span className="text-gray-700">{services.length}</span> servicios
        </p>
      </div>

      {/* Estado vacío */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-pulse">
          <div className="mx-auto h-20 w-20 text-gray-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="animate-bounce">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {searchTerm ? 'No se encontraron servicios' : 'No hay servicios registrados'}
          </h3>
          <div className="mt-6 space-x-3">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
              >
                Limpiar búsqueda
              </button>
            )}
            <button 
              onClick={refresh}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-all hover:scale-105"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Recargar
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard 
              key={service._id} 
              service={service} 
              onEdit={() => setEditingService(service)}
              onDelete={() => deleteService(service._id)}
              isHovered={hoveredCard === service._id}
              onMouseEnter={() => setHoveredCard(service._id)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      )}

      {/* Modales */}
      <AddServiceModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
        addService={addService}
      />

      <EditServiceModal
        isOpen={!!editingService}
        onClose={() => setEditingService(null)}
        serviceToEdit={editingService}
        onSuccess={handleUpdateSuccess}
        updateService={updateService}
      />
    </div>
  );
};

const ServiceCard = ({ service, onEdit, onDelete, isHovered, onMouseEnter, onMouseLeave }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div 
      className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'transform -translate-y-2 shadow-lg' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Efecto de iluminación al hacer hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent pointer-events-none" />
      )}
      
      {/* Imagen con efecto de zoom */}
      <div className="h-48 bg-gray-100 overflow-hidden relative">
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.nameService} 
            className={`h-full w-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Badge de marca */}
      {service.brandName && (
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold text-white bg-blue-600 shadow-sm transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          {service.brandName}
        </div>
      )}

      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
          {service.nameService}
        </h3>
        
        {/* Acciones que aparecen al hacer hover */}
        <div className={`flex justify-end space-x-2 mt-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={onEdit}
            className="px-3 py-1.5 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-all hover:scale-105 text-sm"
          >
            Editar
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-3 py-1.5 rounded-md transition-all hover:scale-105 text-sm ${
              isDeleting 
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isDeleting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Eliminando
              </span>
            ) : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
};