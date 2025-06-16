// hooks/useUserProfile.js
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";

export const useUserProfile = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const resultado = await getUserProfile();
      if (resultado?.error) {
        setError(resultado.message);
      } else {
        setUsuario(resultado);
      }
      setLoading(false);
    };

    cargarDatos();
  }, []);

  return { usuario, loading, error };
};
