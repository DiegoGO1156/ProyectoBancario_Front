import { useState, useEffect } from 'react';
import { useBrands } from '../../shared/hooks/useBrand';

export const EditBrandModal = ({ 
  isOpen, 
  onClose, 
  brandToEdit,
  onUpdateSuccess // Callback para éxito
}) => {
  const { 
    updateBrand, 
    loading, 
    error, 
    success,
    resetState 
  } = useBrands();
  
  const [formData, setFormData] = useState({
    nameBrand: '',
    image: '',
    status: true
  });
  
  const [errors, setErrors] = useState({});

  // Resetear estado al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  // Rellenar formulario con datos
  useEffect(() => {
    if (brandToEdit) {
      setFormData({
        nameBrand: brandToEdit.nameBrand,
        image: brandToEdit.image || '',
        status: brandToEdit.status ?? true
      });
    }
  }, [brandToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameBrand.trim()) newErrors.nameBrand = 'Nombre requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !brandToEdit?._id) return;

    try {
      const updatedBrand = await updateBrand(brandToEdit._id, formData);
      
      if (onUpdateSuccess) {
        onUpdateSuccess(updatedBrand); // Notificar éxito al padre
      }
      
      onClose(); // Cerrar modal después de éxito
    } catch (error) {
      // El error ya está manejado en el hook
      console.error("Error completo:", error);
    }
  };

  if (!isOpen || !brandToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Marca</h2>
        
        {/* Mostrar error si existe */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {/* Mostrar éxito si corresponde */}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            ¡Marca actualizada con éxito!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario (igual que antes) */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              name="nameBrand"
              value={formData.nameBrand}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.nameBrand ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.nameBrand && (
              <p className="text-red-500 text-sm mt-1">{errors.nameBrand}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Imagen (URL)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
              disabled={loading}
            />
            <label className="ml-2 text-gray-700">Activo</label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};