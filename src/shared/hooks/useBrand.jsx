import { useState, useEffect, useCallback } from "react";
import { getBrands, createBrand, updateBrand, searchBrandById, deleteBrand } from '../../services';

export const useBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    const fetchBrands = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getBrands();

            if (response.error) {
                throw new Error(response.e);
            }

            setBrands(response.brands || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Error al cargar las marcas");
            setBrands([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const addBrand = async (brandData) => {
    setLoading(true);
    try {
        const response = await createBrand(brandData);
        
        if (response.error) {
            throw new Error(response.message);
        }

        // Opción 1: Agregar la nueva marca al principio del array
        setBrands(prev => [response.brand, ...prev]);
        
        // Opción 2: Recargar todas las marcas (más seguro)
        // await fetchBrands();
        
        return { success: true, data: response.brand };
    } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
    } finally {
        setLoading(false);
    }
};

    const updateBrandHandler = async (id, brandData) => {
        try {
            setLoading(true);
            const response = await updateBrand(id, brandData);
            
            if (response.error) {
                throw new Error(response.message);
            }
            
            setBrands(prev => prev.map(brand => 
                brand._id === id ? { ...brand, ...brandData } : brand
            ));
            
            return response;
        } catch (err) {
            setError(err.message || 'Error al actualizar la marca');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const searchBrand = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await searchBrandById(id);
            
            if (response.error) {
                throw new Error(response.message);
            }

            setSearchResult(response.brand);
            return { success: true, data: response.brand };
        } catch (err) {
            setError(err.message || "Error al buscar la marca");
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

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
    }, [fetchBrands]);

    return {
        brands,
        loading,
        error,
        searchResult,
        fetchBrands,
        addBrand,
        deleteBrand: handleDeleteBrand,
        updateBrand: updateBrandHandler,
        searchBrand,
        resetState: () => {
            setError(null);
            setSearchResult(null);
        }
    };
};