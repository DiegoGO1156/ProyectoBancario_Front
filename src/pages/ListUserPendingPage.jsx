import React from 'react';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';
import PendingUsersList from '../components/Users/PendingUsersList';
import UserDetailModal from '../components/Users/UserDetailModal';
import { usePendingUsers } from '../shared/hooks/usePendingUsers';

const PendingUsersPage = () => {
  const { users, loading, error, activateUser, deleteUser, refresh } = usePendingUsers();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Métricas para el dashboard
  const pendingCount = users.length;
  const recentPending = users.slice(0, 3); // Últimos 3 registros
  const oldestPending = users.length > 3 ? users.slice(-3) : []; // Más antiguos

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      
      <main className="flex-1 py-8 ml-20 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header con estadísticas */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">Panel de Usuarios Pendientes</h1>
                  <p className="mt-2 opacity-90">Gestiona las solicitudes de registro de nuevos usuarios</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center min-w-[120px]">
                  <p className="text-sm font-medium">Total pendientes</p>
                  <p className="text-3xl font-bold">{pendingCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de información rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de últimos registros */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Últimos registros</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Nuevos</span>
              </div>
              <div className="p-4">
                {recentPending.length > 0 ? (
                  <ul className="space-y-3">
                    {recentPending.map(user => (
                      <li key={user._id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No hay registros recientes</p>
                )}
              </div>
            </div>

            {/* Tarjeta de estadísticas */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800">Estadísticas</h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{pendingCount}</p>
                  <p className="text-xs text-gray-600">Pendientes</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-xs text-gray-600">Aprobados hoy</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-600">0</p>
                  <p className="text-xs text-gray-600">Rechazados hoy</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">{pendingCount > 0 ? Math.ceil(pendingCount/3) : 0}</p>
                  <p className="text-xs text-gray-600">Minutos estimados</p>
                </div>
              </div>
            </div>

            {/* Tarjeta de acciones rápidas */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800">Acciones rápidas</h3>
              </div>
              <div className="p-4 space-y-3">
                <button 
                  onClick={refresh}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">Actualizar lista</span>
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button 
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">Exportar lista</span>
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Lista principal de usuarios */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Solicitudes de registro</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={refresh}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Actualizar
                </button>
                
              </div>
            </div>
            <div className="p-6">
              <PendingUsersList 
                users={users}
                loading={loading}
                error={error}
                onUserSelect={(user) => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
                onRefresh={refresh}
              />
            </div>
          </div>
        </div>

        <UserDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          onActivate={activateUser}
          onDelete={deleteUser}
        />
      </main>
    </div>
  );
};

export default PendingUsersPage;