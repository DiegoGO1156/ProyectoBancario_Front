const SecuritySection = () => {
 return (
    <section className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl max-w-4xl mx-auto border-60 border-blue-100 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Ilustración */}
        <div className="w-full md:w-2/5">
          <img 
            src="https://recfaces.com/wp-content/uploads/2021/03/ways-to-make-your-home-safer-carl-jarl-locksmiths-security-systems.jpg" 
            alt="Seguridad bancaria"
            className="w-full h-auto max-w-xs mx-auto"
          />
        </div>

        {/* Contenido */}
        <div className="w-full md:w-3/5 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Protección Bancaria
          </h3>

          <div className="space-y-4">
            {/* Punto 1 */}
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Doble Administración</h4>
                <p className="text-sm text-gray-600">Dos administradores independientes para operaciones críticas</p>
              </div>
            </div>

            {/* Punto 2 */}
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Rutas Protegidas</h4>
                <p className="text-sm text-gray-600">Sistemas de enrutamiento con cifrado punto a punto</p>
              </div>
            </div>

            {/* Punto 3 */}
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Privacidad Garantizada</h4>
                <p className="text-sm text-gray-600">Administradores no acceden a datos personales de usuarios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default SecuritySection;