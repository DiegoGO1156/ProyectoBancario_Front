import React, { useState } from 'react';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';
import PendingUsersList from '../components/Users/PendingUsersList';
import UserDetailModal from '../components/Users/UserDetailModal';
import { usePendingUsers } from '../shared/hooks/usePendingUsers'; 

const PendingUsersPage = () => {
  const { users, loading, error, activateUser } = usePendingUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleActivateUser = async (userId) => {
    return await activateUser(userId);
    // No necesitamos hacer nada más, el hook ya maneja la actualización
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      
      <main className="flex-1 py-8 ml-20 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Usuarios Pendientes</h1>
            {/* Eliminamos el botón de actualización manual */}
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <PendingUsersList 
              users={users}
              loading={loading}
              error={error}
              onUserSelect={handleUserSelect}
            />
          </div>

          {selectedUser && (
            <UserDetailModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              user={selectedUser}
              onActivate={handleActivateUser}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PendingUsersPage;