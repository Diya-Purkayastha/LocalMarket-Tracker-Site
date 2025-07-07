import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Replace this fetch URL with your backend product API
    fetch("http://localhost:5000/api/products?status=approved&limit=6")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-0 my-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-pink-600 mb-6"
      >
        Latest Market Prices
      </motion.h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No approved products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isLoggedIn={!!user}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;
