import { useState } from 'react';

export const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
    const [formData, setFormData] = useState({
        nameProduct: '',
        description: '',
        image: '',
        price: '',
        brand: '',
        exclusivitive: 7000,
        status: true
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'price' || name === 'exclusivitive' ? Number(value) : value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.nameProduct.trim()) errors.nameProduct = 'El nombre es requerido';
        if (!formData.description.trim()) errors.description = 'La descripción es requerida';
        if (!formData.price || isNaN(formData.price)) errors.price = 'Precio inválido';
        if (!formData.brand.trim()) errors.brand = 'La marca es requerida';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setApiError(null);

        try {
            const result = await onAddProduct(formData);
            if (result.success) {
                setFormData({
                    nameProduct: '',
                    description: '',
                    image: '',
                    price: '',
                    brand: '',
                    exclusivitive: 7000,
                    status: true
                });
                onClose();
            } else {
                setApiError(result.error);
            }
        } catch (error) {
            setApiError("Error al agregar el producto");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                onClick={onClose}
            />
            
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto mx-4 border border-gray-200">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Agregar Nuevo Producto</h2>
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

                    {apiError && (
                        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                            <strong>Error:</strong> {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Nombre del Producto */}
                        <div>
                            <label htmlFor="nameProduct" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del Producto *
                            </label>
                            <input
                                id="nameProduct"
                                type="text"
                                name="nameProduct"
                                value={formData.nameProduct}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                                    formErrors.nameProduct 
                                        ? 'border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                disabled={isSubmitting}
                                autoFocus
                            />
                            {formErrors.nameProduct && (
                                <p className="text-red-600 text-sm mt-1">{formErrors.nameProduct}</p>
                            )}
                        </div>

                        {/* Descripción */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Descripción *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                                    formErrors.description 
                                        ? 'border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                disabled={isSubmitting}
                            />
                            {formErrors.description && (
                                <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
                            )}
                        </div>

                        {/* Precio */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Precio *
                            </label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                                    formErrors.price 
                                        ? 'border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                disabled={isSubmitting}
                                step="0.01"
                                min="0"
                            />
                            {formErrors.price && (
                                <p className="text-red-600 text-sm mt-1">{formErrors.price}</p>
                            )}
                        </div>

                        {/* Marca */}
                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                                Marca *
                            </label>
                            <input
                                id="brand"
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                                    formErrors.brand 
                                        ? 'border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                disabled={isSubmitting}
                            />
                            {formErrors.brand && (
                                <p className="text-red-600 text-sm mt-1">{formErrors.brand}</p>
                            )}
                        </div>

                        {/* Imagen */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                URL de la Imagen
                            </label>
                            <input
                                id="image"
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                disabled={isSubmitting}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>

                        {/* Exclusivitive */}
                        <div>
                            <label htmlFor="exclusivitive" className="block text-sm font-medium text-gray-700 mb-1">
                                Nivel Exclusivo
                            </label>
                            <input
                                id="exclusivitive"
                                type="number"
                                name="exclusivitive"
                                value={formData.exclusivitive}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                disabled={isSubmitting}
                                min="0"
                            />
                        </div>

                        {/* Estado */}
                        <div className="flex items-center">
                            <input
                                id="status"
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked }))}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                disabled={isSubmitting}
                            />
                            <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
                                Producto disponible
                            </label>
                        </div>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
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
                                disabled={isSubmitting || Object.keys(formErrors).length > 0}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Guardando...
                                    </>
                                ) : 'Guardar Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};