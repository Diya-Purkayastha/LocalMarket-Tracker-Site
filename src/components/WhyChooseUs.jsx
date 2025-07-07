import { motion } from "framer-motion";

const reasons = [
  {
    icon: "🛒",
    title: "Fresh Daily Prices",
    description: "Get accurate prices updated by vendors every day.",
  },
  {
    icon: "📈",
    title: "Price Trends",
    description: "Track price changes with interactive charts and graphs.",
  },
  {
    icon: "💬",
    title: "User Reviews",
    description: "Real feedback from market users and buyers.",
  },
];

const WhyChooseUs = () => {
  return (
    <motion.section
      className="container mx-auto px-4 md:px-0 my-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
        Why Choose LocalMarket Tracker?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-5xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-gray-600">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
