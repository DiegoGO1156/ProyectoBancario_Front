import { useState, useEffect } from "react";
import { getServices, createService, updateService} from "../../services"; 

export const useServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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

    // Actualiza el estado local con el servicio modificado
    setServices(prev => prev.map(service => 
      service._id === id ? {
        ...response.service,
        brandName: response.service.brand?.nameBrand || 'Sin marca'
      } : service
    ));

    setSuccess(true);
    return response;

  } catch (err) {
    // ... (mantén el mismo código de error)
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
        success,
        addService, 
        updateService: update,
        refresh: fetchServices,
        resetState
    };
};