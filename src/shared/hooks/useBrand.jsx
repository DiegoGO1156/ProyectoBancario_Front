import { useState, useEffect } from "react";
import { getBrands, createBrand, updateBrand  } from '../../services';

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
    

  

    useEffect(() => {
        fetchBrands();
    }, []);

    return{
        brands,
        loading,
        error,
        refresh: fetchBrands,
        addBrand,
        updateBrand: updateBrandHandler,
        resetState: () => {
      setError(null);
      
    }
    };
};