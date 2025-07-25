import { useState, useEffect } from 'react';
import { useBrands } from '../../shared/hooks/useBrand';
import { useServices } from '../../shared/hooks/useService';

export const AddServiceModal = ({ isOpen, onClose, onSuccess, addService }) => {
  const { brands } = useBrands();
  const { services } = useServices();
  const [formData, setFormData] = useState({
    nameService: '',
    image: '',
    brand: ''
  });
  const [validation, setValidation] = useState({
    isValid: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.nameService.length === 0) {
      setValidation({ isValid: false, message: '' });
      return;
    }

    if (formData.nameService.length < 3) {
      setValidation({ 
        isValid: false, 
        message: 'El nombre debe tener al menos 3 caracteres' 
      });
      return;
    }

    const nameExists = services.some(
      service => service.nameService.toLowerCase() === formData.nameService.toLowerCase()
    );

    setValidation({
      isValid: !nameExists,
      message: nameExists 
        ? 'Este nombre de servicio ya existe' 
        : 'Nombre disponible'
    });
  }, [formData.nameService, services]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation.isValid) return;

    setIsSubmitting(true);
    try {
      await addService(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

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
            <h2 className="text-2xl font-bold text-gray-800">Agregar Nuevo Servicio</h2>
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
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  validation.message
                    ? validation.isValid
                      ? 'border-green-500 focus:ring-green-200'
                      : 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                disabled={isSubmitting}
              />
              {validation.message && (
                <p className={`text-sm ${
                  validation.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {validation.message}
                </p>
              )}
            </div>

            {/* Campo URL de la Imagen */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                <option value="">Seleccione una marca</option>
                {brands.map((brand) => (
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
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting || !validation.isValid}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : 'Guardar Servicio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};