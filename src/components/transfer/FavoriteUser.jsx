import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import  Footer  from "../Homepage/Footer";

export const FavoriteUser = () => {
    return(
        <div className="flex h-screen">
        <SidebarAdmin />
        <div className="bg-blue-50 w-full min-h-screen">
            <div className="p-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center justify-center gap-2">
                        <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        Usuarios Favoritos
                        <span className="text-gray-400 text-base font-normal ml-2">(Haz clic en la estrella para añadir/quitar)</span>
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
                            <div className="flex items-center">
                                <img className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-yellow-400" src="https://via.placeholder.com/150/FFD700/000000?text=JD" alt="User Avatar" />
                                <div>
                                    <p className="text-lg font-semibold text-blue-800">Juan Pérez <span className="text-sm font-normal text-gray-600">(Cuenta: 123456789)</span></p>
                                    <p className="text-sm text-gray-600">juan.perez@example.com</p>
                                </div>
                            </div>
                            <button className="text-yellow-500 hover:text-yellow-600 transition duration-200 focus:outline-none">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <img className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-300" src="https://via.placeholder.com/150/C0C0C0/000000?text=MR" alt="User Avatar" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">María Rodríguez <span className="text-sm font-normal text-gray-600">(Cuenta: 987654321)</span></p>
                                    <p className="text-sm text-gray-600">maria.rodriguez@example.com</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-500 transition duration-200 focus:outline-none">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="mt-10">
                    <Footer />
                </div>
            </div>
        </div>
    </div>
    )
}