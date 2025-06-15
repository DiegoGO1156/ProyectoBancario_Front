import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {SidebarAdmin} from '../../src/components/Navbar/SidebarAdmin';

export const UserHistoryPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('30days'); // '7days', '30days', '90days', 'all'

  // Datos de ejemplo - historial de usuarios
  const userHistory = [
    {
      id: 'VM-3001',
      name: 'Carlos Mendoza',
      action: 'Activación de cuenta',
      date: '15/03/2024 09:45',
      details: 'Cuenta premium activada',
      status: 'completed',
      admin: 'María González'
    },
    {
      id: 'VM-3002',
      name: 'Ana López',
      action: 'Cambio de límite',
      date: '14/03/2024 15:30',
      details: 'Límite aumentado a $10,000',
      status: 'completed',
      admin: 'Roberto Sánchez'
    },
    {
      id: 'VM-3003',
      name: 'Roberto Sánchez',
      action: 'Renovación premium',
      date: '10/03/2024 18:15',
      details: 'Renovación automática',
      status: 'completed',
      admin: 'Sistema'
    },
    {
      id: 'VM-3004',
      name: 'Luisa Fernández',
      action: 'Intento de acceso',
      date: '05/03/2024 08:20',
      details: 'Desde nueva ubicación',
      status: 'warning',
      admin: 'N/A'
    },
    {
      id: 'VM-3005',
      name: 'Jorge Ramírez',
      action: 'Desactivación temporal',
      date: '28/02/2024 11:45',
      details: 'Por solicitud del cliente',
      status: 'pending',
      admin: 'Carlos Mendoza'
    }
  ];

  // Filtrar historial
  const filteredHistory = userHistory.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.includes(searchTerm) ||
      record.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtrado por rango de tiempo (simulado)
    const currentDate = new Date();
    const recordDate = new Date(record.date.split(' ')[0].split('/').reverse().join('-'));
    const diffTime = currentDate - recordDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    const matchesTimeRange = 
      timeRange === 'all' ||
      (timeRange === '7days' && diffDays <= 7) ||
      (timeRange === '30days' && diffDays <= 30) ||
      (timeRange === '90days' && diffDays <= 90);
    
    return matchesSearch && matchesTimeRange;
  });

  // Estadísticas
  const stats = {
    totalActions: filteredHistory.length,
    completed: filteredHistory.filter(r => r.status === 'completed').length,
    warnings: filteredHistory.filter(r => r.status === 'warning').length,
    pending: filteredHistory.filter(r => r.status === 'pending').length
  };

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
              <h1 className="text-3xl font-bold text-blue-900">Historial de Usuarios</h1>
              <p className="text-blue-700">Registro completo de actividades y cambios</p>
            </div>
            
            {/* Controles */}
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Buscar en historial..."
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
              
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Últimos 7 días</option>
                <option value="30days">Últimos 30 días</option>
                <option value="90days">Últimos 90 días</option>
                <option value="all">Todo el historial</option>
              </select>
            </div>
          </div>

          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-blue-200">Total Registros</p>
              <p className="text-2xl font-bold">{stats.totalActions}</p>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-green-200">Completados</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-amber-100">Advertencias</p>
              <p className="text-2xl font-bold">{stats.warnings}</p>
            </div>
            <div className="bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-xl shadow-lg p-4">
              <p className="text-sm text-gray-200">Pendientes</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>

          {/* Lista de historial */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Acción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Detalles</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Administrador</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((record, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <div className="font-medium">{record.date.split(' ')[0]}</div>
                        <div className="text-gray-500">{record.date.split(' ')[1]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <div className="font-medium">{record.name}</div>
                        <div className="text-gray-500">{record.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {record.action}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 max-w-xs">
                        {record.details}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {record.admin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {record.status === 'completed' && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Completado
                          </span>
                        )}
                        {record.status === 'warning' && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                            Advertencia
                          </span>
                        )}
                        {record.status === 'pending' && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            Pendiente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exportar datos */}
          <div className="mt-6 flex justify-end">
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar Historial
            </button>
          </div>

          {/* Paginación */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredHistory.length}</span> registros
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