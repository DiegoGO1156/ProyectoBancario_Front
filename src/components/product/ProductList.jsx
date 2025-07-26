import { useEffect, useState } from "react";
import { getProducts } from "../../services";
import { SidebarAdmin } from "../Navbar/SidebarAdmin";
import Footer from "../Homepage/Footer";
import { useUserProfile } from "../../shared/hooks";
import { productBuy } from "../../services/api";
import { SidebarUsers } from "../Navbar/SidebarUser";
import toast from "react-hot-toast"

export const Productos = () => {
  const [products, setProducts] = useState([]);
  const { usuario, loading, error, refetch } = useUserProfile();

  useEffect(() => {
    getProducts(10, 0)
      .then((res) => {
        const productsList = res.products || [];
        setProducts(productsList);
      })
      .catch((err) => {
        console.error("Error en getProducts:", err);
      });
  }, []);

  const comprarProducto = async (productId, price) => {
    const userIncome = usuario?.income || 0;

    if (price > userIncome) {
      alert("No tienes suficiente dinero para comprar este producto.");
      return;
    }

    const result = await productBuy(productId);
    if (result.success) {
      refetch();
    }
  };

  if (loading) return <p className="p-6">Cargando usuario...</p>;
  if (error) return <p className="p-6">Error al cargar perfil: {error}</p>;

  const role = localStorage.getItem("roleUser")

  return (
    <div className="flex min-h-screen">
      {
        role === "ADMIN" ? <SidebarAdmin /> : <SidebarUsers />
      }
      <div className="flex-1 flex-col ml-70">
        <div className="p-6 bg-gray-100 min-h-[100vh]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Productos</h1>
            <div className="text-lg font-semibold text-blue-800">
              Saldo actual: ${usuario.income}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map(({ _id, nameProduct, price, description, image }) => (
                <div
                  key={_id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  {/* Aquí agregamos la imagen */}
                  {image && (
                    <div className="mb-4 h-40 overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={nameProduct}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mb-2">{nameProduct}</h2>
                  <p className="text-green-600 font-bold mb-2">${price}</p>
                  <p className="text-gray-700 mb-4">{description}</p>
                  <button
                    onClick={() => comprarProducto(_id, price)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    Comprar
                  </button>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
          <div className="mt-20">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
