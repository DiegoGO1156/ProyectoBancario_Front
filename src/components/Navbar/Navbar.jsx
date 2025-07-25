import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks/useUserDetails';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //logOut
  const{isLogged , logout} = useUserDetails

  // Efecto para el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-blue-900 shadow-xl py-2' : 'bg-blue-800 py-4'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo con animación */}
          <Link 
            to="/home" 
            className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="/valmeriaBlue.png"
              alt="Logo del Banco" 
              className={`h-10 w-auto transition-all duration-300 ${scrolled ? 'h-10' : 'h-20'}`}
            />
            <span className="text-white font-bold text-xl hidden sm:block">Banco Financiero</span>
          </Link>
          
    {/* Navbar contatenar*/}
          {!isLogged ? (
                   <div>
           <Link 
              to="/"
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-300 group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
                   <Link 
                     to="/auth"
                     className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-300 group"
                   >
                     Login
                     <span className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full"></span>
                   </Link>
                   <Link 
              to="/contact"
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-300 group"
            >
              Contáctenos
              <span className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
                   
                   
                 </div>
                   
                ):(
          <div>
            <Link 
              to="/"
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-300 group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/Productos"
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-300 group"
            >
              Productos
              <span className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/Servicios"
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-300 group"
            >
              Servicios
              <span className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/Promociones"
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-300 group"
            >
              Promociones
              <span className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
          </div>
                )}
          
        </div>
      </div>

      {/* Menú Mobile */}
      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/Productos"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Productos
          </Link>
          <Link
            to="/Servicios"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link
            to="/Promociones"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Promociones
          </Link>
          <Link
            to="/Contacto"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contáctenos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;