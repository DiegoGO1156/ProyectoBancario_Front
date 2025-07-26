import React, { useState } from 'react';
import { SidebarAdmin } from '../Navbar/SidebarAdmin'; 
import Footer from "../Homepage/Footer"; 
import { SidebarUsers } from '../Navbar/SidebarUser';
export const FavoriteUser = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Juan Pérez",
            account: "123456789",
            email: "juan.perez@example.com",
            avatar: "https://placehold.co/150x150/FFD700/000000?text=JD",
            isFavorite: true,
        },
        {
            id: 2,
            name: "María Rodríguez",
            account: "987654321",
            email: "maria.rodriguez@example.com",
            avatar: "https://placehold.co/150x150/C0C0C0/000000?text=MR",
            isFavorite: false,
        },
        {
            id: 3,
            name: "Carlos Gómez",
            account: "112233445",
            email: "carlos.gomez@example.com",
            avatar: "https://placehold.co/150x150/ADD8E6/000000?text=CG",
            isFavorite: true,
        },
        {
            id: 4,
            name: "Ana López",
            account: "556677889",
            email: "ana.lopez@example.com",
            avatar: "https://placehold.co/150x150/FFB6C1/000000?text=AL",
            isFavorite: false,
        },
    ]);

    const toggleFavorite = (id) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === id ? { ...user, isFavorite: !user.isFavorite } : user
            )
        );
    };

    const role = localStorage.getItem("roleuser")

    return (
        <div className="flex h-screen font-inter"> 
            {
                role === "ADMIN" ? <SidebarAdmin />: <SidebarUsers/>
            }
            <div className="bg-blue-50 w-full min-h-screen overflow-auto">
                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center justify-center gap-2">
                            <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                            Usuarios Favoritos
                        </h2>
                        <div className="space-y-4">
                            {users.map(user => (
                                <div
                                    key={user.id}
                                    className={`flex items-center justify-between py-2 px-3 rounded-lg shadow-sm border
                                        ${user.isFavorite ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
                                >
                                    <div className="flex items-center">
                                        <img
                                            className={`w-12 h-12 rounded-full object-cover mr-4 border-2
                                                ${user.isFavorite ? 'border-yellow-400' : 'border-gray-300'}`}
                                            src={user.avatar}
                                            alt="User Avatar"
                                        />
                                        <div>
                                            <p className="text-base font-semibold text-blue-800">
                                                {user.name} <span className="text-xs font-normal text-gray-600">(Cuenta: {user.account})</span> 
                                            </p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleFavorite(user.id)}
                                        className={`transition duration-200 focus:outline-none
                                            ${user.isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-500'}`}
                                        aria-label={user.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                                    >
                                        {user.isFavorite ? (
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};