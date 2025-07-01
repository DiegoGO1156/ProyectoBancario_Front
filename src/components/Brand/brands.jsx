import { useState } from "react";
import { useBrands } from "../../shared/hooks/useBrand";
import { AddBrandModal } from "./addBrands";
import { EditBrandModal } from "./updateBrand";

const BrandsGrid = () => {
    const { brands, loading, error, refresh } = useBrands();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
  
    const filteredBrands = brands.filter(brand => 
      brand.nameBrand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={refresh}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="space-y-6">
        {/* Header y buscador */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900"> Marcas</h1>
            <p className="mt-1 text-sm text-gray-500">
              {filteredBrands.length} {filteredBrands.length === 1 ? 'marca encontrada' : 'marcas encontradas'}
            </p>
          </div>
          
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar marcas..."
              className="block w-full rounded-md border border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
               <button 
                 onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md mb-20 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                 + Agregar Marca
              </button>
               <AddBrandModal 
                      isOpen={isModalOpen} 
                      onClose={() => setIsModalOpen(false)} 
                    />
          </div>
        </div>
  
        {/* Lista de marcas */}
        {filteredBrands.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4 text-4xl">📷</div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchTerm ? 'No se encontraron marcas con ese nombre' : 'No hay marcas registradas'}
            </h3>
            <button 
              onClick={refresh}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-bylue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Recargar marcas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <div 
                key={brand._id} 
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
                  <img
                    src={brand.image === " " ? brand.image : brand.image}
                    alt={brand.nameBrand}
                    className="object-cover w-full h-48"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {brand.nameBrand}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      brand.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {brand.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                      onClick={() => onEditBrand(brand)}
                    >
                      <span className="text-sm font-medium">Editar</span>
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">...</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default BrandsGrid;

