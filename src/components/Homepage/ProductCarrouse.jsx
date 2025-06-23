// components/ProductCarousel/ProductCarousel.jsx
import { useState } from 'react';

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = [
    {
      id: 1,
      title: "Señora Cuenta",
      description: "Cuenta especialmente dirigida para la mujer guatemalteca",
      image: "https://img.lovepik.com/photo/60179/8751.jpg_wh860.jpg",
      gradient: "from-purple-100 to-blue-100"
    },
    {
      id: 2,
      title: "Dinero al Chilazo",
      description: "Hay gastos que no pueden esperar",
      image: "https://i.blogs.es/888791/cajero2/1366_2000.jpg",
      gradient: "from-green-100 to-yellow-100"
    },
    {
      id: 3,
      title: "Crédito Amigo Trabajador",
      description: "Trabajas en institución del gobierno o empresa privada",
      image: "https://media.istockphoto.com/id/1551147598/es/foto/alegre-hombre-cauc%C3%A1sico-cliente-bancario-cliente-mostrando-tarjeta-de-cr%C3%A9dito-para-banca.jpg?s=612x612&w=0&k=20&c=m-cLAHLjtB4yRNEPvTVtdp2BZlEhMedK200ps_jFf0Y=",
      gradient: "from-blue-100 to-indigo-100"
    },
    {
      id: 4,
      title: "Remesas Familiares",
      description: "Envia tus Remesas Familiares por Barruzú",
      image: "https://esdesarrollo.com/wp-content/uploads/2022/10/Remesas.jpg",
      gradient: "from-orange-100 to-red-100"
    }
  ];

  const totalCards = products.length;
  
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

 //infi
  const duplicatedProducts = [...products, ...products, ...products];

  return (
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

      {/* carrusel */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / 4)}%)`,
            width: `${totalCards * 25}%`
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="flex-shrink-0 w-1/4 px-2">
              <a href="" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className={`h-48 bg-gradient-to-r ${product.gradient} flex items-center justify-center overflow-hidden`}>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-semibold text-blue-700 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de paginación */}
      <div className="flex justify-center mt-6 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-blue-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;