import React, { useState } from 'react';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';
import PendingUsersList from '../components/Users/PendingUsersList';
import UserDetailModal from '../components/Users/UserDetailModal';
import { usePendingUsers } from '../shared/hooks/usePendingUsers';

const PendingUsersPage = () => {
  const { users, loading, error, activateUser , deleteUser} = usePendingUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleActivate = async (userId) => {
    const result = await activateUser(userId);
    if (result.success) {
      setIsModalOpen(false);
    }
  };

   const handleDelete = async (userId) => {
    const result = await deleteUser(userId);
    if (result.success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      
      <main className="flex-1 py-8 ml-20 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Usuarios Pendientes</h1>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p>{error}</p>
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6">
            <PendingUsersList 
              users={users} 
              loading={loading}
              error={error}
              onUserSelect={handleUserSelect}
            />
          </div>

          <UserDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
            onActivate={handleActivate}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
};

export default PendingUsersPage;