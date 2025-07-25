import React, { useState } from 'react';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';
import ActiveUsersList from '../components/Users/ActiveUsersList';
import UserDetailModal from '../components/Users/UserADetailModal';
import { useActiveUsers } from '../shared/hooks/useActiveUsers';

export const ActiveUsersPage = () => {
  const { 
    users, 
    loading, 
    error, 
    refresh, 
    updateUserIncome,
    changeUserStatus 
  } = useActiveUsers();
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Métricas para el dashboard
  const activeCount = users.length;
  const recentActive = users.slice(0, 3); // Últimos 3 usuarios activos
  const highestIncomeUsers = [...users].sort((a, b) => b.income - a.income).slice(0, 3); // Usuarios con mayores ingresos

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateIncome = async (userId, newIncome) => {
    const result = await updateUserIncome(userId, newIncome);
    if (result.success && selectedUser?._id === userId) {
      setSelectedUser({
        ...selectedUser,
        income: newIncome
      });
    }
    return result;
  };

  const handleChangeStatus = async (userId) => {
    const result = await changeUserStatus(userId);
    if (result.success) {
      setIsModalOpen(false);
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      
      <main className="flex-1 py-8 ml-20 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header con estadísticas */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">Panel de Usuarios Activos</h1>
                  <p className="mt-2 opacity-90">Gestiona los usuarios activos en la plataforma</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center min-w-[120px]">
                  <p className="text-sm font-medium">Total activos</p>
                  <p className="text-3xl font-bold">{activeCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de información rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de últimos activos */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Últimos activos</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Recientes</span>
              </div>
              <div className="p-4">
                {recentActive.length > 0 ? (
                  <ul className="space-y-3">
                    {recentActive.map(user => (
                      <li key={user._id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">Ingreso: ${user.income}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No hay usuarios recientes</p>
                )}
              </div>
            </div>

            {/* Tarjeta de mayores ingresos */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Mayores ingresos</h3>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Top 3</span>
              </div>
              <div className="p-4">
                {highestIncomeUsers.length > 0 ? (
                  <ul className="space-y-3">
                    {highestIncomeUsers.map(user => (
                      <li key={user._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">${user.income}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No hay datos de ingresos</p>
                )}
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
              <h2 className="text-xl font-semibold text-gray-800">Usuarios activos</h2>
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
              <ActiveUsersList 
                users={users}
                loading={loading}
                error={error}
                onUserSelect={handleUserSelect}
              />
            </div>
          </div>
        </div>

        <UserDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          onUpdateIncome={handleUpdateIncome}
          onChangeStatus={handleChangeStatus}
        />
      </main>
    </div>
  );
};