import React, { useEffect, useState } from "react";
import { getTransfer } from "../../services";
import { SidebarAdmin } from "../Navbar/SidebarAdmin";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export const TransferList = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchTransfers = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setErrorMsg("Usuario no autenticado.");
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(localStorage.getItem("user"));
      const userId = parsedUser?._id;

      if (!userId) {
        setErrorMsg("No se pudo obtener el ID del usuario.");
        setLoading(false);
        return;
      }

      const res = await getTransfer(userId);

      const transferences = Array.isArray(res.transferencesUser)
        ? res.transferencesUser
        : [];

      const confirmedTransfers = transferences
        .filter((t) => t.verification === true)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setTransfers(confirmedTransfers);
    } catch (error) {
      console.error("Error al obtener transferencias:", error);
      setErrorMsg("No se pudieron cargar las transferencias.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />

      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-black">
          Historial de Transferencias
        </h2>
        {loading && (
          <p className="text-center text-gray-700 text-lg">Cargando transferencias...</p>
        )}

        {errorMsg && <p className="text-center text-red-600 text-lg">{errorMsg}</p>}

        {!loading && transfers.length === 0 && (
          <p className="text-center text-gray-700 text-lg">
            No hay transferencias confirmadas aún.
          </p>
        )}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {transfers.map((t) => (
            <div
              key={t._id}
              className="bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 border border-gray-200 flex flex-col justify-between"
            >
              <div className="space-y-3 text-black">
                <p className="text-lg">
                  <strong className="font-semibold text-black">Cuenta destino:</strong>{" "}
                  {t.addresserName || t.addresserNumber || "Desconocido"}
                </p>
                <p className="text-lg">
                  <strong className="font-semibold text-black">Monto:</strong>{" "}
                  <span className="text-green-700">Q{Number(t.amount).toFixed(2)}</span>
                </p>
                <p className="text-lg">
                  <strong className="font-semibold text-black">Motivo:</strong>{" "}
                  {t.motive || "Sin motivo"}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300 text-sm text-gray-600">
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(t.date).toLocaleString("es-GT", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-8 text-center">
          <button
            onClick={fetchTransfers}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 mt-25"
          >
            Actualizar Transferencias
          </button>
        </div>
      </div>
    </div>
  );
};