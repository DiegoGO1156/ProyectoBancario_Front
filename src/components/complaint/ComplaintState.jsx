import React, { useEffect, useState } from 'react';
import { getComplaints } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../SideBar'; 

export const ComplaintState = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            setLoading(true);
            const result = await getComplaints();

            if (result.error) {
                setError('Error al obtener las denuncias');
            } else {
                setComplaints(result.complaints);
            }

            setLoading(false);
        };

        fetchComplaints();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <div className="flex h-screen bg-[#E7EAEF]">
            <Sidebar />
            <div className="flex-1 flex flex-col items-center justify-center p-8 mb-110">
                <motion.div
                    className="w-full max-w-4xl bg-[#217074] text-white rounded-xl shadow-lg p-8 overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-light text-white mb-8 text-center tracking-tight">
                        Mis Denuncias
                    </motion.h2>

                    {loading && <p className="text-center text-[#EDC5AB]">Cargando denuncias...</p>}
                    {error && <p className="text-center text-red-400">{error}</p>}

                    {!loading && !error && (
                        <motion.div variants={itemVariants} className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-[#8B9D77] rounded-lg overflow-hidden">
                                <thead className="bg-[#37745B]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Descripción
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Dirección
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Fecha
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#217074] divide-y divide-[#8B9D77]">
                                    {complaints.map((complaint) => (
                                        <tr key={complaint._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {complaint.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white max-w-xs overflow-hidden text-ellipsis">
                                                {complaint.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {complaint.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                    ${complaint.statusComplaint === 'Activa' ? 'bg-green-100 text-green-800' :
                                                      complaint.statusComplaint === 'En Proceso' ? 'bg-orange-100 text-orange-800' :
                                                      'bg-gray-100 text-gray-800'}`}>
                                                    {complaint.statusComplaint}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                {new Date(complaint.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default ComplaintState;