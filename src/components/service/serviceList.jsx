import React, { useEffect, useState } from "react";
import { getServices } from "../../services/api";
import { payService } from "../../services/api";
import { useUserProfile } from "../../shared/hooks";
import { SidebarAdmin } from "../Navbar/SidebarAdmin";
import Footer from "../Homepage/Footer";

export const ServiceList = () => {
  const [services, setServices] = useState([]);
  const { usuario, refetch } = useUserProfile();

  useEffect(() => {
    getServices().then((res) => {
      if (res?.servicesResult) {
        setServices(res.servicesResult);
      } else {
        console.error("No se encontraron servicios");
      }
    });
  }, []);

  const handlePayService = async (id, isExclusive, price) => {
    const amount = isExclusive ? 0 : prompt("Ingrese monto a pagar:");
    const parsedAmount = Number(amount);
    if (!isExclusive && (isNaN(parsedAmount) || parsedAmount <= 0)) {
      alert("Monto inválido.");
      return;
    }

    const result = await payService(id, parsedAmount);
    if (result.success) {
      refetch();
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">
        {/* Contenido principal */}
        <div className="p-6 flex-1 ml-65">
          <h1 className="text-3xl font-bold mb-6">Servicios disponibles</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map(({ _id, nameService, price, description, exclusive }) => (
              <div key={_id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{nameService}</h2>
                <p className="text-gray-600">{description}</p>
                <p className="text-green-700 font-bold">Q{price}</p>
                <button
                  onClick={() => handlePayService(_id, exclusive, price)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {exclusive ? "Pagar servicio" : "Ingresar monto"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer fijo al fondo */}
        <Footer />
      </div>
    </div>
  );
};
