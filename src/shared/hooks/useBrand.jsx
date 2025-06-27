import { useState, useEffect } from "react";
import { getBrands, createBrand, updateBrand, searchBrandById, deleteBrand} from '../../services';

export const useBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Listar
    const fetchBrands = async () => {
        try {
            setLoading(true);
            const response = await getBrands();

            if (response.error){
                throw new Error(response.e);
            }

            setBrands(response.brands || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Error al cargar las marcas");
            setBrands([]);
        } finally{
            setLoading(false);
        }
    };

    //Agregar
    const addBrand = async (brandData) => {
    setLoading(true);
    try {
      const newBrand = await createBrand(brandData); 
      setBrands(prevBrands => [newBrand, ...prevBrands]);
      return { success: true, data: newBrand };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

    //editar
  const updateBrandHandler = async (id, brandData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await updateBrand(id, brandData);
      
      // Maneja la respuesta de tu servicio
      if (response.error) {
        throw new Error(response.message);
      }
      
     
      return response; // Devuelve los datos actualizados
    } catch (err) {
      setError(err.message || 'Error al actualizar la marca');
      throw err; // Re-lanza el error para manejo adicional
    } finally {
      setLoading(false);
    }
  };

  //buscar por id
  const searchBrand = async (id) => {
        try {
            setLoading(true);
            setError(null);
            setSearchResult(null);
            
            const response = await searchBrandById(id);
            
            if (response.error) {
                throw new Error(response.message);
            }

            setSearchResult(response.brand);
            return { success: true, data: response.brand };
        } catch (err) {
            setError(err.message || "Error al buscar la marca");
            setSearchResult(null);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    //Eliminar 
    const handleDeleteBrand = async (id) => {
    try {
      setLoading(true);
      const result = await deleteBrand(id);
      
      if (result.error) {
        throw new Error(result.message);
      }

      setBrands(prev => prev.filter(brand => brand._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

    
    
    useEffect(() => {
        fetchBrands();
    }, []);

    return{
        brands,
        loading,
        error,
        searchBrand,
        refresh: fetchBrands,
        addBrand,
        deleteBrand: handleDeleteBrand,
        updateBrand: updateBrandHandler,
        resetState: () => {
            setError(null);
          
        }
    };
};