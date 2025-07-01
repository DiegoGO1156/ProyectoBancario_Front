import { useState } from "react"
import { Transfer } from "../components/transfer/Transfer";
import { TransferForm } from "../components/transfer/TransferForm";
import { AddFavoriteUser } from "../components/transfer/addFavoriteUser";

export const Transfers = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [activeView, setActiveView] = useState("transfer");

    const handleTransfersPageToggle = () => {
        setIsLogin((prev) => !prev)
    }

    return (
  <div className="auth-container">
    {activeView === "transfer" && (
      <Transfer switchView={setActiveView} />
    )}
    {activeView === "form" && (
      <TransferForm switchView={setActiveView} />
    )}
    {activeView === "favorite" && (
      <AddFavoriteUser switchView={setActiveView} />
    )}
  </div>
);
}