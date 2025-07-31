import { GraphCard } from './Grafico';
import Button from '@mui/material/Button';

export const GraphicsList = ({ graphics, loading, error, onUpdate }) => {
  if (loading) return <div className="text-center py-8">Cargando gráficos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!graphics || graphics.length === 0) return <div className="text-center py-8">No hay gráficos disponibles</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Visualización de Gráficos</h2>
        <Button 
          onClick={onUpdate} 
          variant="contained"
          color="primary"
        >
          Actualizar Gráficos
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {graphics.map((graph) => (
          <GraphCard key={graph._id} graph={graph} />
        ))}
      </div>
    </div>
  );
};