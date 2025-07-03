import { useState } from 'react';
import { SidebarAdmin } from '../../components/Navbar/SidebarAdmin';
import ServiceGrid from '../../components/Services/services';
import { EditServiceModal } from '../../components/Services/updateService';

function ServicesPage() {
    const [editingService, setEditingService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuccess = (updatedService) => {
    // Aquí puedes actualizar tu lista de servicios
    console.log("Servicio actualizado:", updatedService);
    setIsEditModalOpen(false);
  };
    
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin />
      
      <main className="flex-1 py-8 ml-20 overflow-x-hidden">
        <div className="mx-auto max-w-7xl0 px-40 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Nuestros Servicios</h1>
          <ServiceGrid onEditService={handleEdit}/>

          <EditServiceModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            serviceToEdit={editingService}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      </main>
    </div>
  );
}

export default ServicesPage;