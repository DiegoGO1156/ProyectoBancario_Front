import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const HomePage = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 5; // Actualiza este número según tus cards
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageStatus, setImageStatus] = useState({});


  //paginacion de las cards
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalCards - 1 ? 0 : prevIndex + 1
    );
  };

 
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalCards - 1 : prevIndex - 1
    );
  };

  //Auto cambio de las cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1)); // 4 slides (0-3)
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Carga de imágenes
   const handleImageLoaded = (index) => {
    setImageStatus(prev => ({...prev, [index]: true}));
  };

  const handleImageError = (index) => {
    setImageStatus(prev => ({...prev, [index]: false}));
    console.error(`Error loading image for slide ${index}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <Navbar />
       {/* Sección de Carrusel ------------------------------------------------------------------------------ */}
      <section className="w-full">
      <div className="relative h-[80vh] overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide 1 */}
          <div className="w-full flex-shrink-0 relative">
            <img
              src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Banca Digital"
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoaded(0)}
              onError={() => handleImageError(0)}
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
              <div className="text-center px-6 max-w-4xl mx-auto">
                <h2 className="text-white text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Banca Digital Avanzada
                </h2>
                <p className="text-white text-xl md:text-2xl mb-8 animate-fade-in animate-delay-100">
                  Accede a tu cuenta desde cualquier lugar
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in animate-delay-200">
                  Conoce más
                </button>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="w-full flex-shrink-0 relative">
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Préstamos Personalizados"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
              <div className="text-center px-6 max-w-4xl mx-auto">
                <h2 className="text-white text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Préstamos Personalizados
                </h2>
                <p className="text-white text-xl md:text-2xl mb-8 animate-fade-in animate-delay-100">
                  Soluciones financieras a tu medida
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in animate-delay-200">
                  Solicitar ahora
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="w-full flex-shrink-0 relative">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Inversiones Inteligentes"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
              <div className="text-center px-6 max-w-4xl mx-auto">
                <h2 className="text-white text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Inversiones Inteligentes
                </h2>
                <p className="text-white text-xl md:text-2xl mb-8 animate-fade-in animate-delay-100">
                  Haz crecer tu dinero con nuestros planes
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in animate-delay-200">
                  Empezar a invertir
                </button>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="w-full flex-shrink-0 relative">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
              alt="Atención Personalizada"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
              <div className="text-center px-6 max-w-4xl mx-auto">
                <h2 className="text-white text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Atención Personalizada
                </h2>
                <p className="text-white text-xl md:text-2xl mb-8 animate-fade-in animate-delay-100">
                  Ejecutivos dedicados a resolver tus necesidades
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in animate-delay-200">
                  Contactar ejecutivo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Flechas de navegación */}
        <button 
          onClick={() => setCurrentSlide(prev => prev === 0 ? 3 : prev - 1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 text-white p-3 rounded-full hover:bg-opacity-50 transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => prev === 3 ? 0 : prev + 1)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 text-white p-3 rounded-full hover:bg-opacity-50 transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide siguiente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>

      {/* Sección de productos ------------------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-12 text-center">
          Conocer nuestros productos
        </h1>

        {/* Carrusel*/}
        <div className="relative">

          {/* Flecha izquierda */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-3 hover:bg-blue-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Flecha derecha */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-3 hover:bg-blue-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Contenedor del carrusel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / 4)}%)`, // 4 cards visibles
                width: `${totalCards * 25}%` // 25% por card (4 visibles)
              }}
            >
              {/* Tarjeta Señora de la cuenta  */}
              <div className="flex-shrink-0 w-1/4 px-2">
                <a href= "" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://img.lovepik.com/photo/60179/8751.jpg_wh860.jpg" 
                      alt="Señora Cuenta"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-xl font-semibold text-blue-700 group-hover:text-blue-600 transition-colors">
                      Serbora Cuenta
                    </h3>
                    <p className="text-gray-600 mt-2">Cuenta especialmente dirigida para la mujer guatemalteca</p>
                  </div>
                </a>
              </div>

              {/* Tarjeta Dinero al Chilazo */}
              <div className="flex-shrink-0 w-1/4 px-2">
                <a href="" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-green-100 to-yellow-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://us.images.westend61.de/0001342837j/hombre-sacando-dinero-en-un-cajero-automatico-de-la-ciudad-LJF01428.jpg" 
                      alt="Dinero al Chilazo"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-xl font-semibold text-blue-700 group-hover:text-blue-600 transition-colors">
                      Dinero al Chilazo
                    </h3>
                    <p className="text-gray-600 mt-2">Hay gastos que no pueden esperar</p>
                  </div>
                </a>
              </div>

              {/* Tarjeta Crédito Amigo Trabajador */}
              <div className="flex-shrink-0 w-1/4 px-2">
                <a href="" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://media.istockphoto.com/id/1551147598/es/foto/alegre-hombre-cauc%C3%A1sico-cliente-bancario-cliente-mostrando-tarjeta-de-cr%C3%A9dito-para-banca.jpg?s=612x612&w=0&k=20&c=m-cLAHLjtB4yRNEPvTVtdp2BZlEhMedK200ps_jFf0Y=" 
                      alt="Crédito Amigo Trabajador"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-xl font-semibold text-blue-700 group-hover:text-blue-600 transition-colors">
                      Crédito Amigo Trabajador
                    </h3>
                    <p className="text-gray-600 mt-2">Trabajas en institución del gobierno o empresa privada</p>
                  </div>
                </a>
              </div>

              {/* Tarjeta Remesas Familiares */}
              <div className="flex-shrink-0 w-1/4 px-2">
                <a href="" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://esdesarrollo.com/wp-content/uploads/2022/10/Remesas.jpg" 
                      alt="Remesas Familiares"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-xl font-semibold text-blue-700 group-hover:text-blue-600 transition-colors">
                      Remesas Familiares
                    </h3>
                    <p className="text-gray-600 mt-2">Envia tus Remesas Familiares por Barruzú</p>
                  </div>
                </a>
              </div>

             
            </div>
          </div>
        </div>

        {/* Indicadores de paginación */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalCards)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-blue-300'}`}
            />
          ))}
        </div>
      </div>

      <section>
       <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-inner my-12 max-w-3xl mx-auto border border-blue-100">
      <div className="flex items-start gap-5">
        {/* Icono SVG directo */}
        <div className="bg-white p-3 rounded-full shadow-sm border border-blue-200 flex-shrink-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Cómo proteger tu dinero</h3>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Revisa periódicamente tus movimientos bancarios y reporta cualquier transacción sospechosa de inmediato.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
            Ver medidas de seguridad
          </button>
        </div>
      </div>
    </section>
      </section>
      {/* Sección de contacto ------------------------------------------------------------------------------ */}
      <section>
         <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-sm border border-blue-200">
    {/* Encabezado */}
    <div className="text-center mb-8">
      <h3 className="text-2xl font-semibold text-blue-800 mb-2">Te ayudamos a cumplir tus metas</h3>
      <p className="text-blue-600 max-w-md mx-auto">Elige una opción para empezar tu plan financiero</p>
    </div>

    {/* Grid de 6 botones-iconos */}
    <div className="grid grid-cols-3 gap-4">
      {/* Botón 1: Ahorro */}
      <button className="group bg-white p-4 rounded-xl shadow-xs border border-blue-200 hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-blue-800 group-hover:text-blue-900">Ahorro</span>
      </button>

      {/* Botón 2: Inversión */}
      <button className="group bg-white p-4 rounded-xl shadow-xs border border-blue-200 hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-blue-800 group-hover:text-blue-900">Inversión</span>
      </button>

      {/* Botón 3: Educación */}
      <button className="group bg-white p-4 rounded-xl shadow-xs border border-blue-200 hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-blue-800 group-hover:text-blue-900">Educación</span>
      </button>

      {/* Botón 4: Viajes */}
      <button className="group bg-white p-4 rounded-xl shadow-xs border border-blue-200 hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-blue-800 group-hover:text-blue-900">Viajes</span>
      </button>

      {/* Botón 5: Hogar */}
      <button className="group bg-white p-4 rounded-xl shadow-xs border border-blue-200 hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-blue-800 group-hover:text-blue-900">Hogar</span>
      </button>

      {/* Botón 6: Retiro */}
      <button className="group bg-white p-4 rounded-xl shadow-xs border border-blue-200 hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-blue-800 group-hover:text-blue-900">Retiro</span>
      </button>
    </div>
  </div>
