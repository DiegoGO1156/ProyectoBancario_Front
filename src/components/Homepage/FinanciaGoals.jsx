const FinancialGoals = () => {
   const services = [
    {
      id: 1,
      title: "Ahorro",
      icon: (
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Transferencias",
      icon: (
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Ver Cartera",
      icon: (
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Actualizar Datos",
      icon: (
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Adquirir Servicios",
      icon: (
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
      )
    },
    {
      id: 6,
      title: "Descuentos",
      icon: (
        <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl p-6 shadow-sm border border-amber-300">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-amber-900 mb-2">Servicios Financieros</h3>
        <p className="text-amber-700 max-w-md mx-auto">Accede a todas las opciones que tenemos para ti</p>
      </div>

      {/* Grid de 6 opciones */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <button 
            key={service.id} 
            className="group bg-white p-4 rounded-xl shadow-xs border border-amber-200 hover:border-amber-400 hover:-translate-y-1 transition-all flex flex-col items-center"
          >
            <div className="bg-amber-100 p-3 rounded-full mb-2 group-hover:bg-amber-200 transition-colors">
              {service.icon}
            </div>
            <span className="text-sm font-medium text-amber-900 group-hover:text-amber-800">{service.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FinancialGoals;