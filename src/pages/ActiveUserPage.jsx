import React, { useState } from 'react';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';
import ActiveUsersList from '../components/Users/ActiveUsersList';
import UserDetailModal from '../components/Users/UserADetailModal';
import { useActiveUsers } from '../shared/hooks/useActiveUsers';

const ActiveUsersPage = () => {
  const { users, loading, error, refresh, updateUserIncome } = useActiveUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateIncome = async (userId, newIncome) => {
    const result = await updateUserIncome(userId, newIncome);
    if (result.success) {
      // Actualiza el usuario seleccionado si es el mismo
      if (selectedUser?._id === userId) {
        setSelectedUser({
          ...selectedUser,
          income: newIncome
        });
      }
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      
      <main className="flex-1 py-8 ml-20 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Usuarios Activos</h1>
          
          <div className="bg-white shadow rounded-lg p-6">
            <ActiveUsersList 
              onUserSelect={handleUserSelect}
            />
          </div>

          <UserDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
            onUpdateIncome={handleUpdateIncome}
          />
        </div>
      </main>
    </div>
  );
};

export default ActiveUsersPage;