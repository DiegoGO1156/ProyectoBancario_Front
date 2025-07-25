import React from 'react';
import { FaExchangeAlt, FaHeart, FaHistory, FaShoppingCart, FaConciergeBell, FaUserEdit, FaLock } from 'react-icons/fa';
import { SidebarUsers } from './Navbar/SidebarAdmin';
import Footer from "./Homepage/Footer";

export const DashboardUser = () => {
    const functionalities = [
    {
      name: 'Transferir Dinero',
      description: 'Envía dinero de forma rápida y segura a otros usuarios o cuentas.',
      icon: <FaExchangeAlt className="text-white text-4xl mb-3" />, 
      link: '/TransferForm'
    },
    {
      name: 'Agregar Favoritos',
      description: 'Guarda a tus usuarios frecuentes para transferencias más rápidas.',
      icon: <FaHeart className="text-white text-4xl mb-3" />,
      link: '/Addfavorite'
    },
    {
      name: 'Historial de Transferencias',
      description: 'Visualiza un registro completo de todas tus transacciones.',
      icon: <FaHistory className="text-white text-4xl mb-3" />,
      link: '/TransferList'
    },
    {
      name: 'Comprar Productos',
      description: 'Explora y adquiere una variedad de productos disponibles.',
      icon: <FaShoppingCart className="text-white text-4xl mb-3" />,
      link: '/Productos'
    },
    {
      name: 'Comprar Servicios',
      description: 'Contrata diversos servicios directamente desde tu panel.',
      icon: <FaConciergeBell className="text-white text-4xl mb-3" />, 
      link: '/Service'
    },
    {
      name: 'Editar Perfil',
      description: 'Actualiza tu información personal y preferencias.',
      icon: <FaUserEdit className="text-white text-4xl mb-3" />,
      link: '/updateProfile'
    },
    {
      name: 'Cambiar Contraseña',
      description: 'Mantén tu cuenta segura actualizando tu contraseña regularmente.',
      icon: <FaLock className="text-white text-4xl mb-3" />,
      link: '/updatePassword'
    },
  ];

  return (
    <div className='flex h-full'>
        <SidebarUsers />
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-6 ml-120">
        <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-gray-900 md:text-4xl lg:text-6xl mb-12">
            ¡Bienvenido a tu panel de control{" "}
            <span className="relative z-20 inline-block rounded-xl bg-blue-600/80 px-4 py-1 text-white underline decoration-sky-300 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
            Donde tus operaciones
            </span>{" "}
            se hacen realidad!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-20">
            {functionalities.map((func, index) => (
            <a
                key={index}
                href={func.link}
                className="flex flex-col items-center justify-center bg-blue-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-blue-600 hover:border-blue-500 cursor-pointer"
            >
                {func.icon}
                <h3 className="text-xl font-semibold text-white mb-2 text-center">{func.name}</h3>
                <p className="text-blue-200 text-center">{func.description}</p>
            </a>
            ))}
        </div>
        <div className="mt-40">
                <Footer />
              </div>
        </div>
    </div>
  );
};

export default DashboardUser;