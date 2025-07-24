import React from 'react';
import { useState } from 'react';

const PendingUsersList = ({ 
  users = [], 
  loading = false, 
  error = null, 
  onUserSelect,
  onRefresh 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower) ||
      user.accountNumber.toString().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p>{error}</p>
        <button 
          onClick={onRefresh}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios pendientes'}
        </h3>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar usuarios..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <p className="text-sm text-gray-500">
        Mostrando {filteredUsers.length} de {users.length} usuarios
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader>Nombre</TableHeader>
              <TableHeader>Usuario</TableHeader>
              <TableHeader>N° Cuenta</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <UserRow key={user._id} user={user} onSelect={onUserSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const UserRow = ({ user, onSelect }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900">{user.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{user.username}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{user.accountNumber}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{user.email}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={() => onSelect(user)}
        className="text-blue-600 hover:text-blue-900"
      >
        Ver detalles
      </button>
    </td>
  </tr>
);

export default PendingUsersList;