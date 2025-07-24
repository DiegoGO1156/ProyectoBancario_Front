import { useState } from 'react';
import { useBrands } from '../../shared/hooks/useBrand';
import { useServices } from '../../shared/hooks/useService'; // Asegúrate de que la ruta sea correcta

export const AddServiceModal = ({ isOpen, onClose }) => {
  const { brands } = useBrands();
  const { addService, loading, error } = useServices();
  const [formData, setFormData] = useState({
    nameService: '',
    image: '',
    brand: '' // Ahora será el nombre de la marca (string)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addService(formData); // Envía directamente el objeto
      
      if (result.success) {
        onClose();
        // Limpia el formulario
        setFormData({ nameService: '', image: '', brand: '' });
      }
    } catch (err) {
      console.error("Error completo:", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Servicio</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo de nombre del servicio */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Nombre del Servicio *</label>
            <input
              type="text"
              value={formData.nameService}
              onChange={(e) => setFormData({...formData, nameService: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Campo de imagen */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">URL de la Imagen</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Selector de marca (ahora por nombre) */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Marca *</label>
            <select
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Seleccione una marca</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.nameBrand}>
                  {brand.nameBrand}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};