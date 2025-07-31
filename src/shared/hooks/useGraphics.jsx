import { useState, useEffect } from 'react';
import { GraphService } from '../../services/apiGraphs';

export const useGraphics = () => {
  const [graphics, setGraphics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchGraphics = async (limite = 10, desde = 0) => {
    try {
      setLoading(true);
      const { success, total: totalGraphics, graphics: graphicsData } = 
        await GraphService.getGraphics(limite, desde);
      
      if (success) {
        setGraphics(graphicsData);
        setTotal(totalGraphics);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar los gráficos');
    } finally {
      setLoading(false);
    }
  };

  const updateGraphics = async () => {
    try {
      setLoading(true);
      const { success, graphics: updatedGraphics } = 
        await GraphService.updateGraphics();
      
      if (success) {
        setGraphics(updatedGraphics);
      }
    } catch (err) {
      setError(err.message || 'Error al actualizar los gráficos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphics();
  }, []);

  return {
    graphics,
    loading,
    error,
    total,
    fetchGraphics,
    updateGraphics
  };
};