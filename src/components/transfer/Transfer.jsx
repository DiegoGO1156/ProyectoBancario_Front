import React from "react";
import { useUserProfile } from "../../shared/hooks";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import  Footer  from "../Homepage/Footer";

export const Transfer = () => {
    const { usuario, loading, error } = useUserProfile();

    if (loading) return <p>Cargando datos del usuario...</p>;
    if (error) return <p>Error: {error}</p>;

    return <Dashboard usuario={usuario} />;

}

const Dashboard = ({ usuario, switchTransferHandler }) => {
    const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, 
panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all 
    right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
    `;
    return (
        <div className="flex h-screen">
            <SidebarAdmin />
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
                <div className="text-black font-bold text-center">
                    <h1 className="text-4xl font-bold text-black mb-6">Transferencias</h1>
                    <div className="">
                        <TextGenerateEffect
                        words={words}
                        className="text-black text-sm text-center"
                        />
                    </div>
                </div>
                <CardContainer className="inter-var">
                    <CardBody className="relative bg-[#0d2b9c] group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-white/[0.2] w-full sm:w-[48rem] h-auto rounded-xl p-6 border">

                        <CardItem
                            translateZ={20}
                            className="absolute top-4 right-6 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
                        >
                            No. cuenta: {usuario.accountNumber}
                        </CardItem>

                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            Perfil de {usuario.name}
                        </CardItem>

                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            Hover over this card to unleash the power of CSS perspective
                        </CardItem>

                        <CardItem translateZ="100" className="w-full mt-10 flex items-center">
                            <div className="flex items-center gap-6">
                                <img
                                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                                    height="500"
                                    width="500"
                                    className="h-40 w-auto object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </div>
                            <div className="text-white text-4xl font-bold ml-25">
                                Saldo: ${usuario.income}
                            </div>
                        </CardItem>

                        <div className="flex justify-between items-center mt-20">
                            <CardItem
                                translateZ={20}
                                as="a"
                                href="https://twitter.com/mannupaaji"
                                target="__blank"
                                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                            ></CardItem>
                            <CardItem></CardItem>
                        </div>

                        <div className="flex justify-between items-center ">
                            <CardItem
                                translateZ={20}
                                as="a"
                                href="https://twitter.com/mannupaaji"
                                target="__blank"
                                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                            >
                                <button onClick={switchTransferHandler}>
                                    Transferencia
                                </button>
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                Agregar usuario
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
                <div className="mt-30">
                    <Footer />
                </div>
            </div>
        </div>
    );
}