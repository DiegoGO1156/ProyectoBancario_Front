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

        {/* Hero Section con degradado azul y toque amarillo */}
        <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Panel de Administración Valmeria</h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Gestión integral de operaciones bancarias desde un solo lugar
            </p>
            <div className="mt-6">
              <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full text-sm font-medium">
                Sistema Certificado
              </span>
            </div>
          </div>
        </header>

        {/* Stats Section con acentos amarillos */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '125K+', label: 'Clientes Activos', accent: false },
              { number: 'Q2.4B', label: 'Activos Bajo Gestión', accent: false },
              { number: '98.7%', label: 'Satisfacción Clientes', accent: true },
              { number: '24H', label: 'Soporte Prioritario', accent: true },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg p-6 text-center border-t-4 ${item.accent ? 'border-amber-500' : 'border-blue-500'} hover:shadow-2xl transition-all`}
              >
                <h2 className={`text-4xl font-bold ${item.accent ? 'text-amber-600' : 'text-blue-800'} mb-2`}>{item.number}</h2>
                <p className="text-gray-600">{item.label}</p>
                {item.accent && (
                  <div className="mt-2 flex justify-center">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* System Cards Section con hover amarillo */}
        <section className="py-12 px-6 flex-grow">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Módulos de Gestión{' '}
              <span className="text-amber-600">Prioritarios</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Gestión de Cuentas',
                  desc: 'Administra cuentas corrientes, de ahorro y depósitos',
                  icon: (
                    <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  route: '/account-management',
                  priority: true
                },
                {
                  title: 'Préstamos',
                  desc: 'Control de préstamos personales e hipotecarios',
                  icon: (
                    <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  route: '/loan-management',
                  priority: false
                },
                {
                  title: 'Tarjetas',
                  desc: 'Administración de tarjetas de crédito y débito',
                  icon: (
                    <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  ),
                  route: '/cards-management',
                  priority: true
                },
                {
                  title: 'Transacciones',
                  desc: 'Monitorización de transferencias y operaciones',
                  icon: (
                    <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  ),
                  route: '/transactions',
                  priority: false
                },
                {
                  title: 'Usuarios y Roles',
                  desc: 'Gestión de empleados y permisos del sistema',
                  icon: (
                    <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  route: '/users',
                  priority: false
                },
                {
                  title: 'Inversiones',
                  desc: 'Control de productos de inversión y fondos',
                  icon: (
                    <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  route: '/investments',
                  priority: true
                },
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => item.route && navigate(item.route)}
                  className={`bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 ${item.priority ? 'border-amber-500' : 'border-blue-600'} hover:bg-amber-50/30`}
                >
                  <div className={`w-16 h-16 ${item.priority ? 'bg-amber-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">
                    {item.title}
                    {item.priority && (
                      <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Prioritario</span>
                    )}
                  </h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer con gradiente azul-ámbar */}
        <footer className="bg-gradient-to-r from-blue-900 to-amber-700 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto text-center text-sm md:text-base">
            <p>© {new Date().getFullYear()} Banco Valmeria | Panel de Administración | contacto@valmeria.com</p>
            <p className="mt-2 text-blue-300/90 text-xs">
              Entidad supervisada por <span className="text-amber-300">SCRUM</span> y developers
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};