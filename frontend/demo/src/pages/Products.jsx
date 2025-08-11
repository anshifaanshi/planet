import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

return (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
      Our Products
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product._id}
          className="border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover rounded-md transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-xl font-semibold mt-5 text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2 text-lg font-medium">₹{product.price}</p>
          <button
            className="mt-auto mt-6 px-5 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md
                       hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
export default Products