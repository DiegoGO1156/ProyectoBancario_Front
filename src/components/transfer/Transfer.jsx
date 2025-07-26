import React from "react";
import { useUserProfile } from "../../shared/hooks";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import  Footer  from "../Homepage/Footer";
import { SidebarUsers } from "../Navbar/SidebarUser";

export const Transfer = () => {
    const { usuario, loading, error } = useUserProfile();

    if (loading) return <p>Cargando datos del usuario...</p>;
    if (error) return <p>Error: {error}</p>;

    return <Dashboard usuario={usuario} />;

}

const role = localStorage.getItem("roleUser")

const Dashboard = ({ usuario, switchTransferHandler }) => {
    const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, 
panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all 
    right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
    `;
    return (
        <div className="flex h-screen">
            {
                role === "ADMIN" ? <SidebarAdmin /> : <SidebarUsers/>
            }
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex flex-col items-center">
        <div className="text-black font-bold text-center mb-16 mt-8">
            <h1 className="text-6xl font-extrabold text-blue-800 mb-6 tracking-tight drop-shadow-lg">Transferencias</h1>
            <TextGenerateEffect
                words={words}
                className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            />
        </div>
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl opacity-60"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="absolute right-1 text-base font-semibold text-blue-600 bg-blue-50 px-4 rounded-full shadow-md z-10">
                    No. cuenta: <span className="font-bold">{usuario.accountNumber}</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3 mt-4 text-center pr-28 mt-15">
                    Perfil de <span className="text-blue-700">{usuario.name}</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
                    Esta es el saldo que tienes actualmente en tu cuenta. Gestiona tus finanzas con facilidad.
                </p>

                <div className="relative bg-blue-700 text-white rounded-2xl p-6 md:p-8 shadow-lg w-full max-w-md mx-auto transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <p className="text-md font-medium mb-2 opacity-80">Saldo Disponible</p>
                    <div className="flex items-center justify-center">
                        <span className="text-5xl font-extrabold tracking-tight">${usuario.income}</span>
                        <span className="text-xl ml-2 font-semibold">USD</span>
                    </div>
                    <div className="absolute bottom-3 right-4 text-xs opacity-70">Actualizado al instante</div>
                </div>
                <div className="mt-12 flex justify-center gap-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Realizar Transferencia
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Ver Historial
                    </button>
                </div>
            </div>
        </div>

        <div className="mt-auto pt-10">
            <Footer />
        </div>
    </div>
</div>
    );
}