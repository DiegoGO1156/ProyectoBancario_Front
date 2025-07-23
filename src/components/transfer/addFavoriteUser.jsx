import { useState } from "react";
import { makeAUserFavorite } from "../../services/api";
import { Label } from "../ui/label";
import { MotionInput } from "../ui/input";
import { cn } from "../ui/lib/utils";
import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import Footer from "../Homepage/Footer";

export const AddFavoriteUser = () => {
  const [number, setNumber] = useState("");
  const [alias, setAlias] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!number.trim() || !alias.trim()) {
    setMessage("Debes ingresar número y alias.");
    return;
  }

  const result = await makeAUserFavorite(number, alias);

  if (result.error) {
    setMessage(result.message);
  } else {
    setMessage("Usuario agregado a favoritos correctamente.");
    setNumber("");
    setAlias("");
  }
};

  return (
    <div className="flex h-full">
      <SidebarAdmin />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Agregar Usuario Favorito</h2>

        <div className="shadow-input mx-auto w-full max-w-md bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ml-20">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                  Agregar usuario Favoritos
                </h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  Ingresa el numero de cuenta y el alias que desees.
                </p>
        
                <form onSubmit={handleSubmit} className="my-8 space-y-4">
                  <LabelInputContainer>
                    <Label htmlFor="countNumber">Numero de cuenta</Label>
                    <MotionInput
                      id="countNumber"
                      placeholder="Ej: 42153529720"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      type="text"
                      step="0.01"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="alias">Alias</Label>
                    <MotionInput
                      id="alias"
                      placeholder="Ej: carlos"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                      type="text"
                    />
                  </LabelInputContainer>
                  <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-md dark:bg-zinc-800"
                    type="submit"
                  >
                    Agregar usuario favorito &rarr;
                    <BottomGradient />
                  </button>
                </form>
        
                {message && (
                  <p className="text-sm text-center text-red-600 dark:text-red-400 mt-2">
                    {message}
                  </p>
                )}
              </div>

        {message && <p className="mt-4 text-sm text-center text-green-700">{message}</p>}
      </div>
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
};

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);