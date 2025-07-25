const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Roberto Sánchez",
      role: "Cliente Premium",
      content: "Gracias al plan de ahorros de este banco, pude comprar mi primera casa. La asesoría personalizada hizo toda la diferencia.",
      date: "Hace 2 meses",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      name: "Laura Mendoza",
      role: "Pequeña Empresaria",
      content: "El préstamo que me aprobaron en 48 horas salvó mi negocio. Las tasas competitivas y el trato humano son incomparables.",
      date: "Hace 3 semanas",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      name: "Diego Ramírez",
      role: "Freelancer",
      content: "La app móvil es la mejor del mercado. Puedo hacer todo desde mi teléfono sin visitar sucursales. ¡Innovación real!",
      date: "Ayer",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestros clientes <span className="text-amber-300">hablan</span>
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Descubre cómo estamos transformando la experiencia bancaria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-lg shadow-2xl transform hover:-translate-y-2 transition duration-500 border-t-4 border-amber-500"
            >
              <div className="flex items-start mb-6">
                <div className="bg-amber-50 p-3 rounded-full mr-4">
                  {testimonial.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-blue-900">{testimonial.name}</h4>
                  <p className="text-amber-700 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex justify-between items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-amber-600 font-medium">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;