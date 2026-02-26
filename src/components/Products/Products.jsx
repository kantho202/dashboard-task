import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Product Dashboard
          </h1>
          <p className="text-gray-500">
            Manage and explore your products easily.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </span>

                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    {product.category}
                  </span>
                </div>

                <button className="w-full mt-4 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Products;