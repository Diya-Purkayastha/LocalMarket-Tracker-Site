import { motion } from "framer-motion";

const steps = [
  {
    step: "1",
    title: "Register or Login",
    description: "Create an account or login to access full features.",
  },
  {
    step: "2",
    title: "Browse Products",
    description: "Explore fresh market prices updated daily by vendors.",
  },
  {
    step: "3",
    title: "Track & Buy",
    description: "Add to watchlist, compare prices, and make secure purchases.",
  },
];

const HowItWorks = () => {
  return (
    <motion.section
      className="container mx-auto px-4 md:px-0 my-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {steps.map(({ step, title, description }, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-pink-600 font-bold text-5xl mb-3">{step}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;
