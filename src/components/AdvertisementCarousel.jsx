import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/advertisements?status=approved")
      .then((res) => res.json())
      .then((data) => {
        setAds(data.ads);
      })
      .catch(() => setAds([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-0 my-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-pink-600 mb-6"
      >
        Current Promotions & Ads
      </motion.h2>

      {loading ? (
        <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
      ) : ads.length === 0 ? (
        <p className="text-center text-gray-500">No current advertisements.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {ads.map((ad) => (
            <motion.div
              key={ad._id}
              className="min-w-[300px] rounded-lg overflow-hidden shadow-lg bg-white"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-pink-600">{ad.title}</h3>
                <p className="text-sm text-gray-600">{ad.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdvertisementCarousel;
