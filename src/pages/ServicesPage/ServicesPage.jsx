import { SidebarAdmin } from '../../components/Navbar/SidebarAdmin';
import { ServiceGrid } from '../../components/Services/services';

export const ServicesPage = () => (
  <div className="min-h-screen bg-gray-50 flex">
    <SidebarAdmin />
    
    <main className="flex-1 py-8 ml-20 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nuestros Servicios</h1>
        <ServiceGrid />
      </div>
    </main>
  </div>
);

export default ServicesPage;