import { useState, useEffect, useCallback } from "react";
import { useBrands } from "../../shared/hooks/useBrand";
import { getServices, createService, updateService, deleteService } from "../../services";

export const useServices = () => {
    const [state, setState] = useState({
        services: [],
        loading: true,
        error: null,
        success: false
    });
    const { brands, loading: loadingBrands } = useBrands();

    // Función para enriquecer servicios con info de marcas
    const enhanceWithBrands = useCallback((services) => {
        return services.map(service => {
            const brandFound = brands.find(b => 
                b._id.toString() === service.brand?.toString() ||
                b._id.toString() === service.brand?._id?.toString()
            );
            return {
                ...service,
                brandName: brandFound?.nameBrand || 'Sin marca',
                brandObject: brandFound || null
            };
        });
    }, [brands]); // ¡Importante! Dependencia de brands

    const fetchServices = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await getServices();
            if (response.error) throw new Error(response.e || response.message);
            
            const enhancedServices = enhanceWithBrands(response.servicesResult || []);
            
            setState(prev => ({ 
                ...prev, 
                services: enhancedServices, 
                loading: false 
            }));
        } catch (err) {
            setState(prev => ({ 
                ...prev, 
                error: err.message || "Error al cargar los servicios",
                loading: false 
            }));
        }
    }, [enhanceWithBrands]); // Depende de enhanceWithBrands

    const addService = async (serviceData) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await createService(serviceData);
            if (response.error) throw new Error(response.message);
            
            await fetchServices(); // Recarga completa para consistencia
            return { success: true, data: response.service };
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Error al crear servicio';
            setState(prev => ({ ...prev, error: errorMsg, loading: false }));
            return { success: false, error: errorMsg };
        }
    };

    const updateServiceItem = async (id, serviceData) => {
        setState(prev => ({ ...prev, loading: true, error: null, success: false }));
        try {
            const response = await updateService(id, serviceData);
            if (response.error) throw new Error(response.message);
            
            // Actualización optimista con marca
            setState(prev => {
                const updatedServices = prev.services.map(service => {
                    if (service._id === id) {
                        const brandFound = brands.find(b => 
                            b._id.toString() === response.service.brand?.toString() ||
                            b._id.toString() === response.service.brand?._id?.toString()
                        );
                        return {
                            ...response.service,
                            brandName: brandFound?.nameBrand || 'Sin marca',
                            brandObject: brandFound || null
                        };
                    }
                    return service;
                });
                
                return {
                    ...prev,
                    services: updatedServices,
                    loading: false,
                    success: true
                };
            });
            
            return response;
        } catch (err) {
            setState(prev => ({ ...prev, error: err.message, loading: false }));
            throw err;
        }
    };

    const deleteServiceItem = async (id) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await deleteService(id);
            if (response.error) throw new Error(response.message);
            
            // Eliminación optimista
            setState(prev => ({
                ...prev,
                services: prev.services.filter(service => service._id !== id),
                loading: false
            }));
            
            return { success: true };
        } catch (err) {
            setState(prev => ({ ...prev, error: err.message, loading: false }));
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    return {
        ...state,
        addService,
        updateService: updateServiceItem,
        deleteService: deleteServiceItem,
        refresh: fetchServices,
        resetState: () => setState(prev => ({ ...prev, error: null, success: false }))
    };
};