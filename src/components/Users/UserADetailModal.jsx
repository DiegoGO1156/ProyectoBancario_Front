import React, { useState } from 'react';
import EditIncomeModal from './EditIncomeModal';

const UserDetailModal = ({ 
  isOpen, 
  onClose, 
  user,
  onUpdateIncome 
}) => {
  const [isEditIncomeOpen, setIsEditIncomeOpen] = useState(false);

  if (!isOpen || !user) return null;

  return (
    <>
      {/* Modal principal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Encabezado */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Detalles del Usuario</h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Contenido de dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna Izquierda - Información Personal */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">Información Personal</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Nombre:</span> {user.name}</p>
                    <p><span className="font-medium">Usuario:</span> {user.username}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Teléfono:</span> {user.phone}</p>
                    <p><span className="font-medium">DPI:</span> {user.dpi}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Dirección</h3>
                  <p className="mt-2">{user.address}</p>
                </div>
              </div>

              {/* Columna Derecha - Información Financiera */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">Información Financiera</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">N° Cuenta:</span> {user.accountNumber}</p>
                    <p><span className="font-medium">Empresa:</span> {user.companyName}</p>
                    
                    {/* Sección de Ingresos con botón de edición */}
                    <div className="flex items-center">
                      <p><span className="font-medium">Ingresos:</span> Q{user.income}</p>
                      <button
                        onClick={() => setIsEditIncomeOpen(true)}
                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        (Editar)
                      </button>
                    </div>

                    <p><span className="font-medium">Divisas:</span> {user.divisas}</p>
                    <p>
                      <span className="font-medium">Estado:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        user.statusAccount === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.statusAccount === 'Active' ? 'Activo' : 'Pendiente'}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Otros Datos</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Rol:</span> {user.role}</p>
                    <p>
                      <span className="font-medium">Verificación:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        user.verification 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.verification ? 'Verificado' : 'No verificado'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edición de Income (aparece cuando se clickea "Editar") */}
      <EditIncomeModal
        isOpen={isEditIncomeOpen}
        onClose={() => setIsEditIncomeOpen(false)}
        currentIncome={user.income}
        onSave={onUpdateIncome}
        userId={user._id}
      />
    </>
  );
};

export default UserDetailModal;