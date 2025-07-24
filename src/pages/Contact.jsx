import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';


export const AboutValmeriaPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  // Datos de preguntas frecuentes
  const faqs = [
    {
      question: "¿Qué hace único a Banco Valmeria?",
      answer: "Somos el único banco en la región con tecnología blockchain integrada para transacciones internacionales, ofreciendo comisiones hasta un 60% menores que la competencia."
    },
    {
      question: "¿Cómo protegen mis inversiones?",
      answer: "Tus activos están protegidos por nuestro sistema de seguridad multicapa y asegurados por la Corporación Federal de Seguro de Depósitos hasta por $250,000 por cuenta."
    },
    {
      question: "¿Qué canales de atención tienen?",
      answer: "Ofrecemos atención 24/7 mediante nuestra app, chat en línea, teléfono (800-VALMERIA) y en nuestras 85 sucursales a nivel nacional."
    },
    {
      question: "¿Tienen programas de responsabilidad social?",
      answer: "A través de Valmeria Foundation, destinamos el 1% de nuestras utilidades anuales a programas de educación financiera y desarrollo comunitario."
    }
  ];

  return (
    <>
      <div className='my-12'>
        <Navbar />
      </div>
      <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Banco Valmeria</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Innovación financiera con seguridad y transparencia desde 2007
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 ${activeTab === 'about' ? 'text-yellow-600 border-yellow-600' : 'text-gray-500 border-transparent hover:text-yellow-500'}`}
              >
                Nuestra Institución
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 ${activeTab === 'contact' ? 'text-yellow-600 border-yellow-600' : 'text-gray-500 border-transparent hover:text-yellow-500'}`}
              >
                Contacto
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 ${activeTab === 'faq' ? 'text-yellow-600 border-yellow-600' : 'text-gray-500 border-transparent hover:text-yellow-500'}`}
              >
                Preguntas Frecuentes
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-12 px-6">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">Nuestra Historia</h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-lg text-gray-700 mb-4">
                    Somos estudiantes de <strong className="text-yellow-600"> FUNDACION KINAL </strong> , siguiendo la carrera de Perito en informática con más de <strong className="text-yellow-600">2 años aprendiendo programacion</strong>.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Nuestra misión es poder cumplir nuestro objetivo de Desarrollar soluciones de software eficientes, escalables y seguras que cumplan con los requerimientos del cliente y los estándares de calidad, fomentando la colaboración, el aprendizaje continuo y la mejora constante de los procesos de desarrollo
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                    <p className="font-medium text-yellow-800">"En Valmeria no solo manejamos dinero, construimos confianza."</p>
                    <p className="text-yellow-700">- Scrum, Fundador</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-t-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Logros Recientes
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Expansión geográfica: Apertura de nuevas sucursales nacionales/internacionales.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700"> Reconocimiento como una de las "Mejores Empresas para Trabajar".</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Lanzamiento exitoso de una nueva app móvil con más de 1 millón de descargas.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Presencia Nacional
                  </h3>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700"><span className="font-bold text-blue-900">85 sucursales</span> en 12 departamentos</p>
                      <p className="text-gray-700"><span className="font-bold text-blue-900">320 cajeros</span> automáticos propios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">Contáctanos</h2>
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Atención al Cliente</h4>
                        <p className="text-gray-700"> VALMERIA (8254-6374)</p>
                        <p className="text-gray-700">Lunes a Viernes: 7:00 AM - 10:00 PM</p>
                        <p className="text-gray-700">Sábados: 8:00 AM - 4:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Correo Electrónico</h4>
                        <p className="text-gray-700">contacto@valmeria.com</p>
                        <p className="text-gray-700">emergencias@valmeria.com (24/7)</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Oficina Principal</h4>
                        <p className="text-gray-700">Torre Valmeria, Av. Fundacion Kinal 1500</p>
                        <p className="text-gray-700">Ciudad Capital, CP 45080</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Equipo Directivo</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 flex items-center border-l-4 border-yellow-500">
                    <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">
                      AV
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Diego Otuc</h4>
                      <p className="text-gray-600 text-sm">Full Stack y Presidente Ejecutivo</p>
                      <p className="text-yellow-600 text-sm">dgarcia-2023402@kinal.edu.gt</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 flex items-center border-l-4 border-blue-500">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">
                      RM
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Rafael Carrillo</h4>
                      <p className="text-gray-600 text-sm"> Backend</p>
                      <p className="text-blue-600 text-sm">acarrillo-2020412@kinal.edu.gt</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 flex items-center border-l-4 border-yellow-500">
                    <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">
                      LG
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Luis Cuxun</h4>
                      <p className="text-gray-600 text-sm"> Fronted</p>
                      <p className="text-yellow-600 text-sm">lcuxun-2023518@kinal.edu.gt</p>
                    </div>
                  </div>
                   <div className="bg-white rounded-lg shadow-sm p-4 flex items-center border-l-4 border-blue-500">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">
                      LG
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Gerardo Contreras</h4>
                      <p className="text-gray-600 text-sm"> Backend</p>
                      <p className="text-blue-600 text-sm">gcontreras-2020282@kinal.edu.gt</p>
                    </div>
                  </div>
                   <div className="bg-white rounded-lg shadow-sm p-4 flex items-center border-l-4 border-yellow-500">
                    <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">
                      LG
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Jose Cipriano</h4>
                      <p className="text-gray-600 text-sm"> Fronted</p>
                      <p className="text-yellow-600 text-sm">jcipriano-2020359@kinal.edu.gt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Preguntas Frecuentes</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border-l-4 border-yellow-500">
                    <button 
                      className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                      onClick={() => {
                        const updatedFaqs = [...faqs];
                        updatedFaqs[index].expanded = !updatedFaqs[index].expanded;
                        // En una implementación real usarías estado aquí
                      }}
                    >
                      <h3 className="text-lg font-medium text-blue-900">{faq.question}</h3>
                      <svg 
                        className={`w-6 h-6 text-yellow-600 transform transition-transform`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="px-6 pb-6 pt-0 text-gray-700">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <span className="text-2xl font-bold">Valmeria</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-yellow-300">Supervisado por la Comisión de Scrum</p>
                <p className="text-sm text-blue-300 mt-1">© {new Date().getFullYear()} Banco Valmeria. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};