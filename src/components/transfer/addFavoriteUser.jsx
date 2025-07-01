// AddFavoriteUser.jsx
import { useState } from "react";
import { useUserProfile } from "../../shared/hooks";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"
import { makeAUserFavorite } from "../../services";

export const AddFavoriteUser = (switchTransferHandler) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [message, setMessage] = useState(null);

  const handleAddFavorite = async (e) => {
    e.preventDefault();
    try {
      const res = await makeAUserFavorite(accountNumber, {}); // En tu backend, no se espera body
      if (res.success) {
        setMessage("Usuario agregado a favoritos correctamente.");
      } else {
        setMessage("No se pudo agregar. Verifica el número de cuenta.");
      }
    } catch (error) {
      setMessage("Error: " + (error?.response?.data?.message || "Error Usuario no encontrado"));
    }
  };

  return (
    <div>
      <form onSubmit={handleAddFavorite}>
        <CardContainer className="inter-var">
          <CardBody className="relative bg-[#104e64] group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-white/[0.2] w-full sm:w-[48rem] h-auto rounded-xl p-6 border">

            <CardItem
              translateZ={20}
              className="absolute top-4 right-6 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
            >
              <h2>Agregar usuario favorito</h2>
            </CardItem>

            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <input
                  type="text"
                  placeholder="Número de cuenta del destinatario"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <button type="submit">Agregar</button>
            </div>
          </CardBody>
        </CardContainer>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
