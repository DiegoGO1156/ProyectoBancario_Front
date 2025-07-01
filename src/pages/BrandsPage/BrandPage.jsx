import BrandsGrid from '../../components/Brand/brands';
import { SidebarAdmin } from '../../components/Navbar/SidebarAdmin';
import { EditBrandModal } from '../../components/Brand/updateBrand';


  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

const BrandsPage = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarAdmin/>
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BrandsGrid onEditBrand={handleEditBrand}/>
            <EditBrandModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            brand={selectedBrand}
          />
        </div>
      </main>
    </div>
  );
};

export default BrandsPage;