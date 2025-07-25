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
        <div className="p-6 flex-1 ml-65">
          <h1 className="text-3xl font-bold mb-6">Servicios disponibles</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md">
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-2a4 4 0 018 0v2m1 4H6a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v10a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg text-gray-600 font-medium">
                  No hay servicios disponibles por el momento.
                </p>
              </div>
            ) : (
              services.map(({ _id, nameService, price, description, exclusive }) => (
                <div
                  key={_id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                    {nameService}
                  </h2>
                  <p className="text-gray-600 mb-3">{description}</p>
                  <p className="text-green-700 font-bold text-lg mb-4">Q{price}</p>
                  <button
                    onClick={() => handlePayService(_id, exclusive, price)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                  >
                    {exclusive ? "Pagar servicio" : "Ingresar monto"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
