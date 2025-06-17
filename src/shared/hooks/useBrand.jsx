import { useState, useEffect } from "react";
import { getBrands } from '../../services';

export const useBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchBrands();
    }, []);

    return{
        brands,
        loading,
        error,
        refresh: fetchBrands
    };
};