import { useState } from 'react';
import { changePassword } from '../../services';

export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updatePassword = async ({ oldPassword, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await changePassword({ oldPassword, password });

      if (res?.error) {
        setError(res.e?.response?.data?.msg || 'Error al actualizar la contraseña');
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.msg || 'Error inesperado al cambiar contraseña');
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePassword,
    loading,
    error,
    success,
  };
};
