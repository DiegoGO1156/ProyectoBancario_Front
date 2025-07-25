import { useState } from "react";
import { useBrands } from "../../shared/hooks/useBrand";
import { AddBrandModal } from "./addBrands";
import { EditBrandModal } from "./updateBrand";
import DeleteConfirmationModal from "./deleteBrand";

const BrandsGrid = () => {
    const { 
        brands, 
        loading, 
        error, 
        fetchBrands, 
        addBrand, 
        deleteBrand, 
        updateBrand 
    } = useBrands();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    const filteredBrands = brands.filter(brand => 
        brand.nameBrand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (brand) => {
        setSelectedBrand(brand);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (brand) => {
        setSelectedBrand(brand);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedBrand) return;
        await deleteBrand(selectedBrand._id);
        setShowDeleteModal(false);
    };

    if (loading && !brands.length) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {[...Array(8)].map((_, i) => (
                    <div 
                        key={i} 
                        className="bg-white rounded-xl shadow-md p-4 h-80 overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
                        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-6 mt-6 animate-fade-in">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                            <button 
                                onClick={fetchBrands}
                                className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-all hover:scale-105"
                            >
                                <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 animate-fade-in">
            {/* Encabezado con efecto de vidrio */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Marcas</h1>
                        <p className="mt-1 text-sm text-gray-500 font-medium">
                            Mostrando <span className="text-blue-600 font-bold">{filteredBrands.length}</span> de <span className="text-gray-700">{brands.length}</span> marcas
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar marcas..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Agregar Marca
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {filteredBrands.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-pulse">
                    <div className="mx-auto h-20 w-20 text-gray-300 mb-4 animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                        {searchTerm ? 'No se encontraron marcas' : 'No hay marcas registradas'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Intenta con otro término de búsqueda' : 'Agrega tu primera marca para comenzar'}
                    </p>
                    <button 
                        onClick={fetchBrands}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-all hover:scale-105"
                    >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Recargar marcas
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBrands.map((brand) => (
                        <BrandCard 
                            key={brand._id} 
                            brand={brand}
                            onEdit={() => handleEditClick(brand)}
                            onDelete={() => handleDeleteClick(brand)}
                            isHovered={hoveredCard === brand._id}
                            onMouseEnter={() => setHoveredCard(brand._id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        />
                    ))}
                </div>
            )}

            <AddBrandModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAddBrand={addBrand}
            />

            <EditBrandModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                brandToEdit={selectedBrand}
                onUpdateBrand={updateBrand}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                brandName={selectedBrand?.nameBrand || ''}
            />
        </div>
    );
};

const BrandCard = ({ brand, onEdit, onDelete, isHovered, onMouseEnter, onMouseLeave }) => {
    return (
        <div 
            className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'transform -translate-y-2 shadow-lg' : ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Efecto de iluminación al hacer hover */}
            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent pointer-events-none" />
            )}
            
            {/* Imagen con efecto de zoom */}
            <div className="h-48 bg-gray-100 overflow-hidden relative">
                <img
                    src={brand.image || 'https://via.placeholder.com/300'}
                    alt={brand.nameBrand}
                    className={`h-full w-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300';
                    }}
                />
                {/* Botón de eliminar flotante */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className={`absolute top-3 right-3 p-1.5 bg-white/90 text-red-500 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="Eliminar marca"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                    {brand.nameBrand}
                </h3>
                
                {/* Acciones que aparecen al hacer hover */}
                <div className={`flex justify-end mt-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="px-3 py-1 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-all hover:scale-105 text-sm"
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrandsGrid;