import { useState } from 'react';
import { useBrands } from '../../shared/hooks/useBrand';


export const AddBrandModal = ({ isOpen, onClose }) => {
  const { addBrand, loading, error: apiError } = useBrands();
  const [formData, setFormData] = useState({
    nameBrand: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nameBrand.trim()) errors.nameBrand = 'El nombre es requerido';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const success = await addBrand(formData);
      if (success) {
        setFormData({ nameBrand: '', image: '' }); 
        onClose(); 
      }
    } catch (error) {
      
      console.error("Error en el modal:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl font-bold mb-4">Agregar Nueva Marca</h2>
        
        {/* Mostrar errores de API */}
        {apiError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            Error: {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="nameBrand" className="block text-gray-700 mb-1 font-medium">
              Nombre de la marca *
            </label>
            <input
              id="nameBrand"
              type="text"
              name="nameBrand"
              value={formData.nameBrand}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formErrors.nameBrand 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
              disabled={loading}
              autoFocus
            />
            {formErrors.nameBrand && (
              <p className="text-red-500 text-xs mt-1">{formErrors.nameBrand}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 mb-1 font-medium">
              URL de la imagen
            </label>
            <input
              id="image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={loading}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

