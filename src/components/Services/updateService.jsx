import { useState, useEffect } from 'react';
import { useBrands } from '../../shared/hooks/useBrand';

export const EditServiceModal = ({ 
  isOpen, 
  onClose, 
  serviceToEdit,
  onSuccess,
  updateService
}) => {
  const { brands } = useBrands();
  const [formData, setFormData] = useState({
    nameService: '',
    image: '',
    brand: '',
    status: true
  });

  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        nameService: serviceToEdit.nameService,
        image: serviceToEdit.image || '',
        brand: serviceToEdit.brandName || '',
        status: serviceToEdit.status ?? true
      });
    }
  }, [serviceToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService(serviceToEdit._id, formData);
      onSuccess();
    } catch (err) {
      console.error("Error al actualizar servicio:", err);
    }
  };

  if (!isOpen || !serviceToEdit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo transparente con blur ligero */}
      <div 
        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal flotante */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto mx-4 border border-gray-200">
        <div className="p-6">
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Editar Servicio</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nombre del Servicio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nombre del Servicio *</label>
              <input
                type="text"
                value={formData.nameService}
                onChange={(e) => setFormData({...formData, nameService: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>

            {/* Campo URL de la Imagen */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>

            {/* Campo Marca */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Marca *</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
                required
              >
                <option value="">Seleccione una marca</option>
                {brands.map(brand => (
                  <option key={brand._id} value={brand.nameBrand}>
                    {brand.nameBrand}
                  </option>
                ))}
              </select>
            </div>
          

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};