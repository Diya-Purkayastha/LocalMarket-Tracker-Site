import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";


const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
useEffect(() => {
  fetch("http://localhost:5000/api/products?status=approved&limit=8")
    .then((res) => res.json())
    .then((data) => {
      // If backend returns { products: [...] }
      setProducts(data.products || []);

      // If backend returns just an array, uncomment this:
      // setProducts(Array.isArray(data) ? data : []);
    })
    .catch(() => setProducts([]))
    .finally(() => setLoading(false));
}, []);


  return (
    <section className="container mx-auto px-8 md:mt-16">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-my-primary text-center"
      >
        Latest Market Prices
      </motion.h2>
      <p className=" font-semibold text-my-secondary text-center mb-6"> Track daily fluctuations to make smarter buying decisions</p>

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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
