import { useState, useEffect } from 'react';
import { useBrands } from '../../shared/hooks/useBrand'; // Asegúrate de que la ruta sea correcta
import { useServices } from '../../shared/hooks/useService'; // Asegúrate de que la ruta sea correcta

export const EditServiceModal = ({ 
  isOpen, 
  onClose, 
  serviceToEdit,
  onUpdateSuccess 
}) => {
  const { brands, loading: loadingBrands } = useBrands();
  const { 
    updateService, 
    loading, 
    error, 
    success,
    resetState 
  } = useServices();
  
  const [formData, setFormData] = useState({
    nameService: '',
    image: '',
    brand: '', // Almacenará el nameBrand (como espera el backend)
    status: true
  });
  
  const [errors, setErrors] = useState({});

  // Resetear estado al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  // Rellenar formulario con datos del servicio a editar
  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        nameService: serviceToEdit.nameService,
        image: serviceToEdit.image || '',
        brand: serviceToEdit.brand?.nameBrand || serviceToEdit.brandName || '', // Usa nameBrand
        status: serviceToEdit.status ?? true
      });
    }
  }, [serviceToEdit]);

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
    if (!formData.nameService.trim()) newErrors.nameService = 'Nombre requerido';
    if (!formData.brand) newErrors.brand = 'Marca requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !serviceToEdit?._id) return;

    try {
      // Preparamos los datos en el formato que espera el backend
      const updateData = {
        nameService: formData.nameService,
        image: formData.image,
        brand: formData.brand, // Enviamos el nameBrand
        status: formData.status
      };

      const updatedService = await updateService(serviceToEdit._id, updateData);
      
      if (onUpdateSuccess) {
        onUpdateSuccess(updatedService);
      }
      
      onClose();
    } catch (error) {
      console.error("Error al actualizar servicio:", error);
    }
  };

  if (!isOpen || !serviceToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Servicio</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            ¡Servicio actualizado con éxito!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Nombre del Servicio *</label>
            <input
              type="text"
              name="nameService"
              value={formData.nameService}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.nameService ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.nameService && (
              <p className="text-red-500 text-sm mt-1">{errors.nameService}</p>
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Seleccione la nueva marca o la misma</label>
            {loadingBrands ? (
              <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
            ) : (
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              >
                <option value="">Seleccione una marca</option>
                {brands.map(brand => (
                  <option key={brand._id} value={brand.nameBrand}>
                    {brand.nameBrand}
                  </option>
                ))}
              </select>
            )}
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
            )}
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