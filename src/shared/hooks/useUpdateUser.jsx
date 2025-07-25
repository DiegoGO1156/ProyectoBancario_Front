import { updateUser as apiUpdateUser } from "../../services";
import { useState } from "react";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateUser = async (userData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const res = await apiUpdateUser(userData); // <-- usa apiUpdateUser para la llamada real

    if (res?.error) {
      setError(res.message || "Error al actualizar el usuario");
      setSuccess(false);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return { updateUser, loading, error, success };
};

export default useUpdateUser;
