import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarAdmin } from '../../src/components/Navbar/SidebarAdmin';

export const ActiveUsersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'recent', 'premium'

  // Datos de ejemplo - usuarios activos
  const activeUsers = [
    {
      id: 'VM-2001',
      name: 'Carlos Mendoza',
      email: 'c.mendoza@example.com',
      activationDate: '15/03/2024',
      lastLogin: 'Hoy, 09:45 AM',
      accountType: 'Premium',
      status: 'active'
    },
    {
      id: 'VM-2002',
      name: 'Ana López',
      email: 'a.lopez@example.com',
      activationDate: '14/03/2024',
      lastLogin: 'Ayer, 15:30',
      accountType: 'Estándar',
      status: 'active'
    },
    {
      id: 'VM-2003',
      name: 'Roberto Sánchez',
      email: 'r.sanchez@example.com',
      activationDate: '10/03/2024',
      lastLogin: 'Ayer, 18:15',
      accountType: 'Premium',
      status: 'active'
    },
    {
      id: 'VM-2004',
      name: 'Luisa Fernández',
      email: 'l.fernandez@example.com',
      activationDate: '05/03/2024',
      lastLogin: 'Hoy, 08:20 AM',
      accountType: 'Empresarial',
      status: 'active'
    },
    {
      id: 'VM-2005',
      name: 'Jorge Ramírez',
      email: 'j.ramirez@example.com',
      activationDate: '28/02/2024',
      lastLogin: '15/03/2024, 11:45',
      accountType: 'Estándar',
      status: 'active'
    }
  ];

  // Filtrar usuarios según término de búsqueda y pestaña activa
  const filteredUsers = activeUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.includes(searchTerm);
    
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'recent' && user.activationDate.includes('/03/2024')) ||
      (activeTab === 'premium' && user.accountType === 'Premium');
    
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <div className='my-'>
       
      </div>
      <div className="flex min-h-screen bg-blue-50">
        <SidebarAdmin />
        
        {/* Contenido principal */}
        <div className="flex-1 ml-15 p-8">
          {/* Encabezado */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Usuarios Activos</h1>
              <p className="text-blue-700">Clientes con cuentas activas en el sistema</p>
            </div>
            
            {/* Barra de búsqueda */}
            <div className="relative mt-4 md:mt-0 w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Pestañas */}
          <div className="flex border-b border-blue-200 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-4 py-2 font-medium ${activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Recientes
            </button>
            <button
              onClick={() => setActiveTab('premium')}
              className={`px-4 py-2 font-medium ${activeTab === 'premium' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500 hover:text-amber-500'}`}
            >
              Premium
            </button>
          </div>

          {/* Tarjeta de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-blue-200">Total Activos</p>
              <p className="text-2xl font-bold">{activeUsers.length}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-blue-200">Activos Hoy</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-blue-200">Usuarios Premium</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-amber-100">Empresariales</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Tipo de Cuenta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Activación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Último Acceso</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <div className="flex items-center">
                          {user.name}
                          {user.accountType === 'Premium' && (
                            <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">Premium</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {user.accountType === 'Premium' ? (
                          <span className="text-amber-600 font-medium">{user.accountType}</span>
                        ) : (
                          user.accountType
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.activationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.lastLogin}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/users/view/${user.id}`)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => navigate(`/users/edit/${user.id}`)}
                            className="px-3 py-1 bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 text-xs rounded-md transition"
                          >
                            Editar
                          </button>
                          {user.accountType === 'Premium' && (
                            <button
                              onClick={() => console.log('Renovar premium', user.id)}
                              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded-md transition"
                            >
                              Renovar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredUsers.length}</span> de{' '}
              <span className="font-medium">{activeUsers.length}</span> resultados
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white border border-blue-300 rounded-md text-blue-700 text-sm hover:bg-blue-50 transition">
                Anterior
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                1
              </button>
              <button className="px-3 py-1 bg-white border border-blue-300 rounded-md text-blue-700 text-sm hover:bg-blue-50 transition">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};