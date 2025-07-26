import { useState, useEffect, useCallback } from "react";
import { 
  getProductsA, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../../services';
import { useBrands } from "../../shared/hooks/useBrand";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getProductsA();

            if (response.error) {
                throw new Error(response.e);
            }

            setProducts(response.products || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Error al cargar los productos");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const addProduct = async (productData) => {
        setLoading(true);
        try {
            const response = await createProduct(productData);
            
            if (response.error) {
                throw new Error(response.message);
            }

            // Agregar el nuevo producto al principio del array
            setProducts(prev => [response.product, ...prev]);
            
            return { success: true, data: response.product };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const updateProductHandler = async (id, productData) => {
        try {
            setLoading(true);
            const response = await updateProduct(id, productData);
            
            if (response.error) {
                throw new Error(response.message);
            }
            
            setProducts(prev => prev.map(product => 
                product._id === id ? { ...product, ...productData } : product
            ));
            
            return response;
        } catch (err) {
            setError(err.message || 'Error al actualizar el producto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            setLoading(true);
            const result = await deleteProduct(id);
            
            if (result.error) {
                throw new Error(result.message);
            }

            // Actualizar estado eliminando el producto
            setProducts(prev => prev.filter(product => product._id !== id));
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Función para buscar producto por ID (si necesitas implementarla)
    const searchProduct = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            // Aquí deberías llamar a tu API de búsqueda por ID si existe
            // Por ahora filtramos localmente
            const foundProduct = products.find(product => product._id === id);
            
            if (!foundProduct) {
                throw new Error("Producto no encontrado");
            }

            setSearchResult(foundProduct);
            return { success: true, data: foundProduct };
        } catch (err) {
            setError(err.message || "Error al buscar el producto");
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        searchResult,
        fetchProducts,
        addProduct,
        deleteProduct: handleDeleteProduct,
        updateProduct: updateProductHandler,
        searchProduct,
        resetState: () => {
            setError(null);
            setSearchResult(null);
        }
    };
};