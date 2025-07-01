import { useState } from 'react';
import { Label } from "../ui/label";
import { MotionInput } from "../ui/input";
import { cn } from "../ui/lib/utils";
import { addTransfer } from '../../services';

export const TransferForm = ({ switchTransferHandler }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [motive, setMotive] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setMessage("Monto inválido");
      return;
    }

    try {
      const res = await addTransfer({
        accountNumberAddresser: accountNumber,
        amount: parsedAmount,
        motive,
      });

      if (res.success) {
        setMessage("Transferencia iniciada. Revisa tu correo.");
        setAccountNumber("");
        setAmount("");
        setMotive("");
      } else {
        setMessage("Error al transferir.");
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || "Error desconocido");
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ml-9">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Nueva Transferencia
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Ingresa los datos para hacer la transferencia.
      </p>

      <form onSubmit={handleSubmit} className="my-8 space-y-4">
        <LabelInputContainer>
          <Label htmlFor="account">Cuenta destino</Label>
          <MotionInput
            id="account"
            placeholder="Ej: 1234567890"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="amount">Monto</Label>
          <MotionInput
            id="amount"
            placeholder="Ej: 100.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            step="0.01"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="motive">Motivo</Label>
          <MotionInput
            id="motive"
            placeholder="Pago de servicios"
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
            type="text"
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

      <p
        className="mt-4 text-sm text-center text-blue-700 cursor-pointer hover:underline"
        onClick={switchTransferHandler}
      >
        Volver a menú de transferencias
      </p>
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

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
