const SecuritySection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-inner my-12 max-w-3xl mx-auto border border-blue-100">
      <div className="flex items-start gap-5">
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
  );
};

export default SecuritySection;