import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export const DashboardPageAdmin = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='my-12'>
        <Navbar />
      </div>
      <div className="min-h-screen bg-blue-50 flex flex-col">

        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Panel de Administración Valmeria</h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Gestión integral de operaciones bancarias desde un solo lugar
            </p>
          </div>
        </header>

        {/* Stats Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: '125K+', label: 'Clientes Activos' },
              { number: '$2.4B', label: 'Activos Bajo Gestión' },
              { number: '98.7%', label: 'Satisfacción Clientes' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500 hover:shadow-2xl transition-shadow">
                <h2 className="text-4xl font-bold text-blue-800 mb-2">{item.number}</h2>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Cards Section */}
<section className="py-12 px-6 flex-grow">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Módulos de Gestión</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          title: 'Gestión de Cuentas',
          desc: 'Administra cuentas corrientes, de ahorro y depósitos',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          route: '/account-management',
        },
        {
          title: 'Préstamos',
          desc: 'Control de préstamos personales e hipotecarios',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          route: '/loan-management',
        },
        {
          title: 'Tarjetas',
          desc: 'Administración de tarjetas de crédito y débito',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ),
          route: '/cards-management',
        },
        {
          title: 'Transacciones',
          desc: 'Monitorización de transferencias y operaciones',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          ),
          route: '/transactions',
        },
        {
          title: 'Usuarios y Roles',
          desc: 'Gestión de empleados y permisos del sistema',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
          route: '/users',
        },
        {
          title: 'Inversiones',
          desc: 'Control de productos de inversión y fondos',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
          route: '/investments',
        },
        {
          title: 'Seguridad',
          desc: 'Configuración de protocolos de seguridad',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
          route: '/security',
        },
        {
          title: 'Sucursales',
          desc: 'Gestión de red de sucursales y cajeros',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
          route: '/branches',
        },
        {
          title: 'Reportes',
          desc: 'Generación de reportes financieros y analíticos',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          route: '/reports',
        },
      ].map((item, index) => (
        <div
          key={index}
          onClick={() => item.route && navigate(item.route)}
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-blue-600"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {item.icon}
          </div>
          <h4 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h4>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto text-center text-sm md:text-base">
            <p>© {new Date().getFullYear()} Banco Valmeria | Panel de Administración | contacto@valmeria.com</p>
            <p className="mt-2 text-blue-300 text-xs">Entidad supervisada por SCRUM MAYA y developersis</p>
          </div>
        </footer>
      </div>
    </>
  );
};