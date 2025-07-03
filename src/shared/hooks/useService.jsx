import { useState, useEffect } from "react";
import { getServices, createService, updateService} from "../../services"; 

export const useServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Listar servicios
    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await getServices();

            if (response.error) {
                throw new Error(response.e || response.message);
            }

            // Mapear los datos si es necesario para incluir la marca relacionada
            const servicesWithBrand = response.services.map(service => ({
                ...service,
                brandName: service.brand?.nameBrand || 'Sin marca'
            }));

            setServices(servicesWithBrand || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Error al cargar los servicios");
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    //agregar 
    const addService = async (serviceData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createService(serviceData);
      
      if (response.error) {
        throw new Error(response.message || 'Error al crear servicio');
      }

      return { success: true, data: response.service };

    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                     err.message || 
                     'Error al crear servicio';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

   //editar 
   const update = async (id, serviceData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await updateService(id, serviceData);
      
      if (response.error) {
        throw new Error(response.message);
      }

      setSuccess(true);
      return response;

    } catch (err) {
      const errorMsg = err.response?.data?.error?.message || 
                     err.message || 
                     'Error al actualizar servicio';
      setError(errorMsg);
      throw err; // Re-lanzamos para manejo adicional
    } finally {
      setLoading(false);
    }
  };

    const resetState = () => {
    setError(null);
    setSuccess(false);
  };


    useEffect(() => {
        fetchServices();
    }, []);

    return {
        services,
        loading,
        error,
        addService, 
        updateService: update,
        refresh: fetchServices,
        resetState
    };
};