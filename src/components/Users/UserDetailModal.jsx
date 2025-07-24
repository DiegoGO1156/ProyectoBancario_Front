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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Detalles del Usuario</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Información Personal</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Nombre:</span> {user.name || 'N/A'}</p>
                  <p><span className="font-medium">Usuario:</span> {user.username || 'N/A'}</p>
                  <p><span className="font-medium">DPI:</span> {user.dpi || 'N/A'}</p>
                  <p><span className="font-medium">Teléfono:</span> {user.phone || 'N/A'}</p>
                  <p><span className="font-medium">Email:</span> {user.email || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Información Financiera</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">N° Cuenta:</span> {user.accountNumber || 'N/A'}</p>
                  <p><span className="font-medium">Empresa:</span> {user.companyName || 'N/A'}</p>
                  <p><span className="font-medium">Ingresos:</span> {user.income ? `Q${user.income}` : 'N/A'}</p>
                  <p><span className="font-medium">Divisas:</span> {user.divisas || 'GTQ'}</p>
                  <p><span className="font-medium">Estado:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      user.statusAccount === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.statusAccount === 'Active' ? 'Activo' : 'Pendiente'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Dirección</h3>
              <p>{user.address || 'No especificada'}</p>
            </div>
          </div>

          {(activationError || deleteError) && (
            <div className="mt-4 space-y-2">
              {activationError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {activationError}
                </div>
              )}
              {deleteError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {deleteError}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              disabled={activating || deleting}
            >
              Cerrar
            </button>
            {user.statusAccount === 'Pending' && (
              <>
                <button
                  onClick={handleDelete}
                  className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${
                    deleting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Rechazando...
                    </>
                  ) : 'Rechazar Usuario'}
                </button>
                <button
                  onClick={handleActivate}
                  className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                    activating ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={activating}
                >
                  {activating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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