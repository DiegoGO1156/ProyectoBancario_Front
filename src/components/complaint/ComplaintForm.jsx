import { useState, useEffect } from "react";
import { addComplaints, addComplaintsAnonymous, getCategories } from "../../services";
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../SideBar"

export const ComplaintForm = ({ isAnonymous }) => {
    const [form, setForm] = useState({
        type: "",
        description: "",
        evidence: "",
        category: "",
        address: ""
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCategories = async () => {
            const result = await getCategories();
            console.log("Categorías cargadas:", result);
            if (Array.isArray(result)) {
                setCategories(result);
            } else {
                console.error("No se pudieron cargar las categorías correctamente:", result);
            }
        };
        loadCategories();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");
        try {
            if (isAnonymous) {
                await addComplaintsAnonymous(form);
            } else {
                await addComplaints(form);
            }
            setSuccess(true);
            setForm({
                type: "",
                description: "",
                evidence: "",
                category: "",
                address: ""
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error("Error al enviar denuncia", error);
            setError("Ocurrió un error al enviar tu denuncia. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

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

    const selectArrowSvg = encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
            <path fill='none' stroke='#EDC5AB' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/>
        </svg>
    `);

    return (
        <div className="flex h-screen items-center justify-center bg-[#E7EAEF]">
            <Sidebar />
            <div className="">
                <div className="">
                    <motion.form
                        onSubmit={handleSubmit}
                        className=" max-w-xl p-8 bg-[#217074] text-white rounded-xl shadow-lg  overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-light text-white mb-8 text-center tracking-tight">
                            Registrar Denuncia <span className="font-normal text-gray-300">{isAnonymous && "(Anónima)"}</span>
                        </motion.h2>

                        <motion.div variants={itemVariants} className="mb-6 relative">
                            <input
                                id="type"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                placeholder=" "
                                required
                                className="peer w-full px-4 pt-6 pb-2 border border-[#8B9D77] text-white rounded-lg outline-none transition-all duration-200 bg-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                whileFocus={{ scale: 1.005 }}
                            />
                            <label
                                htmlFor="type"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDC5AB] text-base transition-all duration-200 pointer-events-none
                                            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#EDC5AB]
                                            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#EDC5AB]"
                            >
                                Tipo de denuncia
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-6 relative">
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder=" "
                                required
                                rows="4"
                                className="peer w-full px-4 pt-6 pb-2 border border-[#8B9D77] text-white rounded-lg outline-none transition-all duration-200 bg-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                whileFocus={{ scale: 1.005 }}
                            ></textarea>
                            <label
                                htmlFor="description"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDC5AB] text-base transition-all duration-200 pointer-events-none
                                            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#EDC5AB]
                                            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#EDC5AB]"
                            >
                                Descripción
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-6 relative">
                            <input
                                id="evidence"
                                name="evidence"
                                value={form.evidence}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 border border-[#8B9D77] text-white rounded-lg outline-none transition-all duration-200 bg-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                whileFocus={{ scale: 1.005 }}
                            />
                            <label
                                htmlFor="evidence"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDC5AB] text-base transition-all duration-200 pointer-events-none
                                            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#EDC5AB]
                                            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#EDC5AB]"
                            >
                                URL de evidencia (opcional)
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-6 relative">
                            <motion.select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                whileFocus={{ scale: 1.005 }}
                                className={`peer w-full px-4 pt-6 pb-2 border border-[#8B9D77] text-white rounded-lg outline-none 
                                    transition-all duration-200 bg-transparent appearance-none pr-10 focus:border-white focus:ring-2 
                                    focus:ring-white focus:ring-opacity-50
                                    bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]`}
                                style={{ backgroundImage: `url("data:image/svg+xml,${selectArrowSvg}")` }}
                            >
                                <option value="" disabled hidden className="text-gray-400 bg-[#217074]">
                                    Seleccionar categoría
                                </option>
                                {Array.isArray(categories) &&
                                    categories.map((cat) => (
                                        <option key={cat._id} value={cat.name} className="text-white bg-[#217074]">
                                            {cat.name}
                                        </option>
                                    ))}
                            </motion.select>

                            <label
                                htmlFor="category"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDC5AB] text-base transition-all duration-200 pointer-events-none
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#EDC5AB]
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#EDC5AB]"
                            >
                                Categoría
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8 relative">
                            <input
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 border border-[#8B9D77] text-white rounded-lg outline-none transition-all duration-200 bg-transparent focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                whileFocus={{ scale: 1.005 }}
                            />
                            <label
                                htmlFor="address"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDC5AB] text-base transition-all duration-200 pointer-events-none
                                            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#EDC5AB]
                                            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#EDC5AB]"
                            >
                                Dirección
                            </label>
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 text-lg font-semibold bg-[#37745B] text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#37745B] focus:ring-opacity-50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </span>
                            ) : "Enviar Denuncia"}
                        </motion.button>

                        <AnimatePresence>
                            {success && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="text-green-400 mt-5 text-center text-base font-medium"
                                >
                                    ¡Denuncia enviada correctamente! Gracias por tu colaboración.
                                </motion.p>
                            )}
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="text-red-400 mt-5 text-center text-base font-medium"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default ComplaintForm;