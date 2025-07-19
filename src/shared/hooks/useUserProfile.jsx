import { useEffect, useState, useCallback } from "react";
import { getUserProfile } from "../../services/api";

export const useUserProfile = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    const resultado = await getUserProfile();
    if (resultado?.error) {
      setError(resultado.message);
    } else {
      setUsuario(resultado);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return { usuario, loading, error, refetch: cargarDatos };
};
