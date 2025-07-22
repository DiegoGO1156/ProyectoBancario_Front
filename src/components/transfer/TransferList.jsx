import React, { useEffect, useState } from "react";
import { getTransferByUser } from "../../services";
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
      const res = await getTransferByUser({});
      console.log("Respuesta del backend:", res);

      const transferencesUser = Array.isArray(res.transferencesUser)
        ? res.transferencesUser
        : [];

      // Filtrar y ordenar por fecha (descendente)
      const confirmedTransfers = transferencesUser
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

      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Historial de Transferencias
        </h2>

        <div className="mb-4 text-center">
          <button
            onClick={fetchTransfers}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Actualizar
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Cargando transferencias...</p>
        )}

        {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}

        {!loading && transfers.length === 0 && (
          <p className="text-center text-gray-500">
            No hay transferencias confirmadas aún.
          </p>
        )}

        <CardContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transfers.map((t) => (
            <CardItem
              key={t._id}
              className="p-4 bg-white rounded shadow-md dark:bg-gray-800"
            >
              <CardBody>
                <p>
                  <strong>Cuenta destino:</strong>{" "}
                  {t.addresserName || t.addresserNumber || "Desconocido"}
                </p>
                <p>
                  <strong>Monto:</strong> Q{Number(t.amount).toFixed(2)}
                </p>
                <p>
                  <strong>Motivo:</strong> {t.motive || "Sin motivo"}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(t.date).toLocaleString("es-GT", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </CardBody>
            </CardItem>
          ))}
        </CardContainer>
      </div>
    </div>
  );
};
