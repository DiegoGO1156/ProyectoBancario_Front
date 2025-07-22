import { SidebarAdmin } from "../Navbar/SidebarAdmin";
import React, { useState } from 'react';
import { useUpdatePassword } from '../../shared/hooks/useUpdatePassword';
import { useNavigate } from 'react-router-dom';
import Footer from "../Homepage/Footer";

export const UpdatePassword = () => {
    const [form, setForm] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    });

    const { updatePassword, loading, error, success } = useUpdatePassword();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert('Las nuevas contraseñas no coinciden');
            return;
        }

        await updatePassword({
            oldPassword: form.oldPassword,
            password: form.password
        });

        if (!error) {
            setTimeout(() => navigate('/profile'), 2000);
        }
    };

    return (
        <div className="flex h-screen">
            <SidebarAdmin />
            <div className="bg-blue-50 w-full min-h-screen">
                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <h2 className="text-xl font-bold text-blue-900 mb-6 flex flex-col items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Cambiar Contraseña
                        </h2>

                        {loading && <p className="text-blue-600 text-center">Actualizando contraseña...</p>}
                        {error && <p className="text-red-600 text-center">{error}</p>}
                        {success && <p className="text-green-600 text-center">Contraseña actualizada con éxito</p>}

                        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                            <div className="grid grid-cols-1 gap-6 w-full max-w-md">
                                <div>
                                    <label className="block text-sm font-medium text-blue-700 mb-1">Contraseña Actual</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={form.oldPassword}
                                        onChange={handleChange}
                                        required
                                        className="bg-blue-50 rounded-lg p-3 text-blue-900 w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-700 mb-1">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="bg-blue-50 rounded-lg p-3 text-blue-900 w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-700 mb-1">Confirmar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="bg-blue-50 rounded-lg p-3 text-blue-900 w-full"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>

                    <div className="mt-10">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword;