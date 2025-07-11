import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import { Label } from "../ui/label";
import { MotionInput } from "../ui/input";
import { cn } from "../ui/lib/utils";
import { makeAUserFavorite } from "../../services";
import Footer from "../Homepage/Footer";

export const AddFavoriteUser = ({ switchTransferHandler }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState(null);

  const handleAddFavorite = async (e) => {
    e.preventDefault();

    try {
      const res = await makeAUserFavorite(accountNumber, { alias });
      if (res.success) {
        setMessage("✅ Usuario agregado a favoritos correctamente.");
        setAccountNumber('');
        setAlias('');
      } else {
        setMessage("❌ No se pudo agregar. Verifica el número de cuenta.");
      }
    } catch (error) {
      setMessage("❌ Error: " + (error?.response?.data?.message || "Usuario no encontrado"));
    }
  };

  return (
    <div className="flex h-screen ">
        <SidebarAdmin/>
        <div className="ml-60">
          <div className='text-black font-bold text-center ml-90'>
            <h1 className='text-4xl font-bold text-black mb-10'>Formulario de transferencias</h1>
          </div>
          <div className="shadow-input mx-auto w-full max-w-md bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ml-170 mt-40">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Nueva Transferencia
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Selecciona un usuario favorito para realizar la transferencia.
            </p>

            <form onSubmit={handleAddFavorite} className="my-8 space-y-4">
              <LabelInputContainer>
                <Label>No. de cuenta destinatario </Label>
                <MotionInput
                  type="text"
                  placeholder="Número de cuenta del destinatario"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label >Motivo</Label>
                <MotionInput
                  type="text"
                  placeholder="Alias (Ej: Carlos trabajo)"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  required
                />
              </LabelInputContainer>
              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-md dark:bg-zinc-800"
                type="submit"
              >
                Transferir &rarr;
                <BottomGradient />
              </button>
            </form>

            {message && (
              <p className="text-sm text-center text-red-600 dark:text-red-400 mt-2">
                {message}
              </p>
            )}
          </div>
          <div className="mt-80 ml-20">
            <Footer />
          </div>
        </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};