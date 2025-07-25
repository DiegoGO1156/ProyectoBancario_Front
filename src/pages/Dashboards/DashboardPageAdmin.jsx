import { useNavigate } from 'react-router-dom';
import { SidebarAdmin } from '../../components/Navbar/SidebarAdmin';

export const DashboardPageAdmin = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='my-'>
        <SidebarAdmin/>
      </div>
      <div className="min-h-screen bg-blue-50 flex flex-col">

        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Panel de Control Valmeria</h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Centro de operaciones para la gestión integral del banco
            </p>
            <div className="mt-6">
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '125K+', label: 'Clientes Activos', icon: '👥', accent: false },
              { number: 'Q2.4B', label: 'Activos Totales', icon: '💰', accent: false },
              { number: '98.7%', label: 'Satisfacción', icon: '⭐', accent: true },
              { number: '24/7', label: 'Soporte Activo', icon: '🛡️', accent: true },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg p-6 text-center border-t-4 ${item.accent ? 'border-amber-500' : 'border-blue-500'} hover:shadow-2xl transition-all`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h2 className={`text-4xl font-bold ${item.accent ? 'text-amber-600' : 'text-blue-800'} mb-2`}>{item.number}</h2>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Cards Section */}
        <section className="py-12 px-6 flex-grow">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Módulos de <span className="text-amber-600">Administración</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 - Gestión de Servicios */}
              <div
                onClick={() => navigate('/services')}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-amber-500 group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-10 w-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2 flex items-center">
                  Gestión de Servicios
                  <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Premium</span>
                </h4>
                <p className="text-gray-600 mb-3">Administra todos los servicios bancarios disponibles</p>
                <ul className="text-sm text-gray-500 space-y-1 pl-5 list-disc">
                  <li>Crear/editar servicios</li>
                  <li>Asignar tarifas y comisiones</li>
                  <li>Configurar disponibilidad</li>
                </ul>
              </div>

              {/* Card 2 - Gestión de Marcas */}
              <div
                onClick={() => navigate('/brands')}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-blue-500 group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Gestión de Marcas</h4>
                <p className="text-gray-600 mb-3">Controla la identidad visual y posicionamiento</p>
                <ul className="text-sm text-gray-500 space-y-1 pl-5 list-disc">
                  <li>Actualizar logotipos y colores</li>
                  <li>Gestionar campañas publicitarias</li>
                  <li>Monitorizar percepción de marca</li>
                </ul>
              </div>

              {/* Card 3 - Activar Usuarios */}
              <div
                onClick={() => navigate('/userPending')}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-green-500 group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Activar Usuarios</h4>
                <p className="text-gray-600 mb-3">Habilita nuevas cuentas de clientes</p>
                <ul className="text-sm text-gray-500 space-y-1 pl-5 list-disc">
                  <li>Verificar documentos</li>
                  <li>Asignar límites iniciales</li>
                  <li>Configurar acceso inicial</li>
                </ul>
              </div>

              {/* Card 4 - Desactivar Usuarios */}
              <div
                onClick={() => navigate('/userActive')}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-red-500 group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Desactivar Usuarios</h4>
                <p className="text-gray-600 mb-3">Suspende cuentas por seguridad</p>
                <ul className="text-sm text-gray-500 space-y-1 pl-5 list-disc">
                  <li>Bloquear accesos</li>
                  <li>Congelar fondos</li>
                  <li>Registrar motivo</li>
                </ul>
              </div>

              {/* Card 5 - Editar Ingresos */}
              <div
                onClick={() => navigate('/userActive')}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-purple-500 group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-10 w-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-2">Editar Ingresos</h4>
                <p className="text-gray-600 mb-3">Ajusta perfiles financieros de clientes</p>
                <ul className="text-sm text-gray-500 space-y-1 pl-5 list-disc">
                  <li>Actualizar declaraciones</li>
                  <li>Modificar límites de crédito</li>
                  <li>Revisar historial</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-medium">Banco Valmeria © {new Date().getFullYear()}</p>
                <p className="text-blue-300 text-sm mt-1">Sistema de Administración v3.2.1</p>
              </div>
              
            </div>
            
          </div>
        </footer>
      </div>
    </>
  );
};