const FinancialGoals = () => {
  const goals = [
    {
      id: 1,
      title: "Ahorro",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Inversión",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Educación",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Viajes",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Hogar",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      )
    },
    {
      id: 6,
      title: "Retiro",
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-amber-200">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-amber-800 mb-2">Te ayudamos a cumplir tus metas</h3>
        <p className="text-amber-600 max-w-md mx-auto">Elige una opción para empezar tu plan financiero</p>
      </div>

      {/* Grid de 6 botones-iconos */}
      <div className="grid grid-cols-3 gap-4">
        {goals.map((goal) => (
          <button 
            key={goal.id} 
            className="group bg-white p-4 rounded-xl shadow-xs border border-amber-200 hover:border-amber-300 hover:-translate-y-1 transition-all flex flex-col items-center"
          >
            <div className="bg-amber-100 p-3 rounded-full mb-2 group-hover:bg-amber-200 transition-colors">
              {goal.icon}
            </div>
            <span className="text-sm font-medium text-amber-800 group-hover:text-amber-900">{goal.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FinancialGoals;