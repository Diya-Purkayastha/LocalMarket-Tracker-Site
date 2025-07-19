import { motion } from "framer-motion";
import { Link } from "react-router";

const ProductCard = ({ product, isLoggedIn }) => {

  const formattedDate = new Date(product.date).toLocaleDateString();

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      className="card bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
    >
      <img
        src={product.image}
        alt={`${product.marketName} product`}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="font-semibold text-lg text-my-primary">{product.itemName}</h3>
       <div className="flex justify-between">
         <p className="badge badge-outline text-my-secondary mb-2">{product.marketName}</p>
        <p className="badge badge-outline text-my-secondary mb-2">{product.pricePerUnit}</p>
       </div>

        <ul className="text-gray-700 text-sm mb-4 space-y-1 max-h-28 overflow-y-auto">
          {product.items?.map((item, idx) => (
            <li key={idx}>
              <span className="font-medium">{item.name}</span> — ৳{item.price}/{item.unit || "kg"}
            </li>
          ))}
        </ul>

        <Link
          to={isLoggedIn ? `/details/${product._id}` : "/login"}
          className="btn btn-sm bg-my-primary text-white w-full"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
