import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarAdmin } from '../../src/components/Navbar/SidebarAdmin';

export const PendingUsersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos de ejemplo - usuarios pendientes
  const pendingUsers = [
    {
      id: 'VM-1001',
      name: 'Carlos Mendoza',
      email: 'c.mendoza@example.com',
      registerDate: '15/03/2024',
      documentType: 'DNI',
      documentNumber: '45876231',
      status: 'pending'
    },
    {
      id: 'VM-1002',
      name: 'Ana López',
      email: 'a.lopez@example.com',
      registerDate: '14/03/2024',
      documentType: 'Pasaporte',
      documentNumber: 'PE2045876',
      status: 'pending'
    },
    {
      id: 'VM-1003',
      name: 'Roberto Sánchez',
      email: 'r.sanchez@example.com',
      registerDate: '13/03/2024',
      documentType: 'DNI',
      documentNumber: '30458762',
      status: 'pending'
    },
    {
      id: 'VM-1004',
      name: 'Luisa Fernández',
      email: 'l.fernandez@example.com',
      registerDate: '12/03/2024',
      documentType: 'Carné Extranjería',
      documentNumber: '04587621',
      status: 'pending'
    },
    {
      id: 'VM-1005',
      name: 'Jorge Ramírez',
      email: 'j.ramirez@example.com',
      registerDate: '11/03/2024',
      documentType: 'DNI',
      documentNumber: '10458763',
      status: 'pending'
    }
  ];

  // Filtrar usuarios según término de búsqueda
  const filteredUsers = pendingUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.documentNumber.includes(searchTerm)
  );

  return (
    <>
      <div className='my-'>
      </div>
      <div className="flex min-h-screen bg-blue-50">
        <SidebarAdmin />
        
        {/* Contenido principal */}
        <div className="flex-100 p-8 ml-15">
          {/* Encabezado */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Usuarios Pendientes</h1>
              <p className="text-blue-700">Clientes registrados esperando activación</p>
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

          

          {/* Tabla de usuarios */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">ID Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Correo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Documento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Fecha Registro</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {user.documentType}: {user.documentNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.registerDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/users/verify/${user.id}`)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition"
                          >
                            Verificar
                          </button>
                          <button
                            onClick={() => navigate(`/users/detail/${user.id}`)}
                            className="px-3 py-1 bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 text-xs rounded-md transition"
                          >
                            Detalle
                          </button>
                          <button
                            onClick={() => console.log('Rechazar', user.id)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded-md transition" // Acento amarillo indio
                          >
                            Rechazar
                          </button>
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
              <span className="font-medium">{pendingUsers.length}</span> resultados
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