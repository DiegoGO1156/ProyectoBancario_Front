// components/HeroCarousel/HeroCarousel.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageStatus, setImageStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageLoaded = (index) => {
    setImageStatus(prev => ({...prev, [index]: true}));
  };

  const handleImageError = (index) => {
    setImageStatus(prev => ({...prev, [index]: false}));
    console.error(`Error loading image for slide ${index}`);
  };

  const handleNavigateToAuthPage = () => {
    navigate('/auth');
  };

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Banca Digital Avanzada",
      subtitle: "Conoce mas",
      buttonText: "Inicia Sesión",
      action: handleNavigateToAuthPage
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Préstamos Personalizados",
      subtitle: "Soluciones financieras a tu medida",
      buttonText: "Solicitar ahora"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Inversiones Inteligentes",
      subtitle: "Haz crecer tu dinero con nuestros planes",
      buttonText: "Empezar a invertir"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      title: "Atención Personalizada",
      subtitle: "Ejecutivos dedicados a resolver tus necesidades",
      buttonText: "Contactar ejecutivo"
    }
  ];

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoaded(index)}
              onError={() => handleImageError(index)}
              loading="eager"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
              <div className="text-center px-6 max-w-4xl mx-auto">
                <h2 className="text-white text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-white text-xl md:text-2xl mb-8 animate-fade-in animate-delay-100">
                  {slide.subtitle}
                </p>
                <button 
                  onClick={slide.action || (() => {})}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in animate-delay-200"
                >
                  <strong>{slide.buttonText}</strong>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
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
        onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 text-white p-3 rounded-full hover:bg-opacity-50 transition-all duration-300 backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 text-white p-3 rounded-full hover:bg-opacity-50 transition-all duration-300 backdrop-blur-sm"
        aria-label="Slide siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroCarousel;