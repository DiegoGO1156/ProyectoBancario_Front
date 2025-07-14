import { useEffect, useState } from 'react';
import { getProducts } from '../../services';
import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import  Footer  from "../Homepage/Footer";

 export const Productos = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts(10, 0)
      .then((res) => {
        console.log("Respuesta getProducts:", res);
        const productsList = res.products || (res.data && res.data.products) || [];
        if (productsList.length > 0) {
          setProducts(productsList);
        }
      })
      .catch((err) => {
        console.error("Error en getProducts:", err);
      });
  }, []);

  return (
    <div className="flex h-screen">
    <SidebarAdmin />
    <div className="flex-1 flex-row  mt-70 ml-70">
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map(({ _id, nameProduct, price, description, image }) => (
            <div key={_id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              {/* Si tienes URL o base para la imagen, ponla aquí */}
              {/* <img src={`https://mi-servidor.com/images/${image}`} alt={nameProduct} className="w-full h-48 object-cover rounded mb-4" /> */}
              <h2 className="text-xl font-semibold mb-2">{nameProduct}</h2>
              <p className="text-green-600 font-bold mb-2">${price}</p>
              <p className="text-gray-700">{description}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
        <div className="mt-30">
          <Footer />
        </div>
    </div>
  </div>
  );
};

export default Productos;
