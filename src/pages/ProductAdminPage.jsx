import ProductsList from '../components/Products/ProducstList';
import { SidebarAdmin } from '../components/Navbar/SidebarAdmin';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="ml-64 p-8"> {/* Ajusta el ml-64 según el ancho de tu sidebar */}
        <ProductsList />
      </main>
    </div>
  );
};

export default ProductsPage;