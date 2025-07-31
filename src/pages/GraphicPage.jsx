import { useGraphics } from '../shared/hooks/useGraphics';
import { GraphicsList } from '../components/GraphicList';

export const GraphicsPage = () => {
  const {
    graphics,
    loading,
    error,
    total,
    fetchGraphics,
    updateGraphics
  } = useGraphics();

  return (
    <div className="container mx-auto px-4 py-8">
      <GraphicsList 
        graphics={graphics} 
        loading={loading} 
        error={error}
        onUpdate={updateGraphics}
      />
    </div>
  );
};