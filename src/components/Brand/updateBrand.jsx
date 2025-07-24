import { useState, useEffect } from 'react';

export const EditBrandModal = ({ 
    isOpen, 
    onClose, 
    brandToEdit,
    onUpdateBrand
}) => {
    const [formData, setFormData] = useState({
        nameBrand: '',
        image: '',
        status: true
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState(null);

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

        setIsSubmitting(true);
        setApiError(null);

        try {
            const result = await onUpdateBrand(brandToEdit._id, formData);
            if (!result.error) {
                onClose();
            } else {
                setApiError(result.message);
            }
        } catch (error) {
            setApiError("Error al actualizar la marca");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !brandToEdit) return null;

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
                        <h2 className="text-2xl font-bold text-gray-800">Editar Marca</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            disabled={isSubmitting}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mensaje de error de API */}
                    {apiError && (
                        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                            {apiError}
                        </div>
                    )}

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Campo Nombre */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                            <input
                                type="text"
                                name="nameBrand"
                                value={formData.nameBrand}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.nameBrand 
                                        ? 'border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.nameBrand && (
                                <p className="text-red-600 text-sm mt-1">{errors.nameBrand}</p>
                            )}
                        </div>

                        {/* Campo Imagen */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                disabled={isSubmitting}
                            />
                        </div>


                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className={`px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={`px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isSubmitting || Object.keys(errors).length > 0}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Guardando...
                                    </>
                                ) : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};