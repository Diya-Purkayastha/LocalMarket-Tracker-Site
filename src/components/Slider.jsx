import { motion } from "framer-motion";

const Slider = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center h-[320px] md:h-[450px] rounded-lg shadow-lg mx-4 md:mx-0 my-8"
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col justify-center items-center text-center text-white p-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
          Get Real-time Prices from Local Markets
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl drop-shadow-md">
          Track, Compare & Buy Fresh Produce at the Best Prices
        </p>
      </div>
    </motion.section>
  );
};

export default Slider;
