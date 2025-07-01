import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserProfile } from '../shared/hooks';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';


export const MyAccountPage = (props) => {
  const navigate = useNavigate();
  const { usuario, loading, error } = useUserProfile();
  const [open, setOpen] = useState(false);
  
  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!usuario) return <p>No se encontró el usuario</p>;
  

  return (
    <>
    <div>
      <SidebarAdmin />
      <div className="min-h-screen bg-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-200 hover:text-white mb-6 transition"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="bg-white/20 rounded-full p-4 mr-6 mb-4 md:mb-0">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{usuario.name}</h1>
                <p className="text-blue-200">{usuario.position}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Contenido Principal */}
        <div className="max-w-7xl mx-auto py-8 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sección izquierda - Información básica */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Información Personal
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Nombre Completo</label>
                    <div className="bg-blue-50 rounded-lg p-3 text-blue-900">{usuario.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Correo Electrónico</label>
                    <div className="bg-blue-50 rounded-lg p-3 text-blue-900">{usuario.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Teléfono</label>
                    <div className="bg-blue-50 rounded-lg p-3 text-blue-900">{usuario.phone}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">ID de Empleado</label>
                    <div className="bg-blue-50 rounded-lg p-3 text-blue-900">{usuario.accountNumber}</div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Company</label>
                    <div className="bg-blue-50 rounded-lg p-3 text-blue-900">{usuario.companyName}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección derecha - Permisos y acciones */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Permisos
                </h2>
                
                <ul className="space-y-3">
                  {(usuario.permissions || []).map((permission, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-blue-800">{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Acciones rápidas */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Acciones Rápidas
                </h2>
                
                <div className="space-y-3">
                  
                  <button className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-blue-50 text-red-600 hover:bg-red-50 transition">
                    <span>Cerrar sesión</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};