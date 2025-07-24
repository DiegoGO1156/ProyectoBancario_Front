const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, brandName, isDeleting = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Fondo transparente con blur */}
            <div 
                className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                onClick={!isDeleting ? onClose : undefined}
            />
            
            {/* Modal flotante */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 border border-gray-200">
                <div className="p-6">
                    {/* Encabezado */}
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">Confirmar eliminación</h3>
                        {!isDeleting && (
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                disabled={isDeleting}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Contenido */}
                    <div className="mb-6">
                        <p className="text-gray-700">
                            ¿Estás seguro de eliminar la marca <strong className="font-semibold text-red-600">"{brandName}"</strong>?
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            Esta acción no se puede deshacer.
                        </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                        <button
                            onClick={onClose}
                            className={`px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isDeleting}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center ${
                                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Eliminando...
                                </>
                            ) : 'Eliminar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;