</section>
 <section className="bg-blue-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestros clientes <span className="text-blue-300">hablan</span>
          </h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Descubre cómo estamos transformando la experiencia bancaria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonio 1 - Ahorros */}
          <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:-translate-y-2 transition duration-500">
            <div className="flex items-start mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-900">Roberto Sánchez</h4>
                <p className="text-blue-600 text-sm">Cliente Premium</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              "Gracias al plan de ahorros de este banco, pude comprar mi primera casa. La asesoría personalizada hizo toda la diferencia."
            </p>
            <div className="flex justify-between items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-blue-500 font-medium">Hace 2 meses</span>
            </div>
          </div>

          {/* Testimonio 2 - Préstamos */}
          <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:-translate-y-2 transition duration-500">
            <div className="flex items-start mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-900">Laura Mendoza</h4>
                <p className="text-blue-600 text-sm">Pequeña Empresaria</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              "El préstamo que me aprobaron en 48 horas salvó mi negocio. Las tasas competitivas y el trato humano son incomparables."
            </p>
            <div className="flex justify-between items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-blue-500 font-medium">Hace 3 semanas</span>
            </div>
          </div>

          {/* Testimonio 3 - Banca Digital */}
          <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:-translate-y-2 transition duration-500">
            <div className="flex items-start mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-900">Diego Ramírez</h4>
                <p className="text-blue-600 text-sm">Freelancer</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              "La app móvil es la mejor del mercado. Puedo hacer todo desde mi teléfono sin visitar sucursales. ¡Innovación real!"
            </p>
            <div className="flex justify-between items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-blue-500 font-medium">Ayer</span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-white text-blue-900 hover:bg-blue-100 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            Abre tu cuenta hoy mismo
          </button>
        </div>
      </div>
    </section>

    {/* Footer ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
     <footer className="bg-white text-blue-900 border-t border-blue-200">
      {/* Sección de Contacto */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo y Redes Sociales */}
          <div className="space-y-6">
            <div className="flex items-center">
              <svg className="w-10 h-10 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span className="text-2xl font-bold">Banco Valmeria</span>
            </div>
            <p className="text-blue-700">
              Tu socio financiero confiable desde 2007.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contacto Principal */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-800">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <p className="font-medium text-blue-900">Atención al Cliente</p>
                  <p className="text-blue-700">+502 1235-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <p className="font-medium text-blue-900">Correo Electrónico</p>
                  <p className="text-blue-700">contacto@bancoValmeria.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="font-medium text-blue-900">Sucursal Principal</p>
                  <p className="text-blue-700">Av. Fundacion Kinal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horario de Atención */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-800">Horario</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-blue-900">Lunes - Viernes</span>
                <span className="text-blue-700">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-blue-900">Sábados</span>
                <span className="text-blue-700">9:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-blue-900">Domingos</span>
                <span className="text-blue-700">Cerrado</span>
              </div>
              <div className="pt-2">
                <p className="text-blue-600 text-sm">* Horario extendido en cajeros automáticos</p>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-800">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-700 hover:text-blue-900 transition">Portal de Clientes</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-900 transition">Tarifas y Comisiones</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-900 transition">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-900 transition">Tasas de Interés</a></li>
              <li><a href="#" className="text-blue-700 hover:text-blue-900 transition">Trabaja con Nosotros</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className="bg-blue-50 py-6 border-t border-blue-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-700 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Banco Valmeria. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-700 hover:text-blue-900 text-sm transition">Términos de Servicio</a>
              <a href="#" className="text-blue-700 hover:text-blue-900 text-sm transition">Política de Privacidad</a>
              <a href="#" className="text-blue-700 hover:text-blue-900 text-sm transition">Seguridad</a>
              <a href="#" className="text-blue-700 hover:text-blue-900 text-sm transition">Mapa del Sitio</a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-blue-600 text-xs">
              Banco Valmeria es una entidad financiera regulada por la Superintendencia de Bancos. Tus depósitos están asegurados hasta por Q.100 quetzales
            </p>
          </div>
        </div>
      </div>
    </footer>

    </section>
  );
};

export default HomePage;