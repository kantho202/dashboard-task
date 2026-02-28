import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiTag, FiPackage, FiSearch, FiFilter, FiCheck } from "react-icons/fi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 font-medium animate-pulse">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header - Slide in from top */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-down">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">Product Catalog</h1>
            <p className="text-gray-600 animate-fade-in-delay">Discover and manage your product inventory</p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in-delay-2">
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105">
              <span className="text-sm font-semibold text-gray-700">
                Total Products: <span className="text-green-600">{products.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards - Stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FiPackage className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FiTag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FiShoppingCart className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter - Fade in */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-delay hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 focus:shadow-lg"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors duration-300" />
            </div>

            {/* Category Filter */}
            <div className="relative group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-5 py-3 pl-12 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 appearance-none bg-white cursor-pointer hover:border-green-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-green-500 transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Product Grid - Stagger animation */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden group animate-scale-in hover:-translate-y-2"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Diagonal pattern background */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #cbd5e1 35px, #cbd5e1 70px)',
                  }}></div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-600/0 group-hover:from-green-400/5 group-hover:to-green-600/5 transition-all duration-500 rounded-3xl"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Badge - Show for first 3 products */}
                  {index < 3 && (
                    <div className="inline-block mb-4 animate-bounce-slow">
                      <span className="bg-yellow-400 text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                        {index === 0 ? 'Most Popular' : index === 1 ? 'Best Value' : 'Trending'}
                      </span>
                    </div>
                  )}

                  {/* Title and Price */}
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 flex-1 pr-2 group-hover:text-green-600 transition-colors duration-300">{product.name}</h2>
                    <p className="text-2xl font-bold text-gray-600 whitespace-nowrap group-hover:scale-110 transition-transform duration-300">${product.price}</p>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 hover:bg-green-100 hover:text-green-700 transition-all duration-300">
                      <FiTag className="w-3 h-3" />
                      {product.category}
                    </span>
                  </div>

                  {/* Features/Description */}
                  <div className="mb-8 space-y-4">
                    <div className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                      <FiCheck className="w-5 h-5 text-green-500 mt-0.5 stroke-[3] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                      <p className="text-base text-gray-700">{product.description}</p>
                    </div>
                    <div className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                      <FiCheck className="w-5 h-5 text-green-500 mt-0.5 stroke-[3] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                      <p className="text-base text-gray-700">Premium quality guaranteed</p>
                    </div>
                    <div className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                      <FiCheck className="w-5 h-5 text-green-500 mt-0.5 stroke-[3] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                      <p className="text-base text-gray-700">Fast and secure delivery</p>
                    </div>
                    <div className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                      <FiCheck className="w-5 h-5 text-green-500 mt-0.5 stroke-[3] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                      <p className="text-base text-gray-700">24/7 customer support</p>
                    </div>
                  </div>

                  {/* Subscribe/Buy Button */}
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 group/btn hover:scale-105 active:scale-95">
                    <FiShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <FiPackage className="w-16 h-16 text-gray-300 animate-bounce" />
              <p className="text-gray-500 font-medium text-lg">No products found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;