import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserProfile } from '../shared/hooks';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';
import { SidebarUsers } from '../components/Navbar/SidebarUser';


export const MyAccountPage = (props) => {
  const navigate = useNavigate();
  const { usuario, loading, error } = useUserProfile();
  const [open, setOpen] = useState(false);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!usuario) return <p>No se encontró el usuario</p>;

  const role = localStorage.getItem("roleUser")

  return (
    <>
      <div>
        {
          role === "ADMIN" ? <SidebarAdmin /> : <SidebarUsers/>
        }
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
              <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto mt-6">
                <button
                  onClick={() => navigate("/updateProfile")}
                  className="w-full flex items-center justify-between px-5 py-3 bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-100 text-blue-700 font-medium transition"
                >
                  <span>Editar Perfil</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => navigate("/updatePassword")}
                  className="w-full flex items-center justify-between px-5 py-3 bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-100 text-blue-700 font-medium transition"
                >
                  <span>Cambiar contraseña</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};