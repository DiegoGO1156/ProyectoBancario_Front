import React, { useState } from 'react';

const UserDetailModal = ({ isOpen, onClose, user, onActivate, onDelete }) => {
  const [activating, setActivating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activationError, setActivationError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleActivate = async () => {
    setActivating(true);
    setActivationError(null);

    try {
      const result = await onActivate(user._id);
      if (result.success) {
        onClose();
      } else {
        setActivationError(result.error);
      }
    } catch (error) {
      setActivationError("Error al activar el usuario");
    } finally {
      setActivating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    
    try {
      const result = await onDelete(user._id);
      if (!result.success) {
        setDeleteError(result.error);
      }
    } catch (error) {
      setDeleteError("Error al rechazar el usuario");
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo transparente con blur ligero */}
      <div 
        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal flotante */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 border border-gray-200">
        <div className="p-6">
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Detalles del Usuario</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna izquierda - Información personal */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-700 mb-3 border-b pb-2">Información Personal</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Nombre completo</p>
                    <p className="font-medium">{user.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nombre de usuario</p>
                    <p className="font-medium">{user.username || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Documento (DPI)</p>
                    <p className="font-medium">{user.dpi || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium">{user.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Correo electrónico</p>
                    <p className="font-medium break-all">{user.email || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Información financiera */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-700 mb-3 border-b pb-2">Información Financiera</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Número de cuenta</p>
                    <p className="font-medium">{user.accountNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Empresa</p>
                    <p className="font-medium">{user.companyName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ingresos mensuales</p>
                    <p className="font-medium">{user.income ? `Q${user.income}` : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Divisas</p>
                    <p className="font-medium">{user.divisas || 'GTQ'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estado de cuenta</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.statusAccount === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.statusAccount === 'Active' ? 'Activo' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-700 mb-3 border-b pb-2">Dirección</h3>
              <p className="font-medium">{user.address || 'No especificada'}</p>
            </div>
          </div>

          {/* Mensajes de error */}
          {(activationError || deleteError) && (
            <div className="mt-6 space-y-2">
              {activationError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {activationError}
                </div>
              )}
              {deleteError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {deleteError}
                </div>
              )}
            </div>
          )}

          {/* Botones de acción */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              disabled={activating || deleting}
            >
              Cerrar
            </button>
            {user.statusAccount === 'Pending' && (
              <>
                <button
                  onClick={handleDelete}
                  className={`px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center justify-center ${
                    deleting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Rechazando...
                    </>
                  ) : 'Rechazar Usuario'}
                </button>
                <button
                  onClick={handleActivate}
                  className={`px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center ${
                    activating ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={activating}
                >
                  {activating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Activando...
                    </>
                  ) : 'Activar Usuario'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